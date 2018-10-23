module Begin {
    export class Map {
        game: Phaser.Game;
        tilemap: string;
        tileset: string[];
        backgrounds: string[];

        hero: Begin.Hero;
        hud: Begin.HUD;
        coins: Begin.Coins;

        map: Phaser.Tilemap;
        bg_1: Phaser.TileSprite;
        bg_2: Phaser.TileSprite;
        bg_3: Phaser.TileSprite;
        behind: Phaser.TilemapLayer;
        solids: Phaser.TilemapLayer;
        front: Phaser.TilemapLayer;

        constructor(game: Phaser.Game, tilemap: string, tileset: string[], backgrounds: string[]) {
            this.game = game;
            this.tilemap = tilemap;
            this.tileset = tileset;
            this.backgrounds = backgrounds;
        }

        create() {
            /*******************************
             * Affichage du terrain de jeu *
             *******************************/
            // Création de la map
            // /!\ Bien veiller à ce que chaque nom utilisé en paramètre respecte les noms contenus dans le .json /!\
            this.map = this.game.add.tilemap(this.tilemap);
            this.map.addTilesetImage(this.tileset[0], this.tileset[1]);

            // Positionner la caméra
            this.game.camera.setPosition(160, 144);

            // Création des backgrounds
            this.bg_1 = this.game.add.tileSprite(0, 0, 256, 256, this.backgrounds[0]);
            this.bg_1.smoothed = false;
            this.bg_1.fixedToCamera = true;

            this.bg_2 = this.game.add.tileSprite(0, 0, 256, 256, this.backgrounds[1]);
            this.bg_2.smoothed = false;
            this.bg_2.fixedToCamera = true;

            this.bg_3 = this.game.add.tileSprite(0, 0, 256, 256, this.backgrounds[2]);
            this.bg_3.smoothed = false;
            this.bg_3.fixedToCamera = true;

            // Création des calques 
            // /!\ Respecter la superposition de l'axe z des couches. /!\ 
            // /!\ Le premier calque créé correspond à l'arrière-plan /!\
            // /!\ Le dernier calque créé correspond au premier plan /!\
            // this.background = this.map.createLayer('background');
            this.behind = this.map.createLayer('behind');
            this.solids = this.map.createLayer('solids');

            // Ajuster les collisions de la map
            this.game.world.setBounds(160, 144, 624, 144);
            this.map.setCollisionBetween(0, 168, true, this.solids);

            // Adapter les calques à la map
            this.behind.resizeWorld();
            this.solids.resizeWorld();

            /**********************
             * Création du joueur *
             **********************/
            Hero.lvlDesign = this.game.cache.getJSON('lvldesign');
            Hero.nomLvl = 'Map1';
            this.hero = new Hero(this.game);

            /***********************
             * Création des objets *
             ***********************/
            // Création du HUD
            this.hud = new HUD(this.game);

            // Création des pièces collectables
            this.coins = new Coins(this.game, this.map, this.hud, this.hero);

            /* 
            Layer "Front" spécial qui doit être créé après le player
            car doit être affiché devant lui
            */
            this.front = this.map.createLayer('front');
        }

        update() {
            /************************************
             * Gestion des parallax backgrounds *
             ************************************/
            this.bg_1.tilePosition.x = -(this.game.camera.x * 0.5);
            this.bg_2.tilePosition.x = -(this.game.camera.x * 0.7);
            this.bg_3.tilePosition.x = -(this.game.camera.x * 0.9);

            this.bg_1.tilePosition.y = -(this.game.camera.y * 0.5);
            this.bg_2.tilePosition.y = -(this.game.camera.y * 0.7);
            this.bg_3.tilePosition.y = -(this.game.camera.y * 0.9);

            /**************************
             * Gestion des collisions *
             **************************/
            // Gestion de la collision entre le joueur et le calque des solides
            this.game.physics.arcade.collide(this.hero, this.solids);
        }
    }
}
