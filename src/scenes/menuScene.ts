import Phaser from "phaser";

export default class MenuScene extends Phaser.Scene {
    tutorialButton: Phaser.GameObjects.Image;
    play5Button: Phaser.GameObjects.Image;
    play3Button: Phaser.GameObjects.Image;
    menuMusic: Phaser.Sound.BaseSound;

    constructor() {
        super({ key: "MenuScene" });
    }

    create() {
        this.add.image(640, 360, "menu-backplate"); // backplate image for title and background

        this.add
            .text(800, 250, "Start Interactive Tutorial", {
                font: "38px Arial",
                color: "#fff",
            })
            .setOrigin(0.5);

        // main menu music
        this.menuMusic = this.sound.add("menu-music", { loop: true });
        this.menuMusic.play();

        this.tutorialButton = new Phaser.GameObjects.Image(
            this,
            440,
            250,
            "tutorial-button"
        );
        this.tutorialButton
            .setScale(0.6)
            .setInteractive()
            .on("pointerdown", () => {
                this.clickPlay(this.tutorialButton, "TutorialLevel");
            });
        this.add.existing(this.tutorialButton);

        // play button for 5x5 mode
        this.play5Button = new Phaser.GameObjects.Image(
            this,
            440,
            550,
            "play-5-button"
        );
        this.play5Button
            .setScale(0.6)
            .setInteractive()
            .on("pointerdown", () => {
                this.clickPlay(this.play5Button, "FiveByFiveLevel");
            });
        this.add.existing(this.play5Button);

        // play button for 3x3 mode
        this.play3Button = new Phaser.GameObjects.Image(
            this,
            440,
            400,
            "play-3-button"
        );
        this.play3Button
            .setScale(0.6)
            .setInteractive()
            .on("pointerdown", () => {
                this.clickPlay(this.play3Button, "ThreeByThreeLevel");
            });
        this.add.existing(this.play3Button);

        this.displayHighScores();
    }

    displayHighScores() {
        const highScore3x3 = localStorage.getItem("highScore-3x3") ?? "0";
        const highScore5x5 = localStorage.getItem("highScore-5x5") ?? "0";

        const style = { font: "38px Arial", fill: "#fff" };
        this.add
            .text(800, 400, `3x3 High Score: ${highScore3x3}`, style)
            .setOrigin(0.5);
        this.add
            .text(800, 550, `5x5 High Score: ${highScore5x5}`, style)
            .setOrigin(0.5);
    }

    // run when play button is pressed
    //modified so that it accepts scenekey as a paramaeter
    clickPlay(button: Phaser.GameObjects.Image, sceneKey: string) {
        let promise = new Promise<void>((resolve: () => void) => {
            this.sound.play("button-press", { volume: 0.4 });
            button.setScale(0.55);
            setTimeout(resolve, 200);
        });

        Promise.resolve(promise).then(() => {
            button.setScale(1);
            this.menuMusic.stop();
            this.scene.start(sceneKey);
        });
    }
}
