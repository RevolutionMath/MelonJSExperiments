class Laser extends me.Entity {
    init(x, y) {
        this._super(me.Entity, 'init', [x, y, {
            width: game.Laser.width,
            height: game.Laser.height,
        }]);
        this.z = 5;
        this.body.setVelocity(0, 300);
        this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;
        this.renderable = new(me.Renderable.extend({
            init() {
                const {
                    width,
                    height
                } = game.Laser;

                this._super(me.Renderable, 'init', [0, 0, width, height]);
            },
            onDestroyEvent() {},
            draw(renderer) {
                const color = renderer.getColor();

                renderer.setColor('#5EFF7E');
                renderer.fillRect(0, 0, this.width, this.height);
                renderer.setColor(color);
            }
        }));
        this.alwaysUpdate = true;
    }

    update(dt) {
        this.body.vel.y -= this.body.accel.y * dt / 1000;
        if (this.pos.y + this.height <= 0) {
            me.game.world.removeChild(this);
        }

        this.body.update();
        me.collision.check(this);

        return true;
    }

    onCollision(res, other) {
        if (other.body.collisionType === me.collision.types.ENEMY_OBJECT) {
            window.state.score += 1;

            me.game.world.removeChild(this);

            game[`level${window.state.level}`].scoreCard.score = window.state.score;
            game[`level${window.state.level}`].enemyManager.removeChild(other);
            return false;
        }
    }
}

game.Laser = Laser;
game.Laser.width = 5;
game.Laser.height = 28;