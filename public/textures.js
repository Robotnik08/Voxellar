import * as THREE from 'three';
export class TileData {
    constructor () {
        this.texture = {};
        this.texture.stone = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( './images/stone.png' ) } );
        this.texture.dirt = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( './images/dirt.png' ) } );
        this.texture.grass = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( './images/grass.png' ) } );
        this.tile = [];
        this.tile[1] = new Tile(this.texture.stone, 1);
        this.tile[2] = new Tile(this.texture.dirt, 2);
        this.tile[3] = new Tile(this.texture.grass, 2);
    }
}
class Tile {
    constructor (texture, id) {
        this.texture = texture;
        this.id = id;
    }
}