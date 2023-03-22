import * as THREE from 'three';
export class TileData {
    constructor () {
        this.texture = {};
        const stone = new THREE.TextureLoader().load( './images/stone.png' );
        stone.minFilter = THREE.NearestFilter;
        stone.magFilter = THREE.NearestFilter;
        this.texture.stone = new THREE.MeshBasicMaterial( { map: stone });
        const dirt = new THREE.TextureLoader().load( './images/dirt.png' );
        dirt.minFilter = THREE.NearestFilter;
        dirt.magFilter = THREE.NearestFilter;
        this.texture.dirt = new THREE.MeshBasicMaterial( { map: dirt });
        const grass = new THREE.TextureLoader().load( './images/grass.png' );
        grass.minFilter = THREE.NearestFilter;
        grass.magFilter = THREE.NearestFilter;
        this.texture.grass = new THREE.MeshBasicMaterial( { map: grass });
        const grass_top = new THREE.TextureLoader().load( './images/grass_top.png' );
        grass_top.minFilter = THREE.NearestFilter;
        grass_top.magFilter = THREE.NearestFilter;
        this.texture.grass_top = new THREE.MeshBasicMaterial( { map: grass_top });
        this.tile = [];
        this.tile[1] = new Tile([this.texture.stone,this.texture.stone,this.texture.stone,this.texture.stone,this.texture.stone,this.texture.stone], 1);
        this.tile[2] = new Tile([this.texture.dirt,this.texture.dirt,this.texture.dirt,this.texture.dirt,this.texture.dirt,this.texture.dirt], 2);
        this.tile[3] = new Tile([this.texture.grass,this.texture.grass,this.texture.grass_top,this.texture.dirt,this.texture.grass,this.texture.grass], 3);
    }
}
class Tile {
    constructor (texture, id) {
        this.texture = texture;
        this.id = id;
    }
}