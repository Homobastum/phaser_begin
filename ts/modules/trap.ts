module Begin {
    export interface Trap {
        game: Phaser.Game;
        map: Phaser.Tilemap;
        hud: Begin.HUD;
        hero: Begin.Hero;
        degats: number;
        
        update(): void;
    }

    export class Pics extends Phaser.Group implements Trap {
        game: Phaser.Game;
        map: Phaser.Tilemap;
        hud: Begin.HUD;
        hero: Begin.Hero;
        degats: number;

        constructor(game: Phaser.Game, map: Phaser.Tilemap, hud: Begin.HUD, hero: Begin.Hero) {
            super(game);
            this.enableBody = true;

            this.game = game;
            this.map = map;
            this.hud = hud;
            this.hero = hero;
            this.degats = 1;

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
                    this.hero.setDegats(this.degats);
                }
            });
        }
    }
}
