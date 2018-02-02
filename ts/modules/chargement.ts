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
        }

        create() 
        {
            this.game.state.start('Preloader', true, false);
        }
    }

    export class Preloader extends Phaser.State 
    {
        preload() 
        {
            this.load.image('logo', 'assets/img/logo.png');
        }

        create() 
        {
            var logo = this.add.sprite(this.world.centerX, this.world.centerY, 'logo');
            logo.anchor.setTo(0.5, 0.5);

            // this.game.state.start('TitleScreen', true, false);
        }
    }
}