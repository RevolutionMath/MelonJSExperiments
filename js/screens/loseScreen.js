class LoseScreen extends me.ScreenObject {
    onResetEvent() {
        this.colorLayer = new me.ColorLayer('background', 'red');

        me.game.world.addChild(this.colorLayer, 0);
    }

    onDestroyEvent() {
        me.game.world.removeChild(this.colorLayer);
    }
}

game.LoseScreen = LoseScreen;