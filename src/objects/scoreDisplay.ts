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
        this.scoreBox = new Phaser.GameObjects.Rectangle(
            this.scene,
            x,
            y,
            150,
            50,
            0
        );
        this.add(this.scoreBox);
        this.scene.add.existing(this.scoreBox);
        this.scoreText = new Phaser.GameObjects.Text(
            this.scene,
            x - 65,
            y - 10,
            `Score: ${startScore}`,
            { fontFamily: "Courier", fontSize: "25px", align: "center" }
        );
        this.add(this.scoreText);
        this.scene.add.existing(this.scoreText);
        this.score = startScore;
    }

    public changeScore(newScore: number) {
        this.scoreText.setText(`Score: ${newScore}`);
        this.score = newScore;
    }

    public incrementScore(increment: number) {
        this.changeScore(this.score + increment);
    }

    public getScore(): number {
        return this.score;
    }
}
