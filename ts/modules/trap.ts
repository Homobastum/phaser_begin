module Begin {
    export interface Trap {
        game: Phaser.Game;
        map: Phaser.Tilemap;
        hud: Begin.HUD;
        hero: Begin.Hero;
        trapFx: Phaser.Sound;
        degats: number;
        
        update(): void;
        setDegats(): void;
    }

    export class Pics extends Phaser.Group implements Trap {
        game: Phaser.Game;
        map: Phaser.Tilemap;
        hud: Begin.HUD;
        hero: Begin.Hero;
        trapFx: Phaser.Sound;
        degats: number;

        constructor(game: Phaser.Game, map: Phaser.Tilemap, hud: Begin.HUD, hero: Begin.Hero) {
            super(game);
            this.enableBody = true;

            this.game = game;
            this.map = map;
            this.hud = hud;
            this.hero = hero;
            this.degats = 1;

            // Ajouter le son de récupération d'une pièce
            this.trapFx = this.game.add.audio('trap_hurting', 1, false);

            // Permettre à chaque pic d'avoir une physique afin d'être touché
            this.game.add.physicsGroup();

            /**************************************************
             * Gestion de la création des pics sur le terrain *
             **************************************************/
            // Créer les pics en fonction de leur emplacement mappé dans Tiled
            this.map.createFromObjects('pics', 181, 'items', 11, true, false, this);
        }

        update() {
            // À chaque fois que le joueur touche un pic:         
            this.game.physics.arcade.overlap(this.hero, this, (hero: Begin.Hero, pic: Phaser.Sprite) => {
                if (!this.hero.invincible) {
                    // - jouer le son de la blessure
                    this.trapFx.play();

                    // - diminuer le nombre de points de vie du joueur
                    this.setDegats();
                    
                    // - rendre le joueur invincible
                    this.hero.invincible = true;
                }
            });
        }

        setDegats () {
            Hero.hp -= this.degats;
            this.hud.setHpBar();
        }
    }
}
