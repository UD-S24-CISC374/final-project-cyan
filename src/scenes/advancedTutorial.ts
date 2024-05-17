import Phaser from "phaser";
import BlockGrid from "../objects/blockGrid";
import BooleanBlock from "../objects/booleanBlock";
import ScoreDisplay from "../objects/scoreDisplay";
import PauseMenu from "../objects/pausemenu";

export default class AdvancedTutorial extends Phaser.Scene {
    // No need for gameplay music since music will carry over from firest tutorial scene
    locationBuffer: [number, number] | undefined;
    blockGrid: BlockGrid;
    scoreDisplay: ScoreDisplay;
    instructionImage: Phaser.GameObjects.Image;
    timer: Phaser.Time.TimerEvent;
    timeLimitInSeconds: number;
    timerText: Phaser.GameObjects.Text;
    pauseButton: Phaser.GameObjects.Image;
    pauseMenu: PauseMenu;
    paused: boolean;
    pauseLock: boolean = true;
    background: Phaser.GameObjects.Image;

    constructor() {
        super({ key: "AdvancedTutorial" });
    }

    create() {
        this.paused = false;
        this.background = new Phaser.GameObjects.Image(
            this,
            640,
            360,
            "5x5-backplate"
        );
        this.add.existing(this.background);
        this.blockGrid = new BlockGrid(this, 5, true); // Initialize a 5x5 grid
        this.scoreDisplay = new ScoreDisplay(this, 900, 38);
        this.timeLimitInSeconds = 60;

        this.input.on("pointerdown", this.mouseClick, this);

        this.instructionImage = this.add
            .image(180, 600, "instruction-4")
            .setScale(0.6);

        this.timerText = this.add
            .text(550, 77, `${this.timeLimitInSeconds}`, {
                fontFamily: "Arial",
                color: "#000000",
                fontSize: "45px",
            })
            .setOrigin(1, 1);
        this.timer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.timeLimitInSeconds--;
                if (this.timeLimitInSeconds <= 0) {
                    this.sound.stopAll();
                    this.scene.start("PostLevelScene", {
                        finalScore: this.scoreDisplay.getScore(),
                    });
                }
            },
            callbackScope: this,
            loop: true,
            paused: true,
        });

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

        this.blockGrid.setX(420);
        this.blockGrid.setY(180);
    }

    mouseClick(
        pointer: Phaser.Input.Pointer,
        currentlyOver: Array<Phaser.GameObjects.GameObject>
    ) {
        if (!this.paused && currentlyOver[0] instanceof BooleanBlock) {
            const currentBlock = currentlyOver[0] as BooleanBlock;
            const currentLocation = currentBlock.getGridLocation();

            if (this.locationBuffer === undefined) {
                // No block is currently selected, select this one
                this.locationBuffer = currentLocation;
                currentBlock.setTint(0xfff300); // Tint the selected block
            } else {
                // Try to retrieve the previously selected block safely
                const previousBlock = this.blockGrid.getBlockAtLocation(
                    this.locationBuffer
                );
                if (previousBlock !== null) {
                    previousBlock.clearTint(); // Safely clear the tint only if previousBlock is not null
                }

                if (
                    this.locationBuffer[0] === currentLocation[0] &&
                    this.locationBuffer[1] === currentLocation[1]
                ) {
                    // The same block was clicked again deselect it
                    this.locationBuffer = undefined;
                } else if (previousBlock) {
                    // A different block was clicked and previousBlock is not null -> swap
                    let promises = this.blockGrid.switchBlocks(
                        currentLocation,
                        this.locationBuffer
                    );
                    this.locationBuffer = undefined;
                    Promise.all(promises).then(() => {
                        const matches: number = this.blockGrid.checkForTruthy();
                        this.scoreDisplay.incrementScore(matches);
                        this.updateTutorialState();
                    });
                }
            }
        }
    }
    update() {
        this.timerText.setText(`${this.timeLimitInSeconds}`);
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
            this.sound.stopAll();
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
            this.paused = false;
            this.pauseMenu.resumeButton.setScale(1);
            this.pauseMenu.destroy();
            if (!this.pauseLock) {
                this.timer.paused = false;
            }
        });
    }

    startTimer() {
        this.instructionImage.setTexture("instruction-5");

        this.pauseLock = false;
        this.timer.paused = false;
    }

    updateTutorialState() {
        if (this.timer.paused) {
            this.startTimer();
        }
    }
}
