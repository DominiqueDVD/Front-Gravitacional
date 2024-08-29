import rhino3dm from 'rhino3dm';

async function init() {
  const rhino = await rhino3dm();
  const sphere = new rhino.Sphere([1, 2, 3], 12);
  console.log(sphere.diameter);
}

init();
