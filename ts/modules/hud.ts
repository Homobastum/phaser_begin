module Begin {
    export class HUD extends Phaser.Group {
        game: Phaser.Game;
        
        hudBg: Phaser.Sprite;
        hudHp: Phaser.Sprite;
        hudHpWidth: number;
        hudMp: Phaser.Sprite;
        hudMpWidth: number;
        scoreText: Phaser.BitmapText;

        constructor (game: Phaser.Game) {
            super(game);
            this.game = game;

            this.fixedToCamera = true;

            this.hudHp = this.game.add.sprite(2, 2, 'hud_hp', null , this);
            this.hudHpWidth = this.hudHp.width;

            this.hudMp = this.game.add.sprite(4, 9, 'hud_mp', null , this);
            this.hudMpWidth = this.hudMp.width;

            this.hudBg = this.game.add.sprite(0, 0, 'hud_bg', null, this);
            
            this.scoreText = this.game.add.bitmapText(77, 2, 'retrofont', 'x ' + Begin.coins, 12, this);
        }

        augmenterNbPieces () {
            Begin.coins += 1;
            this.scoreText.setText('x ' + Begin.coins);
        }

        setHpBar () {
            let unHpBar = this.hudHpWidth / Hero.hpMax;
            this.hudHp.width = unHpBar * Hero.hp;  
        }

        setMpBar() {
            let unMpBar = this.hudMpWidth / Hero.mpMax;
            this.hudMp.width = unMpBar * Hero.mp;  
        }
    } 
}