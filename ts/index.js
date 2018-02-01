// Paramètres généraux du jeu
var Begin;
(function (Begin) {
    class Jeu extends Phaser.Game {
        constructor() {
            super(800, 600, Phaser.AUTO, 'zoneDeJeu', null);
            this.state.add('Boot', Begin.Boot, false);
            this.state.add('Preloader', Begin.Preloader, false);
            this.state.add('TitleScreen', Begin.TitleScreen, false);
            this.state.add('TitleMenu', Begin.TitleMenu, false);
            this.state.add('Map1', Begin.Map1, false);
            this.state.start('Preloader');
        }
    }
    Begin.Jeu = Jeu;
})(Begin || (Begin = {}));
// Lancement du jeu
window.onload = () => {
    new Begin.Jeu();
};
//# sourceMappingURL=index.js.map