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

        window.state = {
            level: 1,
            score: 0,
            alienSpeed: 1,
            maxLevel: 4,
        }

        me.state.WIN = me.state.USER + 1;
        me.state.LOSE = me.state.USER + 2;
        me.state.LEVEL_1 = me.state.USER + 3;
        me.state.LEVEL_2 = me.state.USER + 4;
        me.state.LEVEL_3 = me.state.USER + 5;
        me.state.LEVEL_4 = me.state.USER + 6;

        // set the "Play/Ingame" Screen Object
        this.level1 = new game.PlayScreen();
        this.level2 = new game.PlayScreen(2, 'teal');
        this.level3 = new game.PlayScreen(3, 'orange');
        this.level4 = new game.PlayScreen(4, '#49B');

        this.winScreen = new game.WinScreen();
        this.loseScreen = new game.LoseScreen();

        me.state.set(me.state.LEVEL_1, this.level1);
        me.state.set(me.state.LEVEL_2, this.level2);
        me.state.set(me.state.LEVEL_3, this.level3);
        me.state.set(me.state.LEVEL_4, this.level4);

        me.state.set(me.state.WIN, this.winScreen);
        me.state.set(me.state.LOSE, this.loseScreen);

        // start the game
        me.state.change(me.state.LEVEL_1);
    },
};