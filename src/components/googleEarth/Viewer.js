import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { GLTFExporter } from "three/addons/exporters/GLTFExporter.js";

export class Viewer {
	constructor() {
		if (Viewer.instance) {
			return Viewer.instance;
		}

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.01,
			100
		);
		camera.position.z = -0.25;
		camera.position.y = 0.2;

		const renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.domElement.id = 'canvas-visor-3d';

		document.body.appendChild(renderer.domElement);

		const controls = new OrbitControls(camera, renderer.domElement);
		controls.update();
		this.controls = controls;
		controls.minDistance = 0.1;
		controls.maxDistance = 5;

		const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
		scene.add(directionalLight);
		const light = new THREE.AmbientLight(0x404040);
		scene.add(light);

		window.addEventListener("resize", this.resizeCanvas.bind(this));
		this.scene = scene;
		this.camera = camera;
		this.renderer = renderer;

		// const color = new THREE.Color(93 / 255, 172 / 255, 191 / 255);
		// renderer.setClearColor(color);

		renderer.setClearColor(0x000000, 0.0);
		// #A3D6E0

		this.render();
		this.resizeCanvas();

		Viewer.instance = this;

	}

	render() {
		const { renderer, camera, scene } = this;
		requestAnimationFrame(this.render.bind(this));
		renderer.render(scene, camera);
	}

	resizeCanvas() {
		const { camera, renderer } = this;
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	}
	async loadGLTFTiles(urlArray, logFn) {
		// Resizing/recentering code inspired by by gltf-viewer
		// https://github.com/donmccurdy/three-gltf-viewer/blob/de78a07180e4141b0b87a0ff4572bc4f7aafec56/src/viewer.js#L246
		const { scene, controls, camera } = this;
		// Remove any previous 3D Tiles we were rendering
		if (this.tilesContainer) {
			scene.remove(this.tilesContainer);
			this.tilesContainer = null;
		}
		const tilesContainer = new THREE.Object3D();
		// Fetch individual glTF's and add them to the scene
		const gltfArray = [];
		for (let i = 0; i < urlArray.length; i++) {
			const url = urlArray[i];
			if (logFn) logFn(`Buscando glTF ${i}/${urlArray.length}`);
			const gltf = await fetchGltf(url);
			gltfArray.push(gltf);
			tilesContainer.add(gltf.scene);
		}

		if (logFn)
			logFn(`Normalizando y uniendo ${urlArray.length} glTFs`);

		// Re-center the tiles around 0/0/0
		const box = new THREE.Box3().setFromObject(tilesContainer);
		const size = box.getSize(new THREE.Vector3()).length();
		const center = box.getCenter(new THREE.Vector3());
		for (let gltf of gltfArray) {
			const object = gltf.scene.children[0];
			const offset = object.position.clone().sub(center);
			object.position.set(offset.x, offset.y, offset.z);
		}
		scene.add(tilesContainer);

		// Calculate the quaternion to rotate the up vector to face north (positive Y-axis)
		/*
			- The tiles are positioned in ECEF at some position on the surface of the Earth
			- They are oriented "up" in this position
			- We (1) compute this vector and (2) reverse this rotation
			- this way it's pointing up in the XYZ space centered around 0,0,0
			*/
		const upVector = center.normalize(); // the direction the tiles are facing
		const targetNorthVector = new THREE.Vector3(0, 1, 0); // the "up" direction we want
		const rotationAxis = new THREE.Vector3();
		rotationAxis.crossVectors(upVector, targetNorthVector).normalize();
		const dotProduct = upVector.dot(targetNorthVector);
		const rotationAngle = Math.acos(dotProduct);

		const quaternion = new THREE.Quaternion();
		quaternion.setFromAxisAngle(rotationAxis, rotationAngle);
		tilesContainer.quaternion.multiply(quaternion); // rotate all the tiles

		const newScale = 1 / size; // re-scale to [0, 1]
		tilesContainer.scale.set(newScale, newScale, newScale);

		controls.update();
		// Save the tiles we added to remove them next time we add new tiles
		this.tilesContainer = tilesContainer;
		this.gltfArray = gltfArray;
	}

	generateCombineGltf() {
		exportGLTF(this.scene, {
			maxTextureSize: 4096,
		});
	}

	computarFigura() {
		exportarModeloGLTF(this.scene, {
			maxTextureSize: 4096,
		});
	}
}

const THREE_PATH = `https://unpkg.com/three@0.${THREE.REVISION}.x`;
const DRACO_LOADER = new DRACOLoader().setDecoderPath(
	`${THREE_PATH}/examples/jsm/libs/draco/gltf/`
);
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(DRACO_LOADER);

function fetchGltf(url) {
	return new Promise((resolve, reject) => {
		gltfLoader.load(
			url,
			(gltf) => {
				resolve(gltf);
			},
			() => { },
			(error) => {
				reject(error);
			}
		);
	});
}

function exportGLTF(input, params) {
	const gltfExporter = new GLTFExporter();
	const options = {
		trs: params.trs,
		onlyVisible: params.onlyVisible,
		binary: params.binary,
		maxTextureSize: params.maxTextureSize,
	};
	gltfExporter.parse(
		input,
		function (result) {
			if (result instanceof ArrayBuffer) {
				saveArrayBuffer(result, "combined_3d_tiles.glb");
			} else {
				const output = JSON.stringify(result, null, 2);
				saveString(output, "combined_3d_tiles.gltf");
			}
		},
		function (error) {
			console.log("Ocurrió un error durante la conversión", error);
		},
		options
	);
}

const link = document.createElement("a");
link.style.display = "none";
document.body.appendChild(link);
function save(blob, filename) {
	link.href = URL.createObjectURL(blob);
	link.download = filename;
	link.click();
}
function saveString(text, filename) {
	save(new Blob([text], { type: "text/plain" }), filename);
}
function saveArrayBuffer(buffer, filename) {
	save(new Blob([buffer], { type: "application/octet-stream" }), filename);
}


function exportarModeloGLTF(input, params) {
	console.log(input);
	const gltfExporter = new GLTFExporter();
	const options = {
		trs: params.trs,
		onlyVisible: params.onlyVisible,
		binary: params.binary,
		maxTextureSize: params.maxTextureSize
	};
	gltfExporter.parse(
		input,
		function (result) {
			if (result instanceof ArrayBuffer) {
				guardarArrayBuffer(result);
			} else {
				const output = JSON.stringify(result, null, 2);
				guardarString(output);
			}
		},
		function (error) {
			console.log('Ocurrió un error durante la conversión', error);
		},
		options
	);
}

async function computarFigura(blob) {
	// {computar(blob)};
	console.log("Se llamó a la función computar")
	let t0 = performance.now()
	const timeComputeStart = t0

	// collect data from inputs
	let data = {}
	data.definition = blob;
	data.inputs = {
        'Modelo': blob
    }

	console.log(data.inputs)

	const request = {
        'method': 'POST',
        'body': JSON.stringify(data),
        'headers': {
            'Content-Type': 'application/json',
            'RhinoComputeKey': process.env.REACT_APP_RHINO_COMPUTE_KEY
        }
    }

	let headers = null

	try {
		const response = await fetch('/solve', request)

		if (!response.ok)
			throw new Error(response.statusText)

		headers = response.headers.get('server-timing')
		const responseJson = await response.json()

		// collectResults(responseJson)

		// Request finished. Do processing here.
		let t1 = performance.now()
		const computeSolveTime = t1 - timeComputeStart
		t0 = t1

		// hide spinner
		//document.getElementById('loader').style.display = 'none'
		//showSpinner(false)
		//console.log(responseJson.values[0])
		//let data = JSON.parse(responseJson.values[0].InnerTree['{0}'][0].data)
		//let mesh = rhino.DracoCompression.decompressBase64String(data)

		t1 = performance.now()
		const decodeMeshTime = t1 - t0
		t0 = t1
		/*
			if (!_threeMaterial) {
			  _threeMaterial = new THREE.MeshNormalMaterial()
			}
		    
			let threeMesh = meshToThreejs(mesh, _threeMaterial)
			mesh.delete()
			replaceCurrentMesh(threeMesh)
		*/
		t1 = performance.now()
		const rebuildSceneTime = t1 - t0

		//console.group(`[call compute and rebuild scene] = ${Math.round(t1-timeComputeStart)} ms`)
		//console.log(`[call compute and rebuild scene] = ${Math.round(t1-timeComputeStart)} ms`)
		console.log(`  ${Math.round(computeSolveTime)} ms: appserver request`)
		/*
		let timings = headers.split(',')
		let sum = 0
		timings.forEach(element => {
		  let name = element.split(';')[0].trim()
		  let time = element.split('=')[1].trim()
		  sum += Number(time)
		  if (name === 'network') {
			console.log(`  .. ${time} ms: appserver<->compute network latency`)
		  } else {
			console.log(`  .. ${time} ms: ${name}`)
		  }
		})
	   
	   // console.log(`  .. ${Math.round(computeSolveTime - sum)} ms: local<->appserver network latency`)
		console.log(`  ${Math.round(decodeMeshTime)} ms: decode json to rhino3dm mesh`)
		console.log(`  ${Math.round(rebuildSceneTime)} ms: create threejs mesh and insert in scene`)
		 */
		//console.groupEnd()

	} catch (error) {
		console.error(error)
	}
}
function guardarString(text) {
	computarFigura(new Blob([text], { type: 'text/plain' }));
}
function guardarArrayBuffer(buffer) {
	computarFigura(new Blob([buffer], { type: 'application/octet-stream' }));
}