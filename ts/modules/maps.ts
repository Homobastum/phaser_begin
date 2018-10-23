module Begin {
    export class Map1 extends Phaser.State {
        map: Begin.Map;

        create () {
            let tileset = ['spring', 'spring'];
            let backgrounds = ['spring_bg_1', 'spring_bg_2', 'spring_bg_3'];
            this.map = new Map(this.game, 'map1', tileset, backgrounds);

            this.map.create();
        }

        update () {
            this.map.update();
        }
    }

    export class Map2 extends Phaser.State {
        map: Begin.Map;

        create() {
            let tileset = ['spring', 'spring'];
            let backgrounds = ['spring_bg_1', 'spring_bg_2', 'spring_bg_3'];
            this.map = new Map(this.game, 'map2', tileset, backgrounds);

            this.map.create();
        }

        update() {
            this.map.update();
        }
    }
}
