class WinScreen extends me.ScreenObject {
    onResetEvent() {
        this.colorLayer = new me.ColorLayer('background', 'green');
        me.game.world.addChild(this.colorLayer, 0);
    }

    onDestroyEvent() {
        me.game.world.removeChild(this.colorLayer);
    }
}

game.WinScreen = WinScreen;