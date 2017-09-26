 class EnemyManager extends me.Container {
     init() {
         this._super(me.Container, 'init', [0, 32,
             this.COLS * 64 - 32,
             this.ROWS * 64 - 32,
         ]);
         this.COLS = 9;
         this.ROWS = 4;
         this.vel = 16;
     }

     createEnemies() {
         for (let i = 0; i < this.COLS; i++) {
             for (let j = 0; j < this.ROWS; j++) {
                 this.addChild(me.pool.pull('enemy', i * 64, j * 64));
             }
         }
         this.updateChildBounds();
         this.createdEnemies = true;
     }

     onActivateEvent() {
         this.timer = me.timer.setInterval(() => {
             const bounds = this.childBounds;
             const ALIEN_SPEED = window.state.alienSpeed * 0.2;

             if ((this.vel > 0 && (bounds.right + this.vel) >= me.game.viewport.width) ||
                 (this.vel < 0 && (bounds.left + this.vel) <= 0)) {

                 this.vel *= -1;
                 this.pos.y += 16 * ALIEN_SPEED;

                 if (this.vel > 0) {
                     this.vel += 3;
                 } else {
                     this.vel -= 3;
                 }
                game[`level${window.state.level}`].checkIfLoss(bounds.bottom);
             } else {
                 this.pos.x += this.vel * (ALIEN_SPEED * 0.05);
             }
         }, 8);
     }

     onDeactivateEvent() {
         me.timer.clearInterval(this.timer);
     }

     removeChildNow(child) {
         this._super(me.Container, 'removeChildNow', [child]);
         this.updateChildBounds();
     }

     update(dt) {
         if (this.children.length === 1 && this.createdEnemies) {
            window.state.level += 1

            if (window.state.level <= 3) {
                me.state.change(me.state[`LEVEL_${window.state.level}`]);
            } else {
                me.state.change(me.state.WIN);
            }
         }

         this._super(me.Container, 'update', [dt]);
         this.updateChildBounds();
     }
 }

 game.EnemyManager = EnemyManager;