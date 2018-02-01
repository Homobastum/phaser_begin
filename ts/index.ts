// Paramètres généraux du jeu
module Begin
{
    export class Jeu extends Phaser.Game 
    {
        constructor() 
        {
            super(800, 600, Phaser.AUTO, 'zoneDeJeu', null);

            this.state.add('Boot', Boot, false);
            this.state.add('Preloader', Preloader, false);
            this.state.add('TitleScreen', TitleScreen, false);
            this.state.add('TitleMenu', TitleMenu, false);
            this.state.add('Map1', Map1, false);

            this.state.start('Preloader');
        }
    }
}

// Lancement du jeu
window.onload = () => 
{
    new Begin.Jeu();
};