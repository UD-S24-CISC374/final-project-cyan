import Phaser from "phaser";
import BlockGrid from "../objects/blockGrid";
import FpsText from "../objects/fpsText";
import BooleanBlock from "../objects/booleanBlock";
import ScoreDisplay from "../objects/scoreDisplay";

export default class TutorialLevel extends Phaser.Scene {
    fpsText: FpsText;
    locationBuffer: [number, number] | undefined;
    blockGrid: BlockGrid;
    gameplayMusic: Phaser.Sound.BaseSound;
    scoreDisplay: ScoreDisplay;
    instructionImage: Phaser.GameObjects.Image;
    hasMovedBlock: boolean;

    constructor() {
        super({ key: "TutorialLevel" });
    }

    create() {
        this.blockGrid = new BlockGrid(this, 3, false); // Initialize a 3x3 grid
        this.fpsText = new FpsText(this);
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
            .setScale(0.075);

        this.hasMovedBlock = false;

        // Create break animations
        this.createBreakAnimations();
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
                if (!this.hasMovedBlock) {
                    this.instructionImage.setTexture("instruction-2");
                    this.hasMovedBlock = true; // Set flag to true after first movement
                }
            }
        }
    }

    update() {
        this.fpsText.update();
    }

    updateTutorialState() {
        const truthyStatements = this.blockGrid.findTruthyStatements();

        if (truthyStatements && truthyStatements.length > 0) {
            const score = this.scoreDisplay.getScore();

            if (score >= 1 && score < 5) {
                this.instructionImage.setTexture("instruction-3");
            } else if (score >= 5) {
                this.scene.start("AdvancedTutorial");
            }
        }
    }
}
