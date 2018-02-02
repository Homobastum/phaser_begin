var Begin;
(function (Begin) {
    class Jeu extends Phaser.Game {
        constructor() {
            super(800, 600, Phaser.AUTO, '', null);
            this.state.add('Boot', Begin.Boot, false);
            this.state.add('Preloader', Begin.Preloader, false);
            this.state.add('TitleScreen', Begin.TitleScreen, false);
            this.state.add('TitleMenu', Begin.TitleMenu, false);
            this.state.add('Map1', Begin.Map1, false);
            this.state.start('Boot');
        }
    }
    Begin.Jeu = Jeu;
})(Begin || (Begin = {}));
var Begin;
(function (Begin) {
    class Boot extends Phaser.State {
        preload() {
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.renderer.renderSession.roundPixels = true;
            Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
        }
        create() {
            this.game.state.start('Preloader', true, false);
        }
    }
    Begin.Boot = Boot;
    class Preloader extends Phaser.State {
        preload() {
            this.load.image('logo', 'assets/img/logo.png');
        }
        create() {
            var logo = this.add.sprite(this.world.centerX, this.world.centerY, 'logo');
            logo.anchor.setTo(0.5, 0.5);
        }
    }
    Begin.Preloader = Preloader;
})(Begin || (Begin = {}));
var Begin;
(function (Begin) {
    class TitleScreen extends Phaser.State {
        preload() {
        }
        create() {
        }
    }
    Begin.TitleScreen = TitleScreen;
    class TitleMenu extends Phaser.State {
        preload() {
        }
        create() {
        }
    }
    Begin.TitleMenu = TitleMenu;
})(Begin || (Begin = {}));
var Begin;
(function (Begin) {
    class Map1 {
        preload() {
        }
        create() {
        }
    }
    Begin.Map1 = Map1;
})(Begin || (Begin = {}));
//# sourceMappingURL=game.js.map