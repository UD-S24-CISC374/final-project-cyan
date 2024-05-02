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

        // main menu music
        this.menuMusic = this.sound.add("menu-music", { loop: true });
        this.menuMusic.play();

        this.tutorialButton = new Phaser.GameObjects.Image(
            this,
            640,
            250,
            "tutorial-button"
        );
        this.tutorialButton
            .setScale(0.6)
            .setInteractive()
            .on("pointerdown", () => {
                this.clickPlay("TutorialLevel");
            });
        this.add.existing(this.tutorialButton);

        // play button for 5x5 mode
        this.play5Button = new Phaser.GameObjects.Image(
            this,
            640,
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
            640,
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
