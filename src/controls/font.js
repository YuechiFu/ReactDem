import * as THREE from 'three';
import { OrbitControls } from '@jsm/controls/OrbitControls.js';
import Stats from '@jsm/libs/stats.module.js';
import dat from '@jsm/libs/dat.gui.module.js';
import skin from '@img/texture/bg.jpg'
// import fontFile from '@fonts/gentilis_regular.typeface.json'
// console.log(fontFile)

const path = require("path")

// console.log(paths)
export default function(content){

// 根元素

let rootDom = document.getElementById('3d-canvas');
let w = rootDom.offsetWidth;
let h = rootDom.offsetHeight;
rootDom.innerHTML = ''

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
    controls.enableDamping = false;
    //动态阻尼系数 就是鼠标拖拽旋转灵敏度
    //controls.dampingFactor = 0.25;
    //是否可以缩放
    controls.enableZoom = true;
    //是否自动旋转
    controls.autoRotate = false;
    //d
    controls.minDistance  = 200;
    //设置相机距离原点的最远距离
    controls.maxDistance  = 600;
    //是否开启右键拖拽
    controls.enablePan = true;
}

  //初始化dat.GUI简化试验流程
  let gui;
  function initGui() {
      if(document.querySelector('.dg.ac') ){
        document.querySelector('.dg.ac').innerHTML = ''
      }
      //声明一个保存需求修改的相关数据的对象
      gui = {
          lightY: 100, //灯光y轴的位置
          lightX: 100, //灯光X轴的位置
          lightZ: 100, //灯光Z轴的位置
          cubeX: 25, //立方体的x轴位置
          cubeY: 10, //立方体的x轴位置
          cubeZ: -5, //立方体的z轴的位置
          fontSize : 60,
          fontHeight : 10,
      };
      var datGui = new dat.GUI();
      //将设置属性添加到gui当中，gui.add(对象，属性，最小值，最大值）
      datGui.add(gui, "lightY", 0, 100);
      datGui.add(gui, "lightX", 0, 100);
      datGui.add(gui, "lightZ", 0, 100);
      datGui.add(gui, "cubeX", -30, 301);
      datGui.add(gui, "cubeY", -30, 30);
      datGui.add(gui, "cubeZ", -30, 30);
      datGui.add(gui, "fontSize", 16, 200);
      datGui.add(gui, "fontHeight", 20, 400);
  }
  var fontModel;
  var font;
  function initModel() {
    var loader = new THREE.FontLoader();
     loader.load( 'https://threejs.org/examples/fonts/gentilis_bold.typeface.json', function (res) {
        font = new THREE.TextBufferGeometry(content, {
            font:  res,
            size: gui.fontSize,
            height: gui.fontHeight,
        });

        font.center();
        console.log(font)
        var map = new THREE.TextureLoader().load(skin);
        var material = new THREE.MeshLambertMaterial({map:map,side:THREE.DoubleSide});

        fontModel = new THREE.Mesh(font,material);

        scene.add(fontModel);
     })
}
    var renderer;
    function initRender() {
        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(w, h);
        rootDom.appendChild(renderer.domElement);
    }

    var camera;
    function initCamera() {
        camera = new THREE.PerspectiveCamera(45, w / h, 1, 10000);
        camera.position.set(0, 0, 400);
    }

    var scene;
    function initScene() {
        scene = new THREE.Scene();
    }

    var light;
    function initLight() {
        scene.add(new THREE.AmbientLight(0xffffff));
        light = new THREE.DirectionalLight(0xffffff);
        light.position.set(gui.lightX, gui.lightZ, gui.lightY);
        scene.add(light);
    }

    function render() {
      renderer.render(scene, camera);
  }

  //窗口变动触发的函数
  function onWindowResize() {
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      render();
      renderer.setSize(w,h);

  }

  function animate() {

        //更新相关位置
      //更新控制器
      controls.update();
      render();
      stats.update();

      light.position.y = gui.lightY;
      light.position.x = gui.lightX;
      light.position.z= gui.lightZ;
    //   font.size = gui.fontSize;
    //   font.height = gui.fontHeight
      //更新性能插件
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
  draw()

}