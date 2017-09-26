class Player extends me.Sprite {
    init() {
        const image = me.loader.getImage('player');

        this._super(me.Sprite, 'init', [
            me.game.viewport.width / 2 - image.width / 2,
            me.game.viewport.height - image.height - 20,
            {
                image
            },
        ]);

        this.velx = 450;
        this.maxX = me.game.viewport.width - this.width;
    }

    update(dt) {
        this._super(me.Sprite, 'update', [dt]);
        if (me.input.isKeyPressed('left')) {
            this.pos.x -= this.velx * dt / 1000;
        }
        if (me.input.isKeyPressed('right')) {
            this.pos.x += this.velx * dt / 1000;
        }

        this.pos.x = this.pos.x.clamp(0, this.maxX);

        if (me.input.isKeyPressed('shoot')) {
            const {
                width,
                height
            } = game.Laser;
            me.game.world.addChild(
                me.pool.pull('laser', this.pos.x - width, this.pos.y - height)
            );
        }

        return true;
    }
}

game.Player = Player;