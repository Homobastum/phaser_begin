module Begin {
    export class Map1 extends Phaser.State {
        map: Begin.Map;

        create () {
            let nomLevel = 'Map1';
            let tilemap = 'map1';
            let tileset = ['spring', 'spring'];
            let backgrounds = ['spring_bg_1', 'spring_bg_2', 'spring_bg_3'];
            this.map = new Map(this.game, nomLevel, tilemap, tileset, backgrounds);

            this.map.create();
        }

        update () {
            this.map.update();
        }

        render () {
            this.map.render();
        }
    }

    export class Map2 extends Phaser.State {
        map: Begin.Map;

        create () {
            let nomLevel = 'Map2';
            let tilemap = 'map2';
            let tileset = ['spring', 'spring'];
            let backgrounds = ['spring_bg_1', 'spring_bg_2', 'spring_bg_3'];
            this.map = new Map(this.game, nomLevel, tilemap, tileset, backgrounds);

            this.map.create();
        }

        update () {
            this.map.update();
        }
    }
}
