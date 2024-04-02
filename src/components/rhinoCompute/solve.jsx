import React, { useState } from 'react';
import compute from 'compute-rhino3d'; // Asegúrate de instalar compute-rhino3d en tu proyecto React
// import { performance } from 'perf_hooks';
import NodeCache from 'node-cache'; // Asegúrate de instalar node-cache en tu proyecto React
// import memjs from 'memjs'; // Asegúrate de instalar memjs en tu proyecto React

const SolveComponent = () => {
  const [definition, setDefinition] = useState(null);
  const [cacheResult, setCacheResult] = useState(null);

  let mc = null;

  const cache = new NodeCache();

  // if (process.env.MEMCACHIER_SERVERS !== undefined) {
  //   mc = memjs.Client.create(process.env.MEMCACHIER_SERVERS, {
  //     failover: true,
  //     timeout: 1,
  //     keepAlive: true
  //   });
  // }

  const computeParams = (req, res, next) => {
    compute.url = process.env.RHINO_COMPUTE_URL;
    compute.apiKey = process.env.RHINO_COMPUTE_KEY;
    next();
  };

  /**
 * Collect request parameters
 * This middleware function stores request parameters in the same manner no matter the request method
 */

  const collectParams = (req, res, next) => {
    // Lógica para recolectar parámetros
    res.locals.params = {}
    switch (req.method) {
      case 'HEAD':
      case 'GET':
        res.locals.params.definition = req.params.definition
        res.locals.params.inputs = req.query
        break
      case 'POST':
        res.locals.params = req.body
        break
      default:
        next()
        break
    }

    let definitionName = res.locals.params.definition
    if (definitionName === undefined)
      definitionName = res.locals.params.pointer
    definition = req.app.get('definitions').find(o => o.name === definitionName)
    if (!definition)
      throw new Error('Definition not found on server.')

    //replace definition data with object that includes definition hash
    res.locals.params.definition = definition

    next()
  };

  /**
 * Check cache
 * This middleware function checks if a cache value exist for a cache key
 */

  const checkCache = (req, res, next) => {
    // Tu lógica para verificar la caché aquí
    const key = {}
    key.definition = { 'name': res.locals.params.definition.name, 'id': res.locals.params.definition.id }
    key.inputs = res.locals.params.inputs
    if (res.locals.params.values !== undefined)
      key.inputs = res.locals.params.values
    res.locals.cacheKey = JSON.stringify(key)
    res.locals.cacheResult = null

    if (mc === null) {
      // use node cache
      //console.log('using node-cache')
      const result = cache.get(res.locals.cacheKey)
      res.locals.cacheResult = result !== undefined ? result : null
      next()
    } else {
      // use memcached
      //console.log('using memcached')
      if (mc !== null) {
        mc.get(res.locals.cacheKey, function (err, val) {
          if (err == null) {
            res.locals.cacheResult = val
          }
          next()
        })
      }
    }
  };

  /**
 * Solve GH definition
 * This is the core "workhorse" function for the appserver. Client apps post
 * json data to the appserver at this endpoint and that json is passed on to
 * compute for solving with Grasshopper.
 */

  const commonSolve = (req, res, next) => {
    // Lógica para resolver
    // const timePostStart = performance.now()

    // set general headers
    // what is the proper max-age, 31536000 = 1 year, 86400 = 1 day
    res.setHeader('Cache-Control', 'public, max-age=31536000')
    res.setHeader('Content-Type', 'application/json')

    if (res.locals.cacheResult !== null) {
      //send
      //console.log(res.locals.cacheResult)
      // const timespanPost = Math.round(performance.now() - timePostStart)
      // res.setHeader('Server-Timing', `cacheHit;dur=${timespanPost}`)
      res.send(res.locals.cacheResult)
      return
    } else {
      //solve
      //console.log('solving')
      // set parameters
      let trees = []
      if (res.locals.params.inputs !== undefined) { //TODO: handle no inputs
        for (let [key, value] of Object.entries(res.locals.params.inputs)) {
          let param = new compute.Grasshopper.DataTree(key)
          param.append([0], Array.isArray(value) ? value : [value])
          trees.push(param)
        }
      }
      if (res.locals.params.values !== undefined) {
        for (let index = 0; index < res.locals.params.values.length; index++) {
          let param = new compute.Grasshopper.DataTree('')
          param.data = res.locals.params.values[index]
          trees.push(param)
        }
      }

      let fullUrl = req.protocol + '://' + req.get('host')
      let definitionPath = `${fullUrl}/definition/${definition.id}`
      // const timePreComputeServerCall = performance.now()
      let computeServerTiming = null

      // call compute server
      compute.Grasshopper.evaluateDefinition(definitionPath, trees, false).then((response) => {

        // Throw error if response not ok
        if (!response.ok) {
          throw new Error(response.statusText)
        } else {
          computeServerTiming = response.headers
          return response.text()
        }

      }).then((result) => {
        // Note: IIS does not send these headers which was causing an issue with the appserver response
        /*const timeComputeServerCallComplete = performance.now()
  
        let computeTimings = computeServerTiming.get('server-timing')
        let sum = 0
        computeTimings.split(',').forEach(element => {
          let t = element.split('=')[1].trim()
          sum += Number(t)
        })
        const timespanCompute = timeComputeServerCallComplete - timePreComputeServerCall
        const timespanComputeNetwork = Math.round(timespanCompute - sum)
        const timespanSetup = Math.round(timePreComputeServerCall - timePostStart)
        const timing = `setup;dur=${timespanSetup}, ${computeTimings}, network;dur=${timespanComputeNetwork}`
          
        if(mc !== null) {
          //set memcached
          mc.set(res.locals.cacheKey, result, {expires:0}, function(err, val){
            console.log(err)
            console.log(val)
          })
        } else {
          //set node-cache
          cache.set(res.locals.cacheKey, result)
        }
  
        res.setHeader('Server-Timing', timing)*/

        const r = JSON.parse(result)
        delete r.pointer
        res.send(JSON.stringify(r))
      }).catch((error) => {
        next(error)
      })
    }
  };

  const pipeline = [computeParams, collectParams, checkCache, commonSolve];
};

export default SolveComponent;
