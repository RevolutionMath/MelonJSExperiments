class WinScreen extends me.ScreenObject {

    checkIfLoss(y) {
        if (y >= this.player.pos.y) {
            this.reset();
        }
    }

    onResetEvent() {
        me.game.world.addChild(new me.ColorLayer('background', '#AFD'), 0);

        this.player = me.pool.pull('player');

        me.game.world.addChild(this.player, 1);

        this.enemyManager = new game.EnemyManager();
        this.enemyManager.createEnemies();
        me.game.world.addChild(this.enemyManager, 2);

        me.input.bindKey(me.input.KEY.LEFT, 'left');
        me.input.bindKey(me.input.KEY.RIGHT, 'right');
        me.input.bindKey(me.input.KEY.A, 'left');
        me.input.bindKey(me.input.KEY.D, 'right');
        me.input.bindKey(me.input.KEY.SPACE, 'shoot', true);
    }

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent() {
        me.input.unbindKey(me.input.KEY_LEFT);
        me.input.unbindKey(me.input.KEY_RIGHT);
        me.input.unbindKey(me.input.KEY_A);
        me.input.unbindKey(me.input.KEY_D);
        me.input.unbindKey(me.input.KEY.SPACE);
    }

};


game.WinScreen = WinScreen;