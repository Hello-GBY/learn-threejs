import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";

// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(10, 2, 10);
scene.add(camera);

// 创建几何体
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

// 几何体和材质创建物体
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 缩放
mesh.scale.set(1, 1, 1);
// 旋转
mesh.rotation.set(Math.PI / 4, 0, 0);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 通过相机使用渲染器
renderer.render(scene, camera);

// 使用控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// 设置控制器阻尼 ， 让控制器更真实
controls.enableDamping = true;

let animal1 = gsap.to(mesh.position, {
  x: 5,
  duration: 5,
  ease: "power.inOut",
  repeat: 5,
  yoyo: true,
  onComplete: function () {},
});
gsap.to(mesh.rotation, { x: 2 * Math.PI, duration: 5 });

window.addEventListener("dblclick", () => {
  if (animal1.isActive()) {
    animal1.pause();
  } else {
    animal1.resume();
  }

  // 全屏控制
  if (!document.fullscreenElement) {
    renderer.domElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

function animate(time) {
  // mesh.position.x += 0.01;
  // mesh.rotation.x -= 0.01;
  // let t = (time / 1000) % 5;
  // mesh.position.x = t * 1;
  // if (mesh.position.x > 5) mesh.position.x = 0;
  controls.update();
  requestAnimationFrame(animate); // 下一帧的时候进行渲染
  renderer.render(scene, camera);
}

animate(0);

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

// 3d物体移动

// 监听画面变化
window.addEventListener("resize", () => {
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});
