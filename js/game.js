var Begin;
(function (Begin) {
    Begin.env = 'TEST';
})(Begin || (Begin = {}));
var Begin;
(function (Begin) {
    class Jeu extends Phaser.Game {
        constructor() {
            super(160, 144, Phaser.AUTO, '', null, false, false);
            this.state.add('Boot', Begin.Boot, true);
            this.state.add('Preloader', Begin.Preloader, false);
            this.state.add('TitleScreen', Begin.TitleScreen, false);
            this.state.add('TitleMenu', Begin.TitleMenu, false);
            this.state.add('Map1', Begin.Map1, false);
            this.state.add('Map2', Begin.Map2, false);
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
            this.game.load.bitmapFont('retrofont', 'assets/fonts/retrofont.png', 'assets/fonts/retrofont.xml');
            this.load.audio('coin', 'assets/sounds/coin.mp3', true);
            this.load.audio('hurt', 'assets/sounds/hurt.wav', true);
            this.load.audio('jump', 'assets/sounds/jump.mp3', true);
            this.game.load.image('logo', 'assets/img/logo.png');
            this.game.load.image('title_screen', 'assets/img/title_screen.png');
            this.game.load.image('spring_bg_1', 'assets/img/spring_bg_1.png');
            this.game.load.image('spring_bg_2', 'assets/img/spring_bg_2.png');
            this.game.load.image('spring_bg_3', 'assets/img/spring_bg_3.png');
            this.game.load.image('hud_bg', 'assets/img/hud_bg.png');
            this.game.load.image('hud_hp', 'assets/img/hud_hp.png');
            this.game.load.image('hud_mp', 'assets/img/hud_mp.png');
            this.game.load.image('spring', 'assets/tilesets/spring.png');
            this.game.load.image('summer', 'assets/tilesets/summer.png');
            this.game.load.image('autumn', 'assets/tilesets/autumn.png');
            this.game.load.image('winter', 'assets/tilesets/winter.png');
            this.game.load.spritesheet('items', 'assets/tilesets/items.png', 16, 16);
            this.game.load.spritesheet('hero', 'assets/charsets/hero.png', 16, 16);
            this.game.load.spritesheet('enemies', 'assets/charsets/enemies.png', 16, 16);
            this.game.load.json('lvldesign', 'assetS/maps/lvldesign.json');
            this.game.load.tilemap('map1', 'assets/maps/map1.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.tilemap('map2', 'assets/maps/map2.json', null, Phaser.Tilemap.TILED_JSON);
        }
        create() {
            this.changeState('Map1');
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
            if (Coins.nb == null) {
                Coins.nb = 0;
                this.hud.setNbPieces();
            }
            this.coinFx = this.game.add.audio('coin', 1, false);
            this.game.add.physicsGroup();
            this.map.createFromObjects('coins', 187, 'items', 17, true, false, this);
            this.forEach(this.deleteCollectedCoins, this);
            this.forEach(this.animate, this);
        }
        update() {
            this.game.physics.arcade.overlap(this.hero, this, (hero, coin) => {
                this.coinFx.play();
                Coins.nb += 1;
                this.hud.setNbPieces();
                this.saveCollectedCoins(coin);
                coin.kill();
            });
        }
        saveCollectedCoins(coin) {
            Coins.collected[Coins.nb - 1] = [coin.x, coin.y];
        }
        deleteCollectedCoins(coin) {
            for (let noCoinToKill = 0; noCoinToKill < Coins.collected.length; noCoinToKill++) {
                let coinToKillx = Coins.collected[noCoinToKill][0];
                let coinToKilly = Coins.collected[noCoinToKill][1];
                if (coinToKillx == coin.x && coinToKilly == coin.y) {
                    coin.kill();
                }
            }
        }
        animate(coin) {
            coin.body.immovable = true;
            coin.animations.add('spin', [17, 18, 19, 20], 10, true);
            coin.animations.play('spin');
        }
    }
    Coins.collected = [];
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
        constructor(game, hud) {
            if (Hero.x == null || Hero.y == null) {
                let origine = Hero.getOrigineLvl(Hero.nomLvl);
                Hero.x = origine[0];
                Hero.y = origine[1];
            }
            if (Hero.sens == null) {
                Hero.sens = 1;
            }
            if (Hero.hp == null) {
                Hero.hp = Hero.hpMax;
            }
            if (Hero.mp == null) {
                Hero.mp = Hero.mpMax;
            }
            super(game, Hero.x, Hero.y, 'hero', 0);
            this.game = game;
            this.hud = hud;
            this.invincible = false;
            this.xTerreFerme = Hero.x;
            this.yTerreFerme = Hero.y;
            this.pause = false;
            this.anchor.setTo(0.5, 0.5);
            this.game.physics.arcade.enable(this);
            this.body.gravity.y = 1000;
            this.body.setSize(10, 16, 4);
            this.body.collideWorldBounds = true;
            this.setCollisionWithLevelLimits();
            this.game.camera.follow(this);
            this.standAnimation = this.animations.add('stand', [0, 1, 2, 3], 5, true);
            this.runAnimation = this.animations.add('run', [5, 6, 7], 10, true);
            this.jumpAnimation = this.animations.add('jump', [8], 10, true);
            this.fallAnimation = this.animations.add('fall', [9], 10, true);
            this.scale.x = Hero.sens;
            this.clavier = this.game.input.keyboard;
            this.tchDirection = this.game.input.keyboard.createCursorKeys();
            this.tchSaut = Phaser.Keyboard.SPACEBAR;
            this.jumpFx = this.game.add.audio('jump', 1, false);
            this.hurtFx = this.game.add.audio('hurt', 1, false);
            this.game.add.existing(this);
        }
        update() {
            if (Begin.env == 'DEV') {
                Hero.xPos = Math.round(this.body.x);
                Hero.yPos = Math.round(this.body.y);
            }
            this.hud.setHpBar();
            this.hud.setMpBar();
            this.body.velocity.x = 0;
            if (!this.pause) {
                if (this.tchDirection.left.isDown) {
                    this.body.velocity.x = -100;
                    Hero.sens = this.scale.x = -1;
                    this.body.blocked.down ? this.animations.play('run') : false;
                }
                else if (this.tchDirection.right.isDown) {
                    this.body.velocity.x = 100;
                    Hero.sens = this.scale.x = 1;
                    this.body.blocked.down ? this.animations.play('run') : false;
                }
                else {
                    this.body.blocked.down ? this.animations.play('stand') : false;
                }
                if (this.game.input.keyboard.downDuration(this.tchSaut) && this.body.blocked.down
                    || this.tchDirection.up.downDuration() && this.body.blocked.down) {
                    this.isJumping = true;
                    this.body.velocity.y = -300;
                    this.animations.play('jump');
                    this.jumpFx.play();
                }
            }
            else {
                this.body.blocked.down ? this.animations.play('stand') : false;
            }
            if (!this.body.blocked.down && this.body.velocity.y > 0) {
                this.animations.play('fall');
            }
            this.sortDeLaMap(Hero.nomLvl);
            this.checkTerreFerme();
            this.checkHp();
            this.checkMp();
        }
        sortDeLaMap(nomLvl) {
            for (let level_key in Hero.lvlDesign) {
                if (Hero.lvlDesign[level_key]['name'] == nomLvl) {
                    let level = Hero.lvlDesign[level_key];
                    if (this.body.y < level.limit_y_neg.axis - level.position_adjustement) {
                        let level_limit = level.limit_y_neg;
                        this.consequences(level, level_limit);
                    }
                    if (this.body.x > level.limit_x_pos.axis + level.position_adjustement) {
                        let level_limit = level.limit_x_pos;
                        this.consequences(level, level_limit);
                    }
                    if (this.body.y > level.limit_y_pos.axis + level.position_adjustement) {
                        let level_limit = level.limit_y_pos;
                        this.consequences(level, level_limit);
                    }
                    if (this.body.x < level.limit_x_neg.axis - level.position_adjustement) {
                        let level_limit = level.limit_x_neg;
                        this.consequences(level, level_limit);
                    }
                }
            }
        }
        consequences(level, level_limit) {
            if (level_limit.dead) {
                this.tombeDansUnTrou();
            }
            if (level_limit.map) {
                let coordonnees = [level_limit.player_x + level.position_adjustement, level_limit.player_y + level.position_adjustement];
                this.seTeleporte(level_limit.map, coordonnees);
            }
        }
        checkTerreFerme() {
            if (this.body.blocked.down) {
                this.xTerreFerme = this.x;
                this.yTerreFerme = this.body.y;
            }
        }
        tombeDansUnTrou() {
            this.pause = true;
            this.setDegats(0.5);
            let refreshMap = Hero.hp <= 0;
            let coordonnees = refreshMap ? null : [this.xTerreFerme, this.yTerreFerme];
            this.seTeleporte(Hero.nomLvl, coordonnees, refreshMap);
        }
        meurt() {
            this.seTeleporte(Hero.nomLvl);
            Hero.hp = Hero.hpMax;
        }
        seTeleporte(nomLvl = null, coordonnees = null, refreshMap = true) {
            if (coordonnees == null) {
                coordonnees = Hero.getOrigineLvl(nomLvl);
            }
            if (refreshMap) {
                Hero.y = coordonnees[1];
                Hero.x = coordonnees[0];
                this.game.state.start(nomLvl);
            }
            else {
                this.x = Math.round(coordonnees[0]);
                this.y = Math.round(coordonnees[1]);
            }
        }
        setCollisionWithLevelLimits() {
            for (let level_key in Hero.lvlDesign) {
                if (Hero.lvlDesign[level_key]['name'] == Hero.nomLvl) {
                    let level = Hero.lvlDesign[level_key];
                    for (let limit_key in level) {
                        switch (limit_key) {
                            case 'limit_y_neg':
                                this.game.physics.arcade.checkCollision.up = level[limit_key].collide;
                                break;
                            case 'limit_x_pos':
                                this.game.physics.arcade.checkCollision.right = level[limit_key].collide;
                                break;
                            case 'limit_y_pos':
                                this.game.physics.arcade.checkCollision.down = level[limit_key].collide;
                                break;
                            case 'limit_x_neg':
                                this.game.physics.arcade.checkCollision.left = level[limit_key].collide;
                                break;
                        }
                    }
                }
            }
        }
        static getOrigineLvl(nomLvl) {
            let origine;
            for (let level_key in Hero.lvlDesign) {
                if (Hero.lvlDesign[level_key]['name'] == nomLvl) {
                    let level = Hero.lvlDesign[level_key];
                    origine = [level['origin_player_x'] + level.position_adjustement, level['origin_player_y'] + level.position_adjustement];
                }
            }
            return origine;
        }
        setInvincibility() {
            this.invincible = true;
            this.flasher(250, 100, 3000);
            this.game.time.events.add(3000, () => {
                this.invincible = false;
                this.pause = false;
            }, this);
        }
        flasher(every, duration, time) {
            let flasher = this.game.time.events.loop(every, () => {
                this.alpha = 0;
                this.game.time.events.add(duration, () => {
                    this.alpha = 1;
                }, self);
            }, this);
            this.game.time.events.add(time, () => {
                this.game.time.events.remove(flasher);
                this.alpha = 1;
            }, this);
        }
        checkHp() {
            if (Hero.hp <= 0) {
                this.meurt();
            }
            if (Hero.hp >= Hero.hpMax) {
                Hero.hp = Hero.hpMax;
            }
        }
        checkMp() {
            if (Hero.mp <= 0) {
                Hero.mp = 0;
            }
            if (Hero.mp >= Hero.mpMax) {
                Hero.mp = Hero.mpMax;
            }
        }
        setDegats(degats) {
            this.hurtFx.play();
            Hero.hp -= degats;
            this.setInvincibility();
        }
    }
    Hero.hpMax = 10;
    Hero.mpMax = 10;
    Begin.Hero = Hero;
})(Begin || (Begin = {}));
var Begin;
(function (Begin) {
    class HUD extends Phaser.Group {
        constructor(game) {
            super(game);
            this.game = game;
            this.fixedToCamera = true;
            this.hudHp = this.game.add.sprite(2, 2, 'hud_hp', null, this);
            this.hudHpWidth = this.hudHp.width;
            this.hudMp = this.game.add.sprite(4, 9, 'hud_mp', null, this);
            this.hudMpWidth = this.hudMp.width;
            this.hudBg = this.game.add.sprite(0, 0, 'hud_bg', null, this);
            this.scoreText = this.game.add.bitmapText(77, 2, 'retrofont', 'x ' + Begin.Coins.nb, 12, this);
            if (Begin.env == 'DEV') {
                this.playerX = this.game.add.bitmapText(110, 2, 'retrofont', 'X: ' + Math.round(Begin.Hero.xPos), 12, this);
                this.playerY = this.game.add.bitmapText(110, 14, 'retrofont', 'Y: ' + Begin.Hero.yPos, 12, this);
            }
        }
        update() {
            if (Begin.env == 'DEV') {
                this.playerX.setText('X: ' + Begin.Hero.xPos);
                this.playerY.setText('Y: ' + Begin.Hero.yPos);
            }
        }
        setNbPieces() {
            this.scoreText.setText('x ' + Begin.Coins.nb);
        }
        setHpBar() {
            let unHpBar = this.hudHpWidth / Begin.Hero.hpMax;
            this.hudHp.width = unHpBar * Begin.Hero.hp;
        }
        setMpBar() {
            let unMpBar = this.hudMpWidth / Begin.Hero.mpMax;
            this.hudMp.width = unMpBar * Begin.Hero.mp;
        }
    }
    Begin.HUD = HUD;
})(Begin || (Begin = {}));
var Begin;
(function (Begin) {
    class Map {
        constructor(game, nomLvl, tilemap, tileset, backgrounds) {
            this.game = game;
            this.nomLvl = nomLvl;
            this.tilemap = tilemap;
            this.tileset = tileset;
            this.backgrounds = backgrounds;
        }
        create() {
            this.map = this.game.add.tilemap(this.tilemap);
            this.map.addTilesetImage(this.tileset[0], this.tileset[1]);
            this.game.camera.setPosition(160, 144);
            this.bg_1 = this.game.add.tileSprite(0, 0, 256, 256, this.backgrounds[0]);
            this.bg_1.smoothed = false;
            this.bg_1.fixedToCamera = true;
            this.bg_2 = this.game.add.tileSprite(0, 0, 256, 256, this.backgrounds[1]);
            this.bg_2.smoothed = false;
            this.bg_2.fixedToCamera = true;
            this.bg_3 = this.game.add.tileSprite(0, 0, 256, 256, this.backgrounds[2]);
            this.bg_3.smoothed = false;
            this.bg_3.fixedToCamera = true;
            this.behind = this.map.createLayer('behind');
            this.solids = this.map.createLayer('solids');
            this.front = this.map.createLayer('front');
            this.game.world.setBounds(160, 144, 624, 144);
            this.map.setCollisionBetween(0, 168, true, this.solids, true);
            this.behind.resizeWorld();
            this.solids.resizeWorld();
            this.hud = new Begin.HUD(this.game);
            Begin.Hero.lvlDesign = this.game.cache.getJSON('lvldesign');
            Begin.Hero.nomLvl = this.nomLvl;
            this.hero = new Begin.Hero(this.game, this.hud);
            this.coins = this.groupeObjetsExiste('coins') ? new Begin.Coins(this.game, this.map, this.hud, this.hero) : null;
            this.pics = this.groupeObjetsExiste('pics') ? new Begin.Pics(this.game, this.map, this.hud, this.hero) : null;
            this.game.world.bringToTop(this.hero);
            this.game.world.bringToTop(this.front);
            this.game.world.bringToTop(this.hud);
        }
        update() {
            this.bg_1.tilePosition.x = -(this.game.camera.x * 0.2);
            this.bg_2.tilePosition.x = -(this.game.camera.x * 0.5);
            this.bg_3.tilePosition.x = -(this.game.camera.x * 0.8);
            this.bg_1.tilePosition.y = -(this.game.camera.y * 0.2);
            this.bg_2.tilePosition.y = -(this.game.camera.y * 0.5);
            this.bg_3.tilePosition.y = -(this.game.camera.y * 0.8);
            this.game.physics.arcade.collide(this.hero, this.solids, null, null, this);
        }
        groupeObjetsExiste(nomGroupe) {
            for (let object in this.map.objects) {
                if (object == nomGroupe) {
                    return true;
                }
            }
            return false;
        }
        render() {
        }
    }
    Begin.Map = Map;
})(Begin || (Begin = {}));
var Begin;
(function (Begin) {
    class Map1 extends Phaser.State {
        create() {
            let nomLevel = 'Map1';
            let tilemap = 'map1';
            let tileset = ['spring', 'spring'];
            let backgrounds = ['spring_bg_1', 'spring_bg_2', 'spring_bg_3'];
            this.map = new Begin.Map(this.game, nomLevel, tilemap, tileset, backgrounds);
            this.map.create();
        }
        update() {
            this.map.update();
        }
        render() {
            this.map.render();
        }
    }
    Begin.Map1 = Map1;
    class Map2 extends Phaser.State {
        create() {
            let nomLevel = 'Map2';
            let tilemap = 'map2';
            let tileset = ['spring', 'spring'];
            let backgrounds = ['spring_bg_1', 'spring_bg_2', 'spring_bg_3'];
            this.map = new Begin.Map(this.game, nomLevel, tilemap, tileset, backgrounds);
            this.map.create();
        }
        update() {
            this.map.update();
        }
    }
    Begin.Map2 = Map2;
})(Begin || (Begin = {}));
var Begin;
(function (Begin) {
    class Pics extends Phaser.Group {
        constructor(game, map, hud, hero) {
            super(game);
            this.enableBody = true;
            this.game = game;
            this.map = map;
            this.hud = hud;
            this.hero = hero;
            this.degats = 1;
            this.game.add.physicsGroup();
            this.map.createFromObjects('pics', 181, 'items', 11, true, false, this);
        }
        update() {
            this.game.physics.arcade.overlap(this.hero, this, (hero, pic) => {
                if (!this.hero.invincible) {
                    this.hero.setDegats(this.degats);
                }
            });
        }
    }
    Begin.Pics = Pics;
})(Begin || (Begin = {}));
//# sourceMappingURL=game.js.map