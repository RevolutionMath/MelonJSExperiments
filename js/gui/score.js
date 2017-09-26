class ScoreCard extends me.Renderable {
    init(level, score, alienSpeed) {
        this.level = level;
        this.score = score;
        this.alienSpeed = alienSpeed;
        this._super(me.Renderable, 'init', [0, 0, 50, 50]);
    }

    draw(renderer) {
        const font = new me.Font('Ariel', 22, '#AFA', 'left');

        font.draw(renderer, `Level: ${this.level}   Score: ${this.score}   Alien Speed: ${this.alienSpeed}`, 10, 10);
    }

    onDestroyEvent() {}
}

game.ScoreCard = ScoreCard;