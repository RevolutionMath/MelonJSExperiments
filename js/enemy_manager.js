 class EnemyManager extends me.Container {
     init() {
         this._super(me.Container, 'init', [0, 32,
             this.COLS * 64 - 32,
             this.ROWS * 64 - 32,
         ]);
         this.COLS = 9;
         this.ROWS = 4;
         this.vel = 16 * (store.getState().alienSpeed * 0.4);

         store.subscribe(() => {
            this.pos.x = store.getState().enemy_pos_x;
            this.pos.y = store.getState().enemy_pos_y;
         });
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
            //  const ALIEN_SPEED = store.getState().alienSpeed * 0.2;

             if ((this.vel > 0 && (bounds.right + this.vel) >= me.game.viewport.width) ||
                 (this.vel < 0 && (bounds.left + this.vel) <= 0)) {

                 this.vel *= -1;
                 store.dispatch(actions.setEnemyPos('y', this.pos.y + 5))

                 if (this.vel > 0) {
                     this.vel += 0.5;
                 } else {
                     this.vel -= 0.5;
                 }
                game[`level${store.getState().level}`].checkIfLoss(bounds.bottom);
             } else {
                 store.dispatch(actions.setEnemyPos('x', this.pos.x + this.vel * 0.14))
             }
         }, 20);
     }

     onDeactivateEvent() {
         me.timer.clearInterval(this.timer);
     }

     removeChildNow(child) {
         this._super(me.Container, 'removeChildNow', [child]);
         this.updateChildBounds();
     }

     update(dt) {
         if (this.children.length === 0 && this.createdEnemies) {
            store.dispatch(actions.incrementLevel());

            if (store.getState().level <= store.getState().maxLevel) {
                me.state.change(me.state[`LEVEL_${store.getState().level}`]);
            } else {
                me.state.change(me.state.WIN);
            }
         }

         this._super(me.Container, 'update', [dt]);
         this.updateChildBounds();
     }
 }

 game.EnemyManager = EnemyManager;