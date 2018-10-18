module Begin {
    export class Map1 extends Phaser.State {
        hero: Begin.Hero;
        hud: Begin.HUD;
        coins: Begin.Coins;

        map: Phaser.Tilemap;
        background: Phaser.TilemapLayer;
        behind: Phaser.TilemapLayer;
        solids: Phaser.TilemapLayer;
        front: Phaser.TilemapLayer;

        create () {
            /*******************************
             * Affichage du terrain de jeu *
             *******************************/
            // Création de la map
            // /!\ Bien veiller à ce que chaque nom utilisé en paramètre respecte les noms contenus dans le .json /!\
            this.map = this.game.add.tilemap('map1');
            this.map.addTilesetImage('spring', 'spring');
            
            // Positionner la caméra
            this.game.camera.setPosition(160, 144);

            // Création des calques 
            // /!\ Respecter la superposition de l'axe z des couches. /!\ 
            // /!\ Le premier calque créé correspond à l'arrière-plan /!\
            // /!\ Le dernier calque créé correspond au premier plan /!\
            this.background = this.map.createLayer('background');
            this.behind = this.map.createLayer('behind');
            this.solids = this.map.createLayer('solids');
            
            // Ajuster les collisions de la map
            this.game.world.setBounds(160, 144, 640, 144);
            this.map.setCollisionBetween(0, 168, true, this.solids);
            
            // Adapter les calques à la map
            this.background.resizeWorld();
            
            /**********************
             * Création du joueur *
             **********************/
            Hero.lvlDesign = this.game.cache.getJSON('lvldesign');
            Hero.nomLvl = 'Map1';
            this.hero = new Hero(this.game);

            /* 
            Layer "Front" spécial qui doit être créé après le player
            car doit être affiché devant lui
            */
            this.front = this.map.createLayer('front');

            /***********************
             * Création des objets *
             ***********************/
            // Création du HUD
            this.hud = new HUD(this.game);
            
            // Création des pièces collectables
            this.coins = new Coins(this.game, this.map, this.hud, this.hero);
        }
        
        update () {
            /**************************
             * Gestion des collisions *
             **************************/
            // Gestion de la collision entre le joueur et le calque des solides
            this.game.physics.arcade.collide(this.hero, this.solids);
        }
    }

    export class Map2 extends Phaser.State {
        hero: Begin.Hero;
        hud: Begin.HUD;
        coins: Begin.Coins;

        map: Phaser.Tilemap;
        background: Phaser.TilemapLayer;
        behind: Phaser.TilemapLayer;
        solids: Phaser.TilemapLayer;
        front: Phaser.TilemapLayer;

        create () {
            /*******************************
             * Affichage du terrain de jeu *
             *******************************/
            // Création de la map
            // /!\ Bien veiller à ce que chaque nom utilisé en paramètre respecte les noms contenus dans le .json /!\
            this.map = this.game.add.tilemap('map2');
            this.map.addTilesetImage('spring', 'spring');
            
            // Positionner la caméra
            this.game.camera.setPosition(160, 144);

            // Création des calques 
            // /!\ Respecter la superposition de l'axe z des couches. /!\ 
            // /!\ Le premier calque créé correspond à l'arrière-plan /!\
            // /!\ Le dernier calque créé correspond au premier plan /!\
            this.background = this.map.createLayer('background');
            this.behind = this.map.createLayer('behind');
            this.solids = this.map.createLayer('solids');
            
            // Ajuster les collisions de la map
            this.game.world.setBounds(160, 144, 160, 144);
            this.map.setCollisionBetween(0, 168, true, this.solids);
            
            // Adapter les calques à la map
            this.background.resizeWorld();
            
            /**********************
             * Création du joueur *
             **********************/
            Hero.lvlDesign = this.game.cache.getJSON('lvldesign');
            Hero.nomLvl = 'Map2';
            this.hero = new Hero(this.game);

            /* 
            Layer "Front" spécial qui doit être créé après le player
            car doit être affiché devant lui
            */
            this.front = this.map.createLayer('front');

            /***********************
             * Création des objets *
             ***********************/
            // Création du HUD
            this.hud = new HUD(this.game);
            
            // Création des pièces collectables
            this.coins = new Coins(this.game, this.map, this.hud, this.hero);
        }
        
        update () {
            /**************************
             * Gestion des collisions *
             **************************/
            // Gestion de la collision entre le joueur et le calque des solides
            this.game.physics.arcade.collide(this.hero, this.solids);
        }
    }
}
