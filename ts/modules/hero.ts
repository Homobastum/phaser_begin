module Begin {
    export class Hero extends Phaser.Sprite {
        game: Phaser.Game;
        jumpFx: Phaser.Sound;
        clavier: any;
        tchDirection: any;
        tchSaut: any;
        
        static nomLvl: string;        
        static lvlDesign: any;
        static x: number;
        static y: number;

        constructor (game: Phaser.Game) {
            if (Hero.x == null || Hero.y == null) {
                let origine = Hero.getOrigineLvl(Hero.nomLvl);
                Hero.x = origine[0];
                Hero.y = origine[1];
            }
                
            super(game, Hero.x, Hero.y, 'hero', 0);
            this.game = game;

            /*****************************************
             * Configuration de la physique du héros *
             *****************************************/
            // Ajout de la physique du héros 
            this.game.physics.arcade.enable(this);
            this.body.gravity.y = 1000;

            // Empêcher le héros de sortir des limites du terrain de jeu
            this.body.collideWorldBounds = true;
            this.setCollisionWithLevelLimits();
            
            // Bien positionner l'ancre au milieu du sprite du joueur
            this.anchor.setTo(0.5, 0.5);

            // La caméra suit toujours l'ancre du sprite du joueur
            this.game.camera.follow(this);

            // Ajuster le masque de collision pour chaque frames du spritesheet de "player"
            for (var noFrame = 1; noFrame <= 7; noFrame++) {
                // this.body.setSize(14, 16, 2);
            }

            /************************************
             * Création des animations du héros *
             ************************************/
            // Gestion des animations d'action du joueur
            this.animations.add('stand', [0, 1, 2, 3], 5, true);
            this.animations.add('run', [5, 6, 7], 10, true);
            this.animations.add('jump', [8], 10, true);
            this.animations.add('fall', [9], 10, true);

            /***********************************
             * Création des contrôles du héros *
             ***********************************/
            this.clavier = this.game.input.keyboard;
            this.tchDirection = this.game.input.keyboard.createCursorKeys();
            this.tchSaut = Phaser.Keyboard.SPACEBAR;

            // Création des effets sonores du héros
            this.jumpFx = this.game.add.audio('jump', 1, false);

            this.game.add.existing(this);
        }

        update () {
            /***********************************
	         * Gestion des contrôles du joueur *
	         ***********************************/
            // RàZ du mouvement de vélocité du joueur
            this.body.velocity.x = 0;

            // Direction
            if (this.tchDirection.left.isDown) {
                // Aller à gauche
                this.body.velocity.x = -100;
                this.scale.x = -1; // Pour tourner le sprite vers la gauche
                this.body.blocked.down ? this.animations.play('run') : false;
            }
            else if (this.tchDirection.right.isDown) {
                // Aller à droite
                this.body.velocity.x = 100;
                this.scale.x = 1; // Pour tourner le sprite vers la droite
                this.body.blocked.down ? this.animations.play('run') : false;
            } else {
                // Rester debout (avec respiration)
                this.body.blocked.down ? this.animations.play('stand') : false;
            }

            if (this.game.input.keyboard.downDuration(this.tchSaut) && this.body.blocked.down
            || this.tchDirection.up.downDuration() && this.body.blocked.down) {
                // Sauter
                this.body.velocity.y = -300;
                this.animations.play('jump');
                this.jumpFx.play();
            }

            if (!this.body.blocked.down && this.body.velocity.y > 0) {
                // Chuter
                this.animations.play('fall');
            }

            // Actions à effectuer lorsque le player atteint les limites de la map
            this.sortDeLaMap(Hero.nomLvl);
        }

        sortDeLaMap (nomLvl: string) {
            for (let level_key in Hero.lvlDesign) {
                if (Hero.lvlDesign[level_key]['name'] == nomLvl) {
                    let level = Hero.lvlDesign[level_key];
                    
                    // Si le joueur dépasse la limite gauche de la map
                    if (this.body.x < level.limit_x_neg.axis) {
                        let level_limit = level.limit_x_neg;
                        this.consequences(level_limit);
                    }

                    // Si le joueur dépasse la limite droite de la map
                    if (this.body.x > level.limit_x_pos.axis) {
                        let level_limit = level.limit_x_pos;
                        this.consequences(level_limit);
                    }

                    // Si le joueur dépasse la limite haute de la map
                    if (this.body.y < level.limit_y_neg.axis) {
                        let level_limit = level.limit_y_neg;
                        this.consequences(level_limit);
                    }

                    // Si le joueur dépasse la limite basse de la map
                    if (this.body.y > level.limit_y_pos.axis) {
                        let level_limit = level.limit_y_pos;
                        this.consequences(level_limit);
                    }
                }
            }
        }

        private consequences (limit_level: any) {
            if (limit_level.dead) {
                this.meurt();
            } 
            
            if (limit_level.map) {
                let coordonnees = [limit_level.player_x, limit_level.player_y];
                this.seTeleporte(limit_level.map, coordonnees);
            }
        }

        meurt () {
            this.seTeleporte(Hero.nomLvl);
        }

        seTeleporte (nomLvl: string, coordonnees: number[] = null) {
            this.game.state.start(nomLvl);
            
            if(coordonnees == null) {   
                coordonnees = Hero.getOrigineLvl(nomLvl);
            }

            Hero.x = coordonnees[0];
            Hero.y = coordonnees[1];
        }

        setCollisionWithLevelLimits () {
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

        static getOrigineLvl(nomLvl: string) {
            let origine: number[];

            for (let level_key in Hero.lvlDesign) {
                if (Hero.lvlDesign[level_key]['name'] == nomLvl) {
                    let level = Hero.lvlDesign[level_key];
                    origine = [level['origin_player_x'], level['origin_player_y']];
                }
            }

            return origine;
        }
    }
}