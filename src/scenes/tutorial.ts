import Phaser from "phaser";
import BlockGrid from "../objects/blockGrid";
import BooleanBlock from "../objects/booleanBlock";
import ScoreDisplay from "../objects/scoreDisplay";
import PauseMenu from "../objects/pausemenu";

export default class TutorialLevel extends Phaser.Scene {
    locationBuffer: [number, number] | undefined;
    blockGrid: BlockGrid;
    gameplayMusic: Phaser.Sound.BaseSound;
    scoreDisplay: ScoreDisplay;
    instructionImage: Phaser.GameObjects.Image;
    hasMovedBlock: boolean;
    pauseButton: Phaser.GameObjects.Image;
    pauseMenu: PauseMenu;
    paused: boolean;

    constructor() {
        super({ key: "TutorialLevel" });
    }

    create() {
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

        this.instructionImage = this.add
            .image(180, 600, "instruction-1")
            .setScale(0.7);

        this.hasMovedBlock = false;
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
        });
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
    }

    update() {}

    updateTutorialState() {
        if (!this.hasMovedBlock) {
            this.instructionImage.setTexture("instruction-2");
            this.hasMovedBlock = true; // Set flag to true after first movement
        }
        const score = this.scoreDisplay.getScore();

        if (score >= 1 && score < 12) {
            this.instructionImage.setTexture("instruction-3");
        } else if (score >= 12) {
            this.gameplayMusic.stop();
            this.scene.start("AdvancedTutorial");
        }
    }
}
