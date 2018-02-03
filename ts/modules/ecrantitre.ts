module Begin
{
    export class TitleScreen extends Phaser.State 
    {
        titleScreen: Phaser.Sprite;

        create() 
        {
            /******************************
             * Affichage de l'écran titre *
             ******************************/
            // Afficher l'écran titre au centre du canvas
            this.titleScreen = this.add.sprite(this.world.centerX, this.world.centerY, 'title_screen');
            this.titleScreen.anchor.setTo(0.5, 0.5);

            this.game.time.events.add(5000, this.changeState, this, 'Map1');
        }

        update()
        {

        }

        changeState(state: string) 
        {
            this.game.state.start(state, true, false);
        }
    }

    export class TitleMenu extends Phaser.State 
    {
        create() 
        {

        }

        update()
        {

        }
    }
}

