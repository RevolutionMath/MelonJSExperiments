class PlayScreen extends me.ScreenObject {
    init(alienSpeed = 1, color = 'black') {
        this.alienSpeed = alienSpeed;
        this.color = color;
    }

    checkIfLoss(y) {
        if (y >= this.player.pos.y) {
            me.state.change(me.state.LOSE);
        }
    }

    onResetEvent() {
        store.dispatch(actions.setAlienSpeed(this.alienSpeed));

        this.colorLayer = new me.ColorLayer('background', this.color);

        me.game.world.addChild(this.colorLayer, 0);

        this.player = me.pool.pull('player');

        me.game.world.addChild(this.player, 1);

        this.scoreCard = new game.ScoreCard(store.getState().level, store.getState().score, store.getState().alienSpeed);
        me.game.world.addChild(this.scoreCard);
        // me.game.world.addChild(new myButton(10,10));

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

        me.game.world.removeChild(this.player);
        me.game.world.removeChild(this.colorLayer);
        me.game.world.removeChild(this.enemyManager);
        me.game.world.removeChild(this.scoreCard);
    }
}

game.PlayScreen = PlayScreen;