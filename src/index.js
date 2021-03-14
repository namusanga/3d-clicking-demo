import "./styles.css";
import createCube from "./createCube";
import createLight from "./createLight";
import animate from "./animate";
import createCamera from "./createCamera";
import createRenderer from "./createRenderer";
import createScene from "./createScene";
import { InteractionManager } from "three.interactive";

const renderer = createRenderer();
const scene = createScene();
const camera = createCamera();

const interactionManager = new InteractionManager(
  renderer,
  camera,
  renderer.domElement
);

const cubes = {
  pink: createCube({ color: 0xff00ce, x: -1, y: -1 }),
  purple: createCube({ color: 0x9300fb, x: 1, y: -1 }),
  blue: createCube({ color: 0x0065d9, x: 1, y: 1 }),
  cyan: createCube({ color: 0x00d7d0, x: -1, y: 1 })
};

const light = createLight();

for (const [name, object] of Object.entries(cubes)) {
  object.addEventListener("click", (event) => {
    event.stopPropagation();
    console.log(`${name} cube was clicked`);
    const cube = event.target;
    camera.position.set(cube.position.x, cube.position.y, camera.position.z);
  });

  interactionManager.add(object);
  scene.add(object);
}

scene.add(light);

animate(() => {
  renderer.render(scene, camera);
  interactionManager.update();
});
