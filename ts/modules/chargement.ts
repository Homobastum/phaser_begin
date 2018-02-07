module Begin 
{
    export class Boot extends Phaser.State 
    {
        preload() 
        {
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
<<<<<<< HEAD
=======

            /********************************
             * Configuration de la physique *
             ********************************/
            // Intégration de la gestion de la physique
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
>>>>>>> collectables
        }

        create() 
        {
            this.game.state.start('Preloader', true, false);
        }
    }

    export class Preloader extends Phaser.State 
    {
<<<<<<< HEAD
        preload() 
        {
            this.load.image('logo', 'assets/img/logo.png');
=======
        logo: Phaser.Sprite;

        preload() 
        {
            /*************************
             * Chargement des assets *
             *************************/
            // Chargement des sons
            this.load.audio('coin', 'assets/sounds/coin.mp3', true);
            this.load.audio('jump', 'assets/sounds/jump.mp3', true);

            // Chargement des images
            this.game.load.image('logo', 'assets/img/logo.png');
            this.game.load.image('title_screen', 'assets/img/title_screen.png');
            
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
            this.game.load.tilemap('map1', 'assets/maps/map1.json', null, Phaser.Tilemap.TILED_JSON);
>>>>>>> collectables
        }

        create() 
        {
<<<<<<< HEAD
            var logo = this.add.sprite(this.world.centerX, this.world.centerY, 'logo');
            logo.anchor.setTo(0.5, 0.5);

            // this.game.state.start('TitleScreen', true, false);
=======
            // Afficher le splash screen "HB Lab"
            this.logo = this.add.sprite(this.world.centerX, this.world.centerY, 'logo');
            this.logo.anchor.setTo(0.5, 0.5);
            this.logo.scale.setTo(1, 1);

            // Aller à l'écran titre après 3 secondes d'affichage
            this.game.time.events.add(1000, this.changeState, this, 'TitleScreen');
        }

        /**
         * Aller à l'écran de jeu (ou le state) suivant.
         * @param state Ecran du jeu à démarrer 
         */
        changeState(state: string)
        {
            this.game.state.start(state, true, false);
>>>>>>> collectables
        }
    }
}