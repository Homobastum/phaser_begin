module Begin
{
    export class Hero extends Phaser.Sprite
    {
        game: Phaser.Game;
        clavier: any;
        tchDirection: any;
        tchSaut: any;

        // Méthodes
        constructor(game: Phaser.Game, x: number, y: number)
	    {
            super(game, x, y, 'hero', 0);
            this.game = game;

            // Configuration de la physique du joueur
            this.game.physics.arcade.enable(this);
            this.body.collideWorldBounds = true;
            this.anchor.setTo(0.5, 0.5);
            this.body.gravity.y = 1000;
            this.game.camera.follow(this);

            // Ajuster le masque de collision pour chaque frames du spritesheet de "player"
            for (var noFrame = 1; noFrame <= 7; noFrame++) 
            {
                // this.body.setSize(14, 16, 2);
            }

            // Gestion des animations d'action du joueur
            this.animations.add('stand', [0, 1, 2, 3], 5, true);
            this.animations.add('run', [5, 6, 7], 10, true);
            this.animations.add('jump', [8], 10, true);
            this.animations.add('fall', [9], 10, true);

            /************************************
             * Création des contrôles du joueur *
             ************************************/
            this.clavier = this.game.input.keyboard;
            this.tchDirection = this.game.input.keyboard.createCursorKeys();
            this.tchSaut = Phaser.Keyboard.SPACEBAR;

            this.game.add.existing(this);
        }

        update() 
        {
            /***********************************
	         * Gestion des contrôles du joueur *
	         ***********************************/
            // RàZ du mouvement de vélocité du joueur
            this.body.velocity.x = 0;

            // Direction
            if(this.tchDirection.left.isDown) 
            {
                // Aller à gauche
                this.body.velocity.x = -100;
                this.scale.x = -1; // Pour tourner le sprite vers la gauche
                this.body.blocked.down ? this.animations.play('run') : false;
            }
            else if(this.tchDirection.right.isDown) 
            {
                // Aller à droite
                this.body.velocity.x = 100;
                this.scale.x = 1; // Pour tourner le sprite vers la droite
                this.body.blocked.down ? this.animations.play('run') : false;
            }
            else 
            {
                // Rester debout (avec respiration)
                this.body.blocked.down ? this.animations.play('stand') : false;
            }

            if(this.game.input.keyboard.downDuration(this.tchSaut) && this.body.blocked.down
            || this.tchDirection.up.downDuration() && this.body.blocked.down) 
            {
                // Sauter
                this.body.velocity.y = -300;
                this.animations.play('jump');
            }

            if(!this.body.blocked.down && this.body.velocity.y > 0) 
            {
                // Chuter
                this.animations.play('fall');
            }
        }
    }
}