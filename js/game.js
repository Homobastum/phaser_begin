var Begin;
(function (Begin) {
    Begin.score = 0;
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
            this.load.audio('coin', 'assets/sounds/coin.mp3', true);
            this.load.audio('jump', 'assets/sounds/jump.mp3', true);
            this.game.load.image('logo', 'assets/img/logo.png');
            this.game.load.image('title_screen', 'assets/img/title_screen.png');
            this.game.load.image('spring', 'assets/tilesets/spring.png');
            this.game.load.image('summer', 'assets/tilesets/summer.png');
            this.game.load.image('autumn', 'assets/tilesets/autumn.png');
            this.game.load.image('winter', 'assets/tilesets/winter.png');
            this.game.load.spritesheet('items', 'assets/tilesets/items.png', 16, 16);
            this.game.load.spritesheet('hero', 'assets/charsets/hero.png', 16, 16);
            this.game.load.spritesheet('enemies', 'assets/charsets/enemies.png', 16, 16);
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
    class Coins extends Phaser.Group {
        constructor(game, map, hud, hero) {
            super(game);
            this.enableBody = true;
            this.game = game;
            this.map = map;
            this.hud = hud;
            this.hero = hero;
            this.coinFx = this.game.add.audio('coin', 1, false);
            this.game.add.physicsGroup();
            this.map.createFromObjects('coins', 187, 'items', 17, true, false, this);
            this.forEach(this.animate, this);
        }
        update() {
            this.game.physics.arcade.overlap(this.hero, this, (hero, coin) => {
                this.coinFx.play();
                this.hud.augmenterScore();
                coin.kill();
            });
        }
        animate(coin) {
            coin.body.immovable = true;
            coin.animations.add('spin', [17, 18, 19, 20], 10, true);
            coin.animations.play('spin');
        }
    }
    Begin.Coins = Coins;
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
            this.body.gravity.y = 1000;
            this.body.collideWorldBounds = true;
            this.anchor.setTo(0.5, 0.5);
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
            this.jumpFx = this.game.add.audio('jump', 1, false);
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
                this.jumpFx.play();
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
    class HUD extends Phaser.Group {
        constructor(game) {
            super(game);
            this.fixedToCamera = true;
            this.scoreText = game.add.text(4, 4, 'Coins: 0', { font: '10pt Revalia' }, this);
        }
        augmenterScore() {
            Begin.score += 1;
            this.scoreText.setText('Coins: ' + Begin.score);
        }
    }
    Begin.HUD = HUD;
})(Begin || (Begin = {}));
var Begin;
(function (Begin) {
    class Map1 extends Phaser.State {
        create() {
            this.map = this.game.add.tilemap('map1');
            this.map.addTilesetImage('spring', 'spring');
            this.game.camera.setPosition(160, 144);
            this.background = this.map.createLayer('background');
            this.behind = this.map.createLayer('behind');
            this.solids = this.map.createLayer('solids');
            this.game.world.setBounds(160, 144, 640, 144);
            this.map.setCollisionBetween(0, 168, true, this.solids);
            this.background.resizeWorld();
            this.hero = new Begin.Hero(this.game, 72, 80);
            this.front = this.map.createLayer('front');
            this.hud = new Begin.HUD(this.game);
            this.coins = new Begin.Coins(this.game, this.map, this.hud, this.hero);
        }
        update() {
            this.game.physics.arcade.collide(this.hero, this.solids);
        }
    }
    Begin.Map1 = Map1;
})(Begin || (Begin = {}));
//# sourceMappingURL=game.js.map