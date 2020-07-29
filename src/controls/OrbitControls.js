import * as THREE from 'three';
import { OrbitControls } from '@jsm/controls/OrbitControls.js';
import Stats from '@jsm/libs/stats.module.js';
import dat from '@jsm/libs/dat.gui.module.js';
import textureImg from '@img/texture/sprite.png';


function init(){



// 根元素

let rootDom = document.getElementById('3d-canvas');
console.log(rootDom)
let w = rootDom.offsetWidth;
let h = rootDom.offsetHeight;

// 初始化性能插件
let stats;
function initStats() {
  stats = new Stats();
  rootDom.appendChild(stats.dom);
}

// 初始化交互插件
let controls;
function initControls() {

    controls = new OrbitControls( camera, renderer.domElement );

    // 如果使用animate方法时，将此函数删除
    //controls.addEventListener( 'change', render );
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    controls.enableDamping = true;
    //动态阻尼系数 就是鼠标拖拽旋转灵敏度
    //controls.dampingFactor = 0.25;
    //是否可以缩放
    controls.enableZoom = true;
    //是否自动旋转
    controls.autoRotate = true;
    //设置相机距离原点的最远距离
    controls.minDistance  = 200;
    //设置相机距离原点的最远距离
    controls.maxDistance  = 600;
    //是否开启右键拖拽
    controls.enablePan = true;
}

//初始化dat.GUI简化试验流程
let gui;
function initGui() {
    //声明一个保存需求修改的相关数据的对象
    gui = {
        lightY: 30, //灯光y轴的位置
        cubeX: 25, //立方体的x轴位置
        cubeY: 10, //立方体的x轴位置
        cubeZ: -5 //立方体的z轴的位置
    };
    var datGui = new dat.GUI();
    //将设置属性添加到gui当中，gui.add(对象，属性，最小值，最大值）
    datGui.add(gui, "lightY", 0, 100);
    datGui.add(gui, "cubeX", -30, 30);
    datGui.add(gui, "cubeY", -30, 30);
    datGui.add(gui, "cubeZ", -30, 30);
}

// 渲染器
let renderer;
function initRender(){

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(w,h);

  //告诉渲染器需要阴影效果
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 默认的是，没有设置的这个清晰 THREE.PCFShadowMap

  rootDom.appendChild(renderer.domElement);
 
}

// 场景 scene
let scene ;
function initScene(){
  scene = new THREE.Scene();
}

// 相机 camera
let camera ;
function initCamera(){
  camera = new THREE.PerspectiveCamera(45,w/h,0.1,10000);
  camera.position.set(0, 40, 100);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
}

// Light
let light;
function initLight(){
  scene.add(new THREE.AmbientLight(0x404040));
  light = new THREE.PointLight(0xffffff);
  light.position.set(15, 30, 10);
  //告诉平行光需要开启阴影投射
  light.castShadow = true;

  scene.add(light);
}


// model
let cube
function initModel(){
  //创建立方体的顶点
  var vertices = [
    new THREE.Vector3(10, 10, 10), //v0
    new THREE.Vector3(-10, 10, 10), //v1
    new THREE.Vector3(-10, -10, 10), //v2
    new THREE.Vector3(10, -10, 10), //v3
    new THREE.Vector3(10, -10, -10), //v4
    new THREE.Vector3(10, 10, -10), //v5
    new THREE.Vector3(-10, 10, -10), //v6
    new THREE.Vector3(-10, -10, -10) //v7
];

  // 设置纹理
var cubeGemometry = new THREE.Geometry(); 
cubeGemometry.vertices = vertices;

 //创建立方的面
  var faces=[
    new THREE.Face3(0,1,2),
    new THREE.Face3(0,2,3),
    new THREE.Face3(0,3,4),
    new THREE.Face3(0,4,5),
    new THREE.Face3(1,6,7),
    new THREE.Face3(1,7,2),
    new THREE.Face3(6,5,4),
    new THREE.Face3(6,4,7),
    new THREE.Face3(5,6,1),
    new THREE.Face3(5,1,0),
    new THREE.Face3(3,2,7),
    new THREE.Face3(3,7,4)
  ];
  cubeGemometry.faces = faces;
  //生成法向量
  cubeGemometry.computeFaceNormals();

    var cubeMaterial = new THREE.MeshLambertMaterial({color: 0x00ffff});
        cube = new THREE.Mesh(cubeGemometry, cubeMaterial);
        cube.position.x = 25;
        cube.position.y = 5;
        cube.position.z = -5;

        //告诉立方体需要投射阴影
        cube.castShadow = true;

        scene.add(cube);

        //底部平面
        var planeGeometry = new THREE.PlaneGeometry(100, 100);
        var planeMaterial = new THREE.MeshLambertMaterial({color: 0xaaaaaa});

        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.y = -0;

        //告诉底部平面需要接收阴影
        plane.receiveShadow = true;

    scene.add(plane)
}

function render() {
  renderer.render( scene, camera );
}

 //窗口变动触发的函数
 function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  render();
  renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {
  //更新控制器
  render();

  //更新性能插件
  stats.update();

  //更新相关位置
  light.position.y = gui.lightY;
  cube.position.x = gui.cubeX;
  cube.position.y = gui.cubeY;
  cube.position.z = gui.cubeZ;

  controls.update();

  requestAnimationFrame(animate);
}

  function draw() {
    initGui();
    initRender();
    initScene();
    initCamera();
    initLight();
    initModel();
    initControls();
    initStats();
    animate();
    window.onresize = onWindowResize;
  }
  draw();
}

export default init