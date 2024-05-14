import Phaser from "phaser";
import BlockGrid from "../objects/blockGrid";
import BooleanBlock from "../objects/booleanBlock";
import ScoreDisplay from "../objects/scoreDisplay";
import PauseMenu from "../objects/pausemenu";

export default class AdvancedTutorial extends Phaser.Scene {
    locationBuffer: [number, number] | undefined;
    blockGrid: BlockGrid;
    gameplayMusic: Phaser.Sound.BaseSound;
    scoreDisplay: ScoreDisplay;
    instructionImage: Phaser.GameObjects.Image;
    timer: Phaser.Time.TimerEvent;
    timeLimitInSeconds: number;
    timerText: Phaser.GameObjects.Text;
    pauseButton: Phaser.GameObjects.Image;
    pauseMenu: PauseMenu;
    paused: boolean;
    pauseLock: boolean = true;

    constructor() {
        super({ key: "AdvancedTutorial" });
    }

    create() {
        this.paused = false;
        this.blockGrid = new BlockGrid(this, 5, true); // Initialize a 5x5 grid
        this.gameplayMusic = this.sound.add("gameplay-music");
        this.gameplayMusic.play({ volume: 0.3, loop: true });
        this.scoreDisplay = new ScoreDisplay(this, 620, 30);
        this.timeLimitInSeconds = 60;

        this.input.on("pointerdown", this.mouseClick, this);

        const message = `Phaser v${Phaser.VERSION}`;
        this.add
            .text(this.cameras.main.width - 15, 15, message, {
                color: "#000000",
                fontSize: "24px",
            })
            .setOrigin(1, 0);

        this.instructionImage = this.add
            .image(180, 600, "instruction-4")
            .setScale(0.6);

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
    }

    mouseClick(
        pointer: Phaser.Input.Pointer,
        currentlyOver: Array<Phaser.GameObjects.GameObject>
    ) {
        if (currentlyOver[0] instanceof BooleanBlock) {
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
                    this.updateTutorialState();
                });
            }
        }
        //this.updateTutorialState();
    }

    update() {
        this.timerText.setText(`Time: ${this.timeLimitInSeconds}`);
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
