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
        this.load.image("instruction-4", "assets/tutorial/instruction4.png");
        this.load.image("instruction-5", "assets/tutorial/instruction5.png");
        this.load.image("play-again-button", "assets/menu/PlayAgainButton.png");
        this.load.image("main-menu-button", "assets/menu/MainMenuButton.png");
        this.load.image("resume-button", "assets/menu/ResumeButton.png");
        this.load.image("pause-button", "assets/menu/PauseButton.png");
        this.load.image("5x5-backplate", "assets/backgrounds/5x5backplate.png");
        this.load.image("3x3-backplate", "assets/backgrounds/3x3backplate.png");
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

    // Function to create break animations
    private createBreakAnimations() {
        const breakConfig = {
            frameRate: 10,
            repeat: 0,
            hideOnComplete: true,
        };

        // Animation creation for each color
        this.anims.create({
            key: "greenBreak",
            frames: this.anims.generateFrameNumbers("green-break", {
                start: 0,
                end: 4,
            }),
            ...breakConfig,
        });
        // Repeat for other colors
        this.anims.create({
            key: "redBreak",
            frames: this.anims.generateFrameNumbers("red-break", {
                start: 0,
                end: 4,
            }),
            ...breakConfig,
        });
        this.anims.create({
            key: "yellowBreak",
            frames: this.anims.generateFrameNumbers("yellow-break", {
                start: 0,
                end: 4,
            }),
            ...breakConfig,
        });
        this.anims.create({
            key: "blueBreak",
            frames: this.anims.generateFrameNumbers("blue-break", {
                start: 0,
                end: 4,
            }),
            ...breakConfig,
        });
        this.anims.create({
            key: "purpleBreak",
            frames: this.anims.generateFrameNumbers("purple-break", {
                start: 0,
                end: 4,
            }),
            ...breakConfig,
        });
    }

    create() {
        this.createBreakAnimations();
        this.scene.start("MenuScene");
    }
}
