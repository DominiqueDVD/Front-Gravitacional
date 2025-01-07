import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function SceneConfig() {
  const { camera, gl } = useThree();

  if (camera instanceof THREE.OrthographicCamera) {
    const aspect = (window.innerWidth - 80) / window.innerHeight;
    camera.left = -300 * aspect;
    camera.right = 300 * aspect;
    camera.top = 300;
    camera.bottom = -300;
    camera.near = 0;
    camera.far = 2500;
    camera.updateProjectionMatrix();
  }

  gl.setClearColor('#e6f1f5', 1);

  return null;
}