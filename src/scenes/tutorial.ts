// import Phaser from "phaser";
// import ThreeByThreeLevel from "./threeByThreeLevel";

// export default class TutorialLevel extends ThreeByThreeLevel {
//     instructionsText: Phaser.GameObjects.Text;

//     constructor() {
//         super();
//     }

//     create() {
//         super.create();

//         this.instructionsText = this.add
//             .text(
//                 50,
//                 this.cameras.main.height - 50,
//                 "Welcome to the tutorial!",
//                 {
//                     fontSize: "18px",
//                     color: "#000000",
//                 }
//             )
//             .setOrigin(0, 1);

//         this.updateInstructions("Move a block to get started.");

//         // Override the input event handler
//         this.input.on("pointerdown", this.handlePointerDown, this);
//     }

//     updateInstructions(newInstruction: string) {
//         this.instructionsText.setText(newInstruction);
//     }

//     handlePointerDown(
//         pointer: Phaser.Input.Pointer,
//         currentlyOver: Array<Phaser.GameObjects.GameObject>
//     ) {
//         super.mouseClick(pointer, currentlyOver);

//         // After a move, update the instructions based on the current state
//         this.updateTutorialState();
//     }

//     updateTutorialState() {
//         const truthyStatements = this.blockGrid.findTruthyStatements();

//         if (truthyStatements && truthyStatements.length > 0) {
//             this.updateInstructions(
//                 "Great! You've created a true Boolean statement."
//             );
//             // Add further steps or instructions here
//         } else {
//             this.updateInstructions("Try making a valid Boolean statement.");
//         }
//     }
// }

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
    reshuffleButton: Phaser.GameObjects.Text;
    instructionsText: Phaser.GameObjects.Text;

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

        this.reshuffleButton = this.add
            .text(100, 50, "Reshuffle", { color: "#000000" })
            .setInteractive();
        this.reshuffleButton.on("pointerdown", this.reshuffleBlocks, this);

        this.instructionsText = this.add
            .text(
                50,
                this.cameras.main.height - 50,
                "Move a block to get started.",
                {
                    fontSize: "18px",
                    color: "#000000",
                }
            )
            .setOrigin(0, 1);

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
                });
            }
        }
        this.updateTutorialState();
    }

    update() {
        this.fpsText.update();
    }

    reshuffleBlocks() {
        // Clear existing block grid
        this.blockGrid.destroy();

        // Generate new block grid with random blocks
        this.blockGrid = new BlockGrid(this, 3, false);
    }

    updateTutorialState() {
        const truthyStatements = this.blockGrid.findTruthyStatements();

        if (truthyStatements && truthyStatements.length > 0) {
            this.instructionsText.setText(
                "Great! You've created a true Boolean statement."
            );
            // Add further steps or instructions here if needed.
        } else {
            this.instructionsText.setText(
                "Try making a valid Boolean statement."
            );
        }
    }
}
