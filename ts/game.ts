// Configuration générale du jeu
module Begin {    
    // Paramètres du jeu
    export class Jeu extends Phaser.Game {
        constructor () {
            /**********************
             * Création du canvas *
             **********************/
            super(160, 144, Phaser.AUTO, '', null, false, false);

            /*****************************************
             * Gestion des écrans (ou states) du jeu *
             *****************************************/
            // Ajout des différents écrans
            this.state.add('Boot', Boot, true);
            this.state.add('Preloader', Preloader, false);
            this.state.add('TitleScreen', TitleScreen, false);
            this.state.add('TitleMenu', TitleMenu, false);
            this.state.add('Map1', Map1, false);
            this.state.add('Map2', Map2, false);
        }
    }
}