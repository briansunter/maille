import { MeshPhongMaterial, WebGLRenderer, Scene, PerspectiveCamera, PointLight, TorusGeometry, Mesh} from 'three'
import OrbitControls from './controls/OrbitControls'

/* Custom settings */
const SETTINGS = {
  useComposer: false
}

let composer
let stats

/* Init renderer and canvas */
const container = document.body
const renderer = new WebGLRenderer()
container.style.overflow = 'hidden'
container.style.margin = 0
container.appendChild(renderer.domElement)
renderer.setClearColor(0x3d3b33)

/* Main scene and camera */
const scene = new Scene()
const camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
const controls = new OrbitControls(camera)
camera.position.z = 200
controls.enableDamping = true
controls.dampingFactor = 0.15
controls.start()

/* Lights */
const frontLight = new PointLight(0xFFFFFF, 1)
const backLight = new PointLight(0xFFFFFF, 1)
scene.add(frontLight)
scene.add(backLight)
frontLight.position.set(2, 20, 20)
backLight.position.set(-2, -20, 20)

/* Various event listeners */
window.addEventListener('resize', onResize)

/* Preloader */
  onResize()
  animate()

  /* Actual content of the scene */
  // const helmet = new Helmet()
  // scene.add(helmet)
  for (var y = 0 ; y < 10 ; y++) {
    for (var x = 0 ; x < 10 ; x++) {
      addFourInOne(scene,x*10,y*6);
    }
  }

function addFourInOne(scene, x,y){

  const material = new MeshPhongMaterial( {
    color: 0x996633,
    specular: 0x050505,
    shininess: 100,
  });

  const lowerLeft = new TorusGeometry( 4, .6, 16, 100 );
  const lowerLeftRing = new Mesh( lowerLeft, material );
  lowerLeftRing.position.set(x,y,0);
  lowerLeftRing.rotation.x = -1 * Math.PI/5;
  scene.add( lowerLeftRing);

  const middle= new TorusGeometry( 4, .6, 16, 100 );
  const middleRing = new Mesh( middle , material );
  middleRing.position.set(x + 5,2+y,0);
  middleRing.rotation.x = Math.PI/5;
  scene.add( middleRing);
}

/* some stuff with gui */


if (DEVELOPMENT) {
  const guigui = require('guigui')
  guigui.add(SETTINGS, 'useComposer')

  const Stats = require('stats.js')
  stats = new Stats()
  stats.showPanel(0)
  container.appendChild(stats.domElement)
  stats.domElement.style.position = 'absolute'
  stats.domElement.style.top = 0
  stats.domElement.style.left = 0
}

/**
  Resize canvas
*/
function onResize () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  // composer.setSize(window.innerWidth, window.innerHeight)
}

/**
  RAF
*/
function animate() {
  window.requestAnimationFrame(animate)
  render()
}

/**
  Render loop
*/
function render () {
  controls.update()
  if (SETTINGS.useComposer) {
    composer.render()
  } else {
    renderer.clear()
    renderer.render(scene, camera)
  }
}
