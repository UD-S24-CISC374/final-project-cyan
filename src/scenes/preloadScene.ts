import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        this.load.image("phaser-logo", "assets/img/phaser-logo.png");
        this.load.image("and-block", "assets/blocks/And.png");
        this.load.image("or-block", "assets/blocks/Or.png");
        this.load.image("not-block", "assets/blocks/Not.png");
        this.load.image("true-block", "assets/blocks/True.png");
        this.load.image("false-block", "assets/blocks/False.png");
        this.load.image("menu-backplate", "assets/menu/menuBackplate.png");
        this.load.image("play-3-button", "assets/menu/play3Button.png");
        this.load.image("play-5-button", "assets/menu/play5Button.png");
        this.load.image("tutorial-button", "assets/menu/tutorialButton.png");
        this.load.image("instruction-1", "assets/tutorial/instruction1.png");
        this.load.image("instruction-2", "assets/tutorial/instruction2.png");
        this.load.image("instruction-3", "assets/tutorial/instruction3.png");
        this.load.image("play-again-button", "assets/menu/PlayAgainButton.png");
        this.load.audio("button-press", "assets/audio/effects/click.mp3");
        this.load.audio("menu-music", "assets/audio/music/puzzlemenu.ogg");
        this.load.audio("block-break", "assets/audio/effects/cork.mp3");
        this.load.audio(
            "gameplay-music",
            "assets/audio/music/contemplation.mp3"
        );
        this.load.spritesheet(
            "green-break",
            "assets/effects/effects/green.png",
            {
                frameWidth: 192, // width of each frame
                frameHeight: 192, // height of each frame
                endFrame: 5, // number of frames in the spritesheet
            }
        );
        this.load.spritesheet("red-break", "assets/effects/effects/red.png", {
            frameWidth: 192, // width of each frame
            frameHeight: 192, // height of each frame
            endFrame: 5, // number of frames in the spritesheet
        });
        this.load.spritesheet(
            "yellow-break",
            "assets/effects/effects/yellow.png",
            {
                frameWidth: 192, // width of each frame
                frameHeight: 192, // height of each frame
                endFrame: 5, // number of frames in the spritesheet
            }
        );
        this.load.spritesheet("blue-break", "assets/effects/effects/blue.png", {
            frameWidth: 192, // width of each frame
            frameHeight: 192, // height of each frame
            endFrame: 5, // number of frames in the spritesheet
        });
        this.load.spritesheet(
            "purple-break",
            "assets/effects/effects/purple.png",
            {
                frameWidth: 192, // width of each frame
                frameHeight: 192, // height of each frame
                endFrame: 5, // number of frames in the spritesheet
            }
        );
    }

    create() {
        this.scene.start("MenuScene");
    }
}
