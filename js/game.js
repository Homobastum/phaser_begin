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
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
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
            this.game.load.image('general', 'assets/img/tileset.png');
            this.game.load.spritesheet('hero', 'assets/img/charset_hero.png', 16, 16);
            this.game.load.spritesheet('enemies', 'assets/img/charset_enemies.png', 16, 16);
            this.game.load.tilemap('map1', 'assets/maps/map1.json', null, Phaser.Tilemap.TILED_JSON);
        }
        create() {
            this.logo = this.add.sprite(this.world.centerX, this.world.centerY, 'logo');
            this.logo.anchor.setTo(0.5, 0.5);
            this.logo.scale.setTo(1, 1);
            this.game.time.events.add(1000, this.changeState, this, 'TitleScreen');
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
            this.game.time.events.add(1000, this.changeState, this, 'Map1');
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
    class Hero extends Phaser.Sprite {
        constructor(game, x, y) {
            super(game, x, y, 'hero', 0);
            this.game = game;
            this.game.physics.arcade.enable(this);
            this.body.collideWorldBounds = true;
            this.anchor.setTo(0.5, 0.5);
            this.body.gravity.y = 1000;
            this.game.camera.follow(this);
            for (var noFrame = 1; noFrame <= 7; noFrame++) {
            }
            this.animations.add('stand', [0, 1, 2, 3], 5, true);
            this.animations.add('run', [5, 6, 7], 10, true);
            this.animations.add('jump', [8], 10, true);
            this.animations.add('fall', [9], 10, true);
            this.clavier = this.game.input.keyboard;
            this.tchDirection = this.game.input.keyboard.createCursorKeys();
            this.tchSaut = Phaser.Keyboard.SPACEBAR;
            this.game.add.existing(this);
        }
        update() {
            this.body.velocity.x = 0;
            if (this.tchDirection.left.isDown) {
                this.body.velocity.x = -100;
                this.scale.x = -1;
                this.body.blocked.down ? this.animations.play('run') : false;
            }
            else if (this.tchDirection.right.isDown) {
                this.body.velocity.x = 100;
                this.scale.x = 1;
                this.body.blocked.down ? this.animations.play('run') : false;
            }
            else {
                this.body.blocked.down ? this.animations.play('stand') : false;
            }
            if (this.game.input.keyboard.downDuration(this.tchSaut) && this.body.blocked.down
                || this.tchDirection.up.downDuration() && this.body.blocked.down) {
                this.body.velocity.y = -300;
                this.animations.play('jump');
            }
            if (!this.body.blocked.down && this.body.velocity.y > 0) {
                this.animations.play('fall');
            }
        }
    }
    Begin.Hero = Hero;
})(Begin || (Begin = {}));
var Begin;
(function (Begin) {
    class Map1 extends Phaser.State {
        create() {
            this.map = this.game.add.tilemap('map1');
            this.map.addTilesetImage('general', 'general');
            this.game.camera.setPosition(160, 144);
            this.background = this.map.createLayer('background');
            this.behind = this.map.createLayer('behind');
            this.solids = this.map.createLayer('solids');
            this.front = this.map.createLayer('front');
            this.game.world.setBounds(160, 144, 160, 144);
            this.map.setCollisionBetween(214, 216, true, 'solids');
            this.map.setCollisionBetween(243, 245, true, 'solids');
            this.map.setCollisionBetween(272, 274, true, 'solids');
            this.background.resizeWorld();
            this.hero = new Begin.Hero(this.game, 72, 80);
        }
        update() {
            this.game.physics.arcade.collide(this.hero, this.solids);
        }
    }
    Begin.Map1 = Map1;
})(Begin || (Begin = {}));
//# sourceMappingURL=game.js.map