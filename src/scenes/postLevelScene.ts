import Phaser from "phaser";

export default class PostLevelScene extends Phaser.Scene {
    finalScore: number;
    playAgainButton: Phaser.GameObjects.Image;
    menuMusic: Phaser.Sound.BaseSound;

    init(data: { finalScore: number }) {
        this.finalScore = data.finalScore;
    }

    constructor() {
        super({ key: "PostLevelScene" });
    }

    create() {
        this.add.text(420, 200, `Final Score: ${this.finalScore}`, {
            color: "black",
            fontFamily: "Arial",
            fontSize: "70px",
            align: "center",
        });

        this.menuMusic = this.sound.add("menu-music", { loop: true });
        this.menuMusic.play();

        this.playAgainButton = new Phaser.GameObjects.Image(
            this,
            640,
            400,
            "play-again-button"
        );
        this.playAgainButton
            .setInteractive()
            .on("pointerdown", this.clickPlayAgain, this);
        this.add.existing(this.playAgainButton);
    }

    clickPlayAgain() {
        this.sound.play("button-press", { volume: 0.4 });
        this.menuMusic.stop();

        this.scene.start("MenuScene");
    }
}
