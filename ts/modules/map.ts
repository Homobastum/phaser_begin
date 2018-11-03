module Begin {
    export class Map {
        game: Phaser.Game;
        nomLvl: string;
        tilemap: string;
        tileset: string[];
        backgrounds: string[];

        hero: Begin.Hero;
        hud: Begin.HUD;
        coins: Begin.Coins;
        pics: Begin.Pics;

        map: Phaser.Tilemap;
        bg_1: Phaser.TileSprite;
        bg_2: Phaser.TileSprite;
        bg_3: Phaser.TileSprite;
        behind: Phaser.TilemapLayer;
        solids: Phaser.TilemapLayer;
        front: Phaser.TilemapLayer;

        constructor(game: Phaser.Game, nomLvl: string, tilemap: string, tileset: string[], backgrounds: string[]) {
            this.game = game;
            this.nomLvl = nomLvl;
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
            this.front = this.map.createLayer('front');

            // Ajuster les collisions de la map
            this.game.world.setBounds(160, 144, 624, 144);
            this.map.setCollisionBetween(0, 168, true, this.solids);

            // Adapter les calques à la map
            this.behind.resizeWorld();
            this.solids.resizeWorld();

            /*******************
             * Création du HUD *
             *******************/
            this.hud = new HUD(this.game);

            /**********************
             * Création du joueur *
             **********************/
            Hero.lvlDesign = this.game.cache.getJSON('lvldesign');
            Hero.nomLvl = this.nomLvl;
            this.hero = new Hero(this.game, this.hud);

            /***********************
             * Création des objets *
             ***********************/
            // Création des pièces collectables
            this.coins = this.groupeObjetsExiste('coins') ? new Coins(this.game, this.map, this.hud, this.hero) : null;

            // Création des pics
            this.pics = this.groupeObjetsExiste('pics') ? new Pics(this.game, this.map, this.hud, this.hero) : null;

            /********************************************
             * Ajuster la profondeur des objets (axe z) * 
             ********************************************/
            /* 
            Placer le HUD au-dessus de l'ensemble des objets de la map,
            sauf le layer front et le HUD
            */
            this.game.world.bringToTop(this.hero);

            /* 
            Placer le HUD au-dessus de l'ensemble des objets de la map,
            sauf le HUD
            */
            this.game.world.bringToTop(this.front);

            // Placer le HUD au-dessus de l'ensemble des objets de la map
            this.game.world.bringToTop(this.hud);
        }

        update() {
            /************************************
             * Gestion des parallax backgrounds *
             ************************************/
            this.bg_1.tilePosition.x = -(this.game.camera.x * 0.2);
            this.bg_2.tilePosition.x = -(this.game.camera.x * 0.5);
            this.bg_3.tilePosition.x = -(this.game.camera.x * 0.8);

            this.bg_1.tilePosition.y = -(this.game.camera.y * 0.2);
            this.bg_2.tilePosition.y = -(this.game.camera.y * 0.5);
            this.bg_3.tilePosition.y = -(this.game.camera.y * 0.8);

            /**************************
             * Gestion des collisions *
             **************************/
            // Gestion de la collision entre le joueur et le calque des solides
            this.game.physics.arcade.collide(this.hero, this.solids);
        }

        groupeObjetsExiste (nomGroupe: string) {
            // Vérifier que les groupes d'objets existent bien sur la map courante avant de les créer
            for (let object in this.map.objects) {
                if (object == nomGroupe) {
                    return true;
                }
            }

            return false;
        }
    }
}
