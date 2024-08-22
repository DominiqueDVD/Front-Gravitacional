import ReactDOM from 'react-dom'
import * as THREE from 'three'
import React, { Suspense, useRef } from 'react'
import { Canvas, useLoader } from 'react-three-fiber'
import { Rhino3dmLoader } from 'three/examples/jsm/loaders/3DMLoader'

function Rhino3dmLogo({ url, ...props }) {
  const model = useLoader(Rhino3dmLoader, url)
  const group = useRef()

  return (
    <group ref={group} dispose={null}>
      <scene>
        <model />
      </scene>
    </group>
  )
}

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 35] }}>
      <Suspense fallback={null}>
        <Rhino3dmLogo url="/Rhino_Logo.3dm" />
      </Suspense>
    </Canvas>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))