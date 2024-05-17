import Phaser from "phaser";

export default class PauseMenu extends Phaser.GameObjects.Container {
    private pausedText: Phaser.GameObjects.Text;
    public mainMenuButton: Phaser.GameObjects.Image;
    public resumeButton: Phaser.GameObjects.Image;
    private background: Phaser.GameObjects.Rectangle;

    constructor(
        scene: Phaser.Scene,
        resumeFunc: (button: Phaser.GameObjects.Image) => void,
        mainMenuFunc: (button: Phaser.GameObjects.Image) => void
    ) {
        super(scene);

        this.background = new Phaser.GameObjects.Rectangle(
            scene,
            640,
            360,
            1280,
            720,
            0,
            0.4
        );
        this.add(this.background);

        this.pausedText = new Phaser.GameObjects.Text(
            scene,
            370,
            100,
            "Game Paused",
            {
                fontFamily: "Arial",
                color: "#000000",
                fontSize: 80,
                backgroundColor: "#FFFFFF",
            }
        );
        this.add(this.pausedText);

        this.mainMenuButton = new Phaser.GameObjects.Image(
            scene,
            640,
            350,
            "main-menu-button"
        )
            .setInteractive()
            .on("pointerdown", mainMenuFunc, this.scene);
        this.add(this.mainMenuButton);

        this.resumeButton = new Phaser.GameObjects.Image(
            scene,
            640,
            500,
            "resume-button"
        )
            .setInteractive()
            .on("pointerdown", resumeFunc, this.scene);
        this.add(this.resumeButton);
    }
}
