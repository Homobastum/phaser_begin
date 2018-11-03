module Begin {
    export class Boot extends Phaser.State {
        preload () {
            /****************************
             * Configuration du display *
             ****************************/
            // Adapter le jeu à l'écran
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            // Pixel Perfect
            this.game.renderer.renderSession.roundPixels = true;
            Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

            // Centrer le jeu à l'écran
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;

            /********************************
             * Configuration de la physique *
             ********************************/
            // Intégration de la gestion de la physique
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
        }

        create () {
            this.game.state.start('Preloader', true, false);
        }
    }

    export class Preloader extends Phaser.State {
        logo: Phaser.Sprite;

        preload () {
            /*************************
             * Chargement des assets *
             *************************/
            // Chargement des polices
            this.game.load.bitmapFont('retrofont', 'assets/fonts/retrofont.png', 'assets/fonts/retrofont.xml');

            // Chargement des sons
            this.load.audio('coin', 'assets/sounds/coin.mp3', true);
            this.load.audio('trap_hurting', 'assets/sounds/trap_hurting.wav', true);
            this.load.audio('jump', 'assets/sounds/jump.mp3', true);

            // Chargement des images
            this.game.load.image('logo', 'assets/img/logo.png');
            this.game.load.image('title_screen', 'assets/img/title_screen.png');
            this.game.load.image('spring_bg_1', 'assets/img/spring_bg_1.png');
            this.game.load.image('spring_bg_2', 'assets/img/spring_bg_2.png');
            this.game.load.image('spring_bg_3', 'assets/img/spring_bg_3.png');
            this.game.load.image('hud_bg', 'assets/img/hud_bg.png');
            this.game.load.image('hud_hp', 'assets/img/hud_hp.png');
            this.game.load.image('hud_mp', 'assets/img/hud_mp.png');
            
            // Chargement des tilesets
            this.game.load.image('spring', 'assets/tilesets/spring.png');
            this.game.load.image('summer', 'assets/tilesets/summer.png');
            this.game.load.image('autumn', 'assets/tilesets/autumn.png');
            this.game.load.image('winter', 'assets/tilesets/winter.png');
            this.game.load.spritesheet('items', 'assets/tilesets/items.png', 16, 16);

            // Chargement des charsets
            this.game.load.spritesheet('hero', 'assets/charsets/hero.png', 16, 16);
            this.game.load.spritesheet('enemies', 'assets/charsets/enemies.png', 16, 16);
            
            // Chargement des maps
            this.game.load.json('lvldesign', 'assetS/maps/lvldesign.json');
            this.game.load.tilemap('map1', 'assets/maps/map1.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.tilemap('map2', 'assets/maps/map2.json', null, Phaser.Tilemap.TILED_JSON);
        }

        create () {
            // Fast debug (à supprimer lorsque le développement du jeu sera terminé)
            this.changeState('Map2');
            
            // Afficher le splash screen "HB Lab"
            this.logo = this.add.sprite(this.world.centerX, this.world.centerY, 'logo');
            this.logo.anchor.setTo(0.5, 0.5);
            this.logo.scale.setTo(1, 1);

            // Aller à l'écran titre après 1 seconde d'affichage
            this.game.time.events.add(1000, this.changeState, this, 'TitleScreen');
        }

        /**
         * Aller à l'écran de jeu (ou le state) suivant.
         * @param state Ecran du jeu à démarrer 
         */
        changeState (state: string) {
            this.game.state.start(state, true, false);
        }
    }
}