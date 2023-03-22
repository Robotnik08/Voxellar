import * as THREE from 'three';
import {PointerLockControls} from 'https://threejs.org/examples/jsm/controls/PointerLockControls.js';
import { KeyHandler } from './input.js';
import { TileData } from './textures.js';
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
const controls = new PointerLockControls( camera, renderer.domElement );
const keys = new KeyHandler();
const tiles = new TileData();
camera.position.set( 0, 20, 100 );
let speed =  1;
window.addEventListener("mousedown", ()=> {
    controls.lock();
})
function animate() {
    if (keys.getKey("KeyW")) {
        camera.translateZ(-speed);
    }
    if (keys.getKey("KeyS")) {
        camera.translateZ(speed);
    }
    if (keys.getKey("KeyA")) {
        camera.translateX(-speed);
    }
    if (keys.getKey("KeyD")) {
        camera.translateX(speed);
    }
	renderer.render( scene, camera );
	requestAnimationFrame( animate );

}
const mapSize = 100;
const map = [];
const mesh = [];
const seed = Math.random()*10000|0;
const frequenty = 0.20;
const smoothness = 0.1;
for (let x = 0; x < mapSize; x++) {
    mesh[x] = [];
    for (let y = 0; y < mapSize; y++) {
        mesh[x][y] = [];
        for (let z = 0; z < mapSize; z++) {
            mesh[x][y][z] = false;
        }
    }
}
generateWorld();
function generateWorld () {
    for (let x = 0; x < mapSize; x++) {
        map[x] = [];
        for (let y = 0; y < mapSize; y++) {
            map[x][y] = [];
            for (let z = 0; z < mapSize; z++) {
                map[x][y][z] = getNoise(x*smoothness,y*smoothness,z*smoothness+seed*10) < frequenty ? 1 : 0;
            }
        }
    }
    for (let x = 0; x < mapSize; x++) {
        for (let y = 0; y < mapSize; y++) {
            for (let z = 0; z < mapSize; z++) {
                if (map[x][y][z]) AddBlock(1,1,1, new THREE.Vector3(x,y,z), map[x][y][z]);
            }
        }
    }
}
camera.position.set( 0, 0, 100 );
function AddBlock (w, h, d, position, id) {
    if (position.x > 0 && 
    position.x < mapSize-1 && 
    position.y > 0 && 
    position.y < mapSize-1 &&
    position.z > 0 && 
    position.z < mapSize-1) if (map[position.x+1][position.y][position.z] &&
        map[position.x-1][position.y][position.z] &&
        map[position.x][position.y+1][position.z] &&
        map[position.x][position.y-1][position.z] &&
        map[position.x][position.y][position.z+1] &&
        map[position.x][position.y][position.z-1]
    ) return;
    const geometry = new THREE.BoxGeometry( w, h, d );
    const material = [
        position.x < mapSize-1 ? !map[position.x+1][position.y][position.z] ? tiles.tile[id].texture : null : tiles.tile[id].texture,
        position.x > 0 ? !map[position.x-1][position.y][position.z] ? tiles.tile[id].texture : null : tiles.tile[id].texture,
        position.y < mapSize-1 ? !map[position.x][position.y+1][position.z] ? tiles.tile[id].texture : null : tiles.tile[id].texture,
        position.y > 0 ? !map[position.x][position.y-1][position.z] ? tiles.tile[id].texture : null : tiles.tile[id].texture,
        position.z < mapSize-1 ? !map[position.x][position.y][position.z+1] ? tiles.tile[id].texture : null : tiles.tile[id].texture,
        position.z > 0 ? !map[position.x][position.y][position.z-1] ? tiles.tile[id].texture : null : tiles.tile[id].texture,
    ]
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    mesh[position.x][position.y][position.z] = cube;
    cube.translateX(position.x);
    cube.translateY(position.y);
    cube.translateZ(position.z);
}
animate();
function randomChance (chance) {
    return !((Math.random()*chance)|0);
}


function getNoise(x, y, z) {

    const p = [];
    const permutation = [ 151,160,137,91,90,15,
    131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
    190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
    88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
    77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
    102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
    135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
    5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
    223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
    129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
    251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
    49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
    138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180
    ];
    for (let i=0; i < 256 ; i++) p[256+i] = p[i] = permutation[i]; 

        const X = Math.floor(x) & 255,                  // FIND UNIT CUBE THAT
            Y = Math.floor(y) & 255,                  // CONTAINS POINT.
            Z = Math.floor(z) & 255;
        x -= Math.floor(x);                                // FIND RELATIVE X,Y,Z
        y -= Math.floor(y);                                // OF POINT IN CUBE.
        z -= Math.floor(z);
        const    u = fade(x),                                // COMPUTE FADE CURVES
                v = fade(y),                                // FOR EACH OF X,Y,Z.
                w = fade(z);
                const A = p[X  ]+Y, AA = p[A]+Z, AB = p[A+1]+Z,      // HASH COORDINATES OF
            B = p[X+1]+Y, BA = p[B]+Z, BB = p[B+1]+Z;      // THE 8 CUBE CORNERS,

        return scale(lerp(w, lerp(v, lerp(u, grad(p[AA  ], x  , y  , z   ),  // AND ADD
                                        grad(p[BA  ], x-1, y  , z   )), // BLENDED
                                lerp(u, grad(p[AB  ], x  , y-1, z   ),  // RESULTS
                                        grad(p[BB  ], x-1, y-1, z   ))),// FROM  8
                        lerp(v, lerp(u, grad(p[AA+1], x  , y  , z-1 ),  // CORNERS
                                        grad(p[BA+1], x-1, y  , z-1 )), // OF CUBE
                                lerp(u, grad(p[AB+1], x  , y-1, z-1 ),
                                        grad(p[BB+1], x-1, y-1, z-1 )))));
    }
    function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
    function lerp( t, a, b) { return a + t * (b - a); }
    function grad(hash, x, y, z) {
        var h = hash & 15;                      // CONVERT LO 4 BITS OF HASH CODE
        var u = h<8 ? x : y,                 // INTO 12 GRADIENT DIRECTIONS.
                v = h<4 ? y : h==12||h==14 ? x : z;
        return ((h&1) == 0 ? u : -u) + ((h&2) == 0 ? v : -v);
    } 
    function scale(n) { return (1 + n)/2; }