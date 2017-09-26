const game = {
    // Run on page load.
    onload() {
        // Initialize the video.
        if (!me.video.init(640, 480, {wrapper : "screen", scale : 'auto'})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // add "#debug" to the URL to enable the debug Panel
        if (me.game.HASH.debug === true) {
            window.onReady(() => {
                me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
            });
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);

        // Load the resources.
        me.loader.preload(game.resources);

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },

    // Run on game resources loaded.
    loaded() {
        me.pool.register('player', game.Player);
        me.pool.register('enemy', game.Enemy);
        me.pool.register('laser', game.Laser);

        // set the "Play/Ingame" Screen Object
        this.playScreen = new game.PlayScreen();
        this.winScreen = new game.WinScreen();

        me.state.set(me.state.PLAY, this.playScreen);
        me.state.set(me.state.WIN, this.winScreen);

        // start the game
        me.state.change(me.state.PLAY);
    },
};