module Begin
{
    export class HUD extends Phaser.Group
    {
        scoreText: Phaser.Text;

        constructor(game: Phaser.Game)
        {
            super(game);

            this.fixedToCamera = true;

            this.scoreText = game.add.text(4, 4, 'Coins: 0', {font:'10pt Revalia'}, this);
        }

        augmenterScore()
        {
            Begin.score += 1;
            this.scoreText.setText('Coins: ' + Begin.score);
        }
    } 
}