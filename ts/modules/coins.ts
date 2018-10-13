// Module à revoir
module Begin {
    export class Coins extends Phaser.Group {
        game: Phaser.Game;
        map: Phaser.Tilemap;
        hud: Begin.HUD;
        hero: Begin.Hero;
        coinFx: Phaser.Sound;

        constructor (game: Phaser.Game, map: Phaser.Tilemap, hud: Begin.HUD, hero: Begin.Hero) {
            super(game);
            this.enableBody = true;

            this.game = game;
            this.map = map;
            this.hud = hud;
            this.hero = hero;
            
            // Ajouter le son de récupération d'une pièce
            this.coinFx = this.game.add.audio('coin', 1, false);
            
            // Permettre à chaque d'avoir une physique afin d'être récupérée
            this.game.add.physicsGroup();

            // Créer les pièces en fonction de leur emplacement mappé dans Tiled
            this.map.createFromObjects('coins', 187, 'items', 17, true, false, this);

            // Animer chaque pièce
            this.forEach(this.animate, this);
        }

        update () {
            /* 
            À chaque fois que le joueur touche une pièce:
            - jouer le son de récupération
            - augmenter le score dans le hud
            - détruire la pièce
            */         
            this.game.physics.arcade.overlap(this.hero, this, (hero: Begin.Hero, coin: Phaser.Sprite) => {
                this.coinFx.play();
                this.hud.augmenterScore();
                coin.kill();
            });
        }

        /**
         * Animer une pièce
         * 
         * @param {Phaser.Sprite} coin Pièce à animer
         */
        private animate (coin: Phaser.Sprite) {
            coin.body.immovable = true;
            coin.animations.add('spin', [17, 18, 19, 20], 10, true);
            coin.animations.play('spin');
        }
    }
}