var Begin;
(function (Begin) {
    class Boot extends Phaser.State {
        preload() {
            this.load.image('logo', 'assets/img/logo.png');
        }
        create() {
            this.game.state.start('Preloader', true, false);
        }
    }
    Begin.Boot = Boot;
    class Preloader extends Phaser.State {
        preload() {
        }
        create() {
            var logo = this.add.sprite(this.world.centerX, this.world.centerY, 'logo');
            logo.anchor.setTo(0.5, 0.5);
            this.game.state.start('TitleScreen', true, false);
        }
    }
    Begin.Preloader = Preloader;
})(Begin || (Begin = {}));
//# sourceMappingURL=chargement.js.map