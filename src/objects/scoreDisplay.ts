import Phaser from "phaser";

export default class ScoreDisplay extends Phaser.GameObjects.Container {
    private score: number;
    private scoreText: Phaser.GameObjects.Text;
    private scoreBox: Phaser.GameObjects.Rectangle;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        startScore: number = 0
    ) {
        super(scene, x, y);
        this.scoreText = new Phaser.GameObjects.Text(
            this.scene,
            x - 65,
            y - 10,
            `${startScore}`,
            {
                fontFamily: "Arial",
                fontSize: "45px",
                align: "center",
                color: "black",
            }
        );
        this.add(this.scoreText);
        this.scene.add.existing(this.scoreText);
        this.score = startScore;
    }

    public changeScore(newScore: number) {
        this.scoreText.setText(`${newScore}`);
        this.score = newScore;
    }

    public incrementScore(increment: number) {
        this.changeScore(this.score + increment);
    }

    public getScore(): number {
        return this.score;
    }
}
