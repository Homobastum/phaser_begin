module Begin {
    export class HUD extends Phaser.Group {
        game: Phaser.Game;
        
        bgHud: Phaser.Sprite;
        scoreText: Phaser.BitmapText;

        constructor (game: Phaser.Game) {
            super(game);
            this.game = game;

            this.fixedToCamera = true;

            this.bgHud = this.game.add.sprite(0, 0, 'hud', null , this);
            
            this.scoreText = this.game.add.bitmapText(77, 2, 'retrofont', 'x ' + Begin.score, 12, this);
        }

        augmenterScore () {
            Begin.score += 1;
            this.scoreText.setText('x ' + Begin.score);
        }
    } 
}