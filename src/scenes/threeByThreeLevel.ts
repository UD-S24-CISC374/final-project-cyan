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
                    });
                }
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
