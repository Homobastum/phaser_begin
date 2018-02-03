module Begin
{
    export class Map1 extends Phaser.State
    {
        map: Phaser.Tilemap;
        layer: Phaser.TilemapLayer;

        create() 
        {
            /*******************************
             * Affichage du terrain de jeu *
             *******************************/
            // Création de la map
            // /!\ Bien veiller à ce que chaque nom utilisé en paramètre respecte les noms contenus dans le .json /!\
            this.map = this.game.add.tilemap('map1');
            this.map.addTilesetImage('general', 'tileset');

            // Création des calques 
            // /!\ Respecter la superposition de l'axe z des couches. /!\ 
            // /!\ Le premier calque créé correspond à l'arrière-plan /!\
            // /!\ Le dernier calque créé correspond au premier plan /!\
            this.layer = this.map.createLayer('background');
            this.layer = this.map.createLayer('behind');
            this.layer = this.map.createLayer('solids');
            //this.layer = this.map.createLayer('events');
            this.layer = this.map.createLayer('front');
            
            // Adapter les calques à la map
            this.layer.resizeWorld();
        }

        update()
        {

        }
    }
}
