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

		const color = new THREE.Color(93 / 255, 172 / 255, 191 / 255);
		renderer.setClearColor(color);

		this.render();
		this.resizeCanvas();

		Viewer.instance = this;


		/* intento de gradiente de fondo
		const screenQuadVertexShader = `
		varying vec2 vUv;
	
		void main() {
			vUv = uv;
			gl_Position = vec4(position, 1.0);
		}
	`;
	
	// Fragment shader con gradiente lineal para el fondo de pantalla completa
	const screenQuadFragmentShader = `
		varying vec2 vUv;
	
		void main() {
			// Definir los colores del gradiente
			vec3 color1 = vec3(87.0 / 255.0, 169.0 / 255.0, 189.0 / 255.0); // Color inicial
			vec3 color2 = vec3(251.0 / 255.0, 249.0 / 255.0, 249.0 / 255.0); // Color final
		    
			// Calcular el valor de interpolación para el gradiente
			float t = abs(vUv.y - 0.5) * 2.0;
	
			// Interpolar entre los dos colores base para el gradiente
			vec3 finalColor = mix(color1, color2, t);
	
			// Asignar el color final al fragmento
			gl_FragColor = vec4(finalColor, 1.0);
		}
	`;
	
	// Crear el material con el fragment shader de gradiente
	const screenQuadMaterial = new THREE.ShaderMaterial({
		vertexShader: screenQuadVertexShader,
		fragmentShader: screenQuadFragmentShader,
		side: THREE.DoubleSide
	});
	
	// Crear el quad de pantalla completa
	const screenQuadGeometry = new THREE.PlaneGeometry(2, 2);
	const screenQuad = new THREE.Mesh(screenQuadGeometry, screenQuadMaterial);
	
	// Posicionar el quad en el centro del escenario
	screenQuad.position.set(0, 0, -1);
	
	// Agregar el quad al escenario
	scene.add(screenQuad);
	*/



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
			if (logFn) logFn(`Fetching glTF ${i}/${urlArray.length}`);
			const gltf = await fetchGltf(url);
			gltfArray.push(gltf);
			tilesContainer.add(gltf.scene);
		}

		if (logFn)
			logFn(`Normalizing & stitching together ${urlArray.length} glTF's`);

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

	computarModeloGltf() {
		exportarModeloGLTF(this.scene, {
			maxTextureSize: 4096
		})
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
			console.log("An error happened during parsing", error);
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
			console.log('An error happened during parsing', error);
		},
		options
	);
}

const rhinoSolver = "../rhinoCompute/script.js";
function computarFigura(blob) {
	// rhinoSolver.computar(blob);
	console.log("Se llamó a la función computar")
}
function guardarString(text) {
	computarFigura(new Blob([text], { type: 'text/plain' }));
}
function guardarArrayBuffer(buffer) {
	computarFigura(new Blob([buffer], { type: 'application/octet-stream' }));
}