// Module à revoir
module Begin {
    export class Coins extends Phaser.Group {
        game: Phaser.Game;
        map: Phaser.Tilemap;
        hero: Begin.Hero;

        constructor (game: Phaser.Game, map: Phaser.Tilemap, hero: Begin.Hero) {
            super(game);
            this.game = game;
            this.map = map;
            this.hero = hero;

            this.game.add.physicsGroup();
            this.map.createFromObjects('coins', 187, 'items', 17, true, false, this);

            this.forEach (function(coin: Phaser.Sprite)
            {
                coin.body.immovable = true;
                coin.animations.add('spin', [17, 18, 19, 20], 10, true);
                coin.animations.play('spin');    
            }, this);
        }

        update () {
            this.game.physics.arcade.overlap(this.hero, this, this.collecter);
        }

        private collecter (hero: Begin.Hero, coin: Phaser.Sprite) {
            coin.kill();
        }
    }
}