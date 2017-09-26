class ScoreCard extends me.Renderable {
    init(score) {
        this.score = score;
        this._super(me.Renderable, 'init', [0, 0, 50, 50]);
    }

    draw(renderer) {
        const font = new me.Font('Ariel', 22, '#AFA', 'left');

        font.draw(renderer, `Score: ${this.score}`, 10, 10);
    }
}

game.ScoreCard = ScoreCard;