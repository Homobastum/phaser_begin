module Begin {
    export class Coins extends Phaser.Group {
        game: Phaser.Game;
        map: Phaser.Tilemap;
        hud: Begin.HUD;
        hero: Begin.Hero;
        coinFx: Phaser.Sound;

        static nb: number;
        static collected: number[][] = [];

        constructor (game: Phaser.Game, map: Phaser.Tilemap, hud: Begin.HUD, hero: Begin.Hero) {
            super(game);
            this.enableBody = true;

            this.game = game;
            this.map = map;
            this.hud = hud;
            this.hero = hero;

            // Initialisation du nombre de pièces collectées
            if (Coins.nb == null) {
                Coins.nb = 0;
                this.hud.setNbPieces();
            }
            
            // Ajouter le son de récupération d'une pièce
            this.coinFx = this.game.add.audio('coin', 1, false);
            
            // Permettre à chaque d'avoir une physique afin d'être récupérée
            this.game.add.physicsGroup();

            // Créer les pièces en fonction de leur emplacement mappé dans Tiled
            this.map.createFromObjects('coins', 187, 'items', 17, true, false, this);
            
            // Supprimer les pièces déjà collectées
            this.forEach(this.deleteCollectedCoins, this);

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
                
                // Augmenter le nombre de pièces collectées
                Coins.nb += 1;
                this.hud.setNbPieces();

                // Enregistrer les coordonnées des pièces déjà collectées
                this.saveCollectedCoins(coin);

                coin.kill();
            });
        }

        saveCollectedCoins (coin: Phaser.Sprite) {
            Coins.collected[Coins.nb - 1] = [coin.x, coin.y];
        }

        deleteCollectedCoins (coin: Phaser.Sprite) {
            for (let noCoinToKill = 0; noCoinToKill < Coins.collected.length; noCoinToKill++) {
                let coinToKillx = Coins.collected[noCoinToKill][0];
                let coinToKilly = Coins.collected[noCoinToKill][1];

                if (coinToKillx == coin.x && coinToKilly == coin.y) {
                    coin.kill();
                }
            }
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