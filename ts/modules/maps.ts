module Begin
{
    export class Map1 extends Phaser.State
    {
        hero: Begin.Hero;
        map: Phaser.Tilemap;
        background: Phaser.TilemapLayer;
        behind: Phaser.TilemapLayer;
        solids: Phaser.TilemapLayer;
        front: Phaser.TilemapLayer;

        create() 
        {
            /*******************************
             * Affichage du terrain de jeu *
             *******************************/
            // Création de la map
            // /!\ Bien veiller à ce que chaque nom utilisé en paramètre respecte les noms contenus dans le .json /!\
            this.map = this.game.add.tilemap('map1');
            this.map.addTilesetImage('general', 'general');
            
            // Positionner la caméra
            this.game.camera.setPosition(160, 144);

            // Création des calques 
            // /!\ Respecter la superposition de l'axe z des couches. /!\ 
            // /!\ Le premier calque créé correspond à l'arrière-plan /!\
            // /!\ Le dernier calque créé correspond au premier plan /!\
            this.background = this.map.createLayer('background');
            this.behind = this.map.createLayer('behind');
            this.solids = this.map.createLayer('solids');
            this.front = this.map.createLayer('front');
            
            // Ajuster les collisions de la map
            this.game.world.setBounds(160, 144, 160, 144);
            this.map.setCollision([214, 215, 216, 243, 244, 245, 272, 274], true, 'solids');
            
            // Adapter les calques à la map
            this.background.resizeWorld();

            /**********************
             * Création du joueur *
             **********************/
            this.hero = new Hero(this.game, 72, 80);
        }

        update()
        {
            /**************************
             * Gestion des collisions *
             **************************/
            // Gestion de la collision entre le joueur et le calque des solides
            this.game.physics.arcade.collide(this.hero, this.solids);
        }
    }
}
