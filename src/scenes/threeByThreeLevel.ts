import Phaser from "phaser";
import BlockGrid from "../objects/blockGrid";
import BooleanBlock from "../objects/booleanBlock";
import ScoreDisplay from "../objects/scoreDisplay";
import PauseMenu from "../objects/pausemenu";

export default class ThreeByThreeLevel extends Phaser.Scene {
    locationBuffer: [number, number] | undefined;
    blockGrid: BlockGrid;
    timer: Phaser.Time.TimerEvent;
    timeLimitInSeconds: number;
    timerText: Phaser.GameObjects.Text;
    gameplayMusic: Phaser.Sound.BaseSound;
    scoreDisplay: ScoreDisplay;
    pauseButton: Phaser.GameObjects.Image;
    pauseMenu: PauseMenu;
    paused: boolean;

    constructor() {
        super({ key: "ThreeByThreeLevel" });
    }

    preload() {
        // Preload assets if not done in PreloadScene, otherwise this is not needed
    }

    create() {
        this.paused = false;
        this.timeLimitInSeconds = 120;
        this.blockGrid = new BlockGrid(this, 3, false); // Initialize a 3x3 grid
        this.gameplayMusic = this.sound.add("gameplay-music");
        this.gameplayMusic.play({ volume: 0.3, loop: true });
        this.scoreDisplay = new ScoreDisplay(this, 620, 30);

        this.input.on("pointerdown", this.mouseClick, this);

        this.handleInitialGrid();

        const message = `Phaser v${Phaser.VERSION}`;
        this.add
            .text(this.cameras.main.width - 15, 15, message, {
                color: "#000000",
                fontSize: "24px",
            })
            .setOrigin(1, 0);

        this.timer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.timeLimitInSeconds--;
                if (this.timeLimitInSeconds <= 0) {
                    this.gameplayMusic.stop();
                    this.scene.start("PostLevelScene", {
                        finalScore: this.scoreDisplay.getScore(),
                    });
                }
            },
            callbackScope: this,
            loop: true,
        });

        this.timerText = this.add
            .text(
                this.cameras.main.width - 15,
                this.cameras.main.height - 15,
                `Time: ${this.timeLimitInSeconds}`,
                {
                    color: "#000000",
                    fontSize: "24px",
                }
            )
            .setOrigin(1, 1);

        this.pauseButton = new Phaser.GameObjects.Image(
            this,
            50,
            50,
            "pause-button"
        )
            .setScale(0.1)
            .setInteractive()
            .on("pointerdown", this.clickPause, this);
        this.add.existing(this.pauseButton);

        // Create break animations
        this.createBreakAnimations();
    }

    private handleInitialGrid() {
        let matches = this.blockGrid.checkForTruthy();
        if (matches > 0) {
            this.scoreDisplay.incrementScore(matches);
        }
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
                end: 5,
            }),
            ...breakConfig,
        });
        // Repeat for other colors
        this.anims.create({
            key: "redBreak",
            frames: this.anims.generateFrameNumbers("red-break", {
                start: 0,
                end: 5,
            }),
            ...breakConfig,
        });
        this.anims.create({
            key: "yellowBreak",
            frames: this.anims.generateFrameNumbers("yellow-break", {
                start: 0,
                end: 5,
            }),
            ...breakConfig,
        });
        this.anims.create({
            key: "blueBreak",
            frames: this.anims.generateFrameNumbers("blue-break", {
                start: 0,
                end: 5,
            }),
            ...breakConfig,
        });
        this.anims.create({
            key: "purpleBreak",
            frames: this.anims.generateFrameNumbers("purple-break", {
                start: 0,
                end: 5,
            }),
            ...breakConfig,
        });
    }

    mouseClick(
        pointer: Phaser.Input.Pointer,
        currentlyOver: Array<Phaser.GameObjects.GameObject>
    ) {
        if (!this.paused && currentlyOver[0] instanceof BooleanBlock) {
            const currentLocation = currentlyOver[0].getGridLocation();
            if (this.locationBuffer == undefined) {
                this.locationBuffer = currentLocation;
            } else if (this.locationBuffer !== currentLocation) {
                let promises: Array<Promise<void>> =
                    this.blockGrid.switchBlocks(
                        currentLocation,
                        this.locationBuffer
                    );
                this.locationBuffer = undefined;
                Promise.all(promises).then(() => {
                    const matches: number = this.blockGrid.checkForTruthy();
                    this.scoreDisplay.incrementScore(matches);
                });
            }
        }
    }

    clickPause() {
        if (!this.paused) {
            this.paused = true;
            let promise = new Promise<void>((resolve: () => void) => {
                this.sound.play("button-press", { volume: 0.4 });
                this.pauseButton.setScale(0.09);
                setTimeout(resolve, 200);
            });

            Promise.resolve(promise).then(() => {
                this.pauseButton.setScale(0.1);
                this.timer.paused = true;
                this.pauseMenu = new PauseMenu(
                    this,
                    this.resumeFunc,
                    this.mainMenuFunc
                );
                this.add.existing(this.pauseMenu);
            });
        }
    }

    mainMenuFunc() {
        let promise = new Promise<void>((resolve: () => void) => {
            this.sound.play("button-press", { volume: 0.4 });
            this.pauseMenu.mainMenuButton.setScale(0.9);
            setTimeout(resolve, 200);
        });

        Promise.resolve(promise).then(() => {
            this.pauseMenu.mainMenuButton.setScale(1);
            this.gameplayMusic.pause();
            this.scene.start("MenuScene");
        });
    }

    resumeFunc() {
        let promise = new Promise<void>((resolve: () => void) => {
            this.sound.play("button-press", { volume: 0.4 });
            this.pauseMenu.resumeButton.setScale(0.9);
            setTimeout(resolve, 200);
        });

        Promise.resolve(promise).then(() => {
            this.pauseMenu.resumeButton.setScale(1);
            this.pauseMenu.destroy();
            this.timer.paused = false;
            this.paused = false;
        });
    }

    update() {
        this.timerText.setText(`Time: ${this.timeLimitInSeconds}`);
    }
}
