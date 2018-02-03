var Begin;
(function (Begin) {
    class Jeu extends Phaser.Game {
        constructor() {
            super(160, 144, Phaser.AUTO, '', null);
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
            this.game.load.image('logo', 'assets/img/logo.png');
            this.game.load.image('title_screen', 'assets/img/title_screen.png');
            this.game.load.image('tileset', 'assets/img/tileset.png');
            this.game.load.image('hero', 'assets/img/charset_hero.png');
            this.game.load.image('enemies', 'assets/img/charset_enemies.png');
            this.game.load.tilemap('map1', 'assets/maps/map1.json', null, Phaser.Tilemap.TILED_JSON);
        }
        create() {
            this.logo = this.add.sprite(this.world.centerX, this.world.centerY, 'logo');
            this.logo.anchor.setTo(0.5, 0.5);
            this.logo.scale.setTo(1, 1);
            this.game.time.events.add(3000, this.changeState, this, 'TitleScreen');
        }
        changeState(state) {
            this.game.state.start(state, true, false);
        }
    }
    Begin.Preloader = Preloader;
})(Begin || (Begin = {}));
var Begin;
(function (Begin) {
    class TitleScreen extends Phaser.State {
        create() {
            this.titleScreen = this.add.sprite(this.world.centerX, this.world.centerY, 'title_screen');
            this.titleScreen.anchor.setTo(0.5, 0.5);
            this.game.time.events.add(5000, this.changeState, this, 'Map1');
        }
        update() {
        }
        changeState(state) {
            this.game.state.start(state, true, false);
        }
    }
    Begin.TitleScreen = TitleScreen;
    class TitleMenu extends Phaser.State {
        create() {
        }
        update() {
        }
    }
    Begin.TitleMenu = TitleMenu;
})(Begin || (Begin = {}));
var Begin;
(function (Begin) {
    class Map1 extends Phaser.State {
        create() {
            this.map = this.game.add.tilemap('map1');
            this.map.addTilesetImage('general', 'tileset');
            this.layer = this.map.createLayer('background');
            this.layer = this.map.createLayer('behind');
            this.layer = this.map.createLayer('solids');
            this.layer = this.map.createLayer('front');
            this.layer.resizeWorld();
        }
        update() {
        }
    }
    Begin.Map1 = Map1;
})(Begin || (Begin = {}));
//# sourceMappingURL=game.js.map