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
             const LEVEL_AMP = me.state.isCurrent(me.state.WIN) ?
                 3 :
                 2;

             if ((this.vel > 0 && (bounds.right + this.vel) >= me.game.viewport.width) ||
                 (this.vel < 0 && (bounds.left + this.vel) <= 0)) {

                 this.vel *= -1;
                 this.pos.y += 16 * LEVEL_AMP;

                 if (this.vel > 0) {
                     this.vel += 5;
                 } else {
                     this.vel -= 5;
                 }
                 game[me.state.WIN ? 'winScreen' : 'playScreen'].checkIfLoss(bounds.bottom);
             } else {
                 this.pos.x += this.vel * LEVEL_AMP;
             }
         }, 1000);
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
             me.state.change(me.state.isCurrent(me.state.PLAY) ? me.state.WIN : me.state.PLAY);
         }

         this._super(me.Container, 'update', [dt]);
         this.updateChildBounds();
     }
 }

 game.EnemyManager = EnemyManager;