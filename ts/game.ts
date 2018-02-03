// Paramètres généraux du jeu
module Begin
{
    export class Jeu extends Phaser.Game 
    {
        constructor() 
        {
            /**********************
             * Création du canvas *
             **********************/
             super(160, 144, Phaser.AUTO, '', null);

            /*****************************************
             * Gestion des écrans (ou states) du jeu *
             *****************************************/
            // Ajout des différents écrans
            this.state.add('Boot', Boot, false);
            this.state.add('Preloader', Preloader, false);
            this.state.add('TitleScreen', TitleScreen, false);
            this.state.add('TitleMenu', TitleMenu, false);
            this.state.add('Map1', Map1, false);

            // Lancement du premier écran
            this.state.start('Boot');
        }
    }
}