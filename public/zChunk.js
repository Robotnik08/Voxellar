
console.log("hello");
// import * as THREE from 'https://unpkg.com/three/build/three.module.js';
// import { TileData } from './textures.js';
const renderer = new THREE.WebGLRenderer(new OffscreenCanvas(window.innerWidth, window.innerHeight));
renderer.setSize( window.innerWidth, window.innerHeight );
const scene = new THREE.Scene();
const camera = null;
const tiles = new TileData();
const position = {};
function animate() {
	renderer.render(scene, camera);
    postMessage(renderer.domElement);
	requestAnimationFrame(animate);
}
let mapSize;
let map = [];
const mesh = [];
    console.log("test");
onmessage = (e) => {
    if (e.data.init) {
        position.x = e.data.x;
        position.y = e.data.y;
        camera = e.data.cam;
        map = e.data.map;
        mapSize = e.data.mapSize;
        animate();
    }
};
for (let x = 0; x < mapSize.x; x++) {
    mesh[x] = [];
    for (let y = 0; y < mapSize.y; y++) {
        mesh[x][y] = [];
        for (let z = 0; z < mapSize.z; z++) {
            mesh[x][y][z] = false;
        }
    }
}
generateWorld();
function generateWorld () {
    for (let x = position.x; x < position.x+16; x++) {
        for (let y = 1; y < mapSize.y-1; y++) {
            for (let z = position.z; z < position.z+16; z++) {
                if (map[x][y][z]) AddBlock(1,1,1, new THREE.Vector3(x,y,z), map[x][y][z]);
            }
        }
    }
}
function AddBlock (w, h, d, position, id) {
    if (position.x > 0 && 
    position.x < mapSize.x-1 && 
    position.y > 0 && 
    position.y < mapSize.y-1 &&
    position.z > 0 && 
    position.z < mapSize.z-1) if (
        map[position.x+1][position.y][position.z] &&
        map[position.x-1][position.y][position.z] &&
        map[position.x][position.y+1][position.z] &&
        map[position.x][position.y-1][position.z] &&
        map[position.x][position.y][position.z+1] &&
        map[position.x][position.y][position.z-1]
    ) return;
    const geometry = new THREE.BoxGeometry( w, h, d );
    const material = [
        position.x < mapSize.x-1 ? !map[position.x+1][position.y][position.z] ? tiles.tile[id].texture[0] : null : null,
        position.x > 0 ? !map[position.x-1][position.y][position.z] ? tiles.tile[id].texture[1] : null : null,
        position.y < mapSize.y-1 ? !map[position.x][position.y+1][position.z] ? tiles.tile[id].texture[2] : null : null,
        position.y > 0 ? !map[position.x][position.y-1][position.z] ? tiles.tile[id].texture[3] : null : null,
        position.z < mapSize.z-1 ? !map[position.x][position.y][position.z+1] ? tiles.tile[id].texture[4] : null : null,
        position.z > 0 ? !map[position.x][position.y][position.z-1] ? tiles.tile[id].texture[5] : null : null,
    ]
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    cube.translateX(position.x);
    cube.translateY(position.y);
    cube.translateZ(position.z);
}