import Phaser from "phaser";
import BooleanBlock from "./booleanBlock";

export default class BlockGrid extends Phaser.GameObjects.Container {
    blockMatrix: Array<Array<BooleanBlock>>;
    private blockSize: number = 100;
    private blockSpacing: number = 10;
    private includeNotBlocks: boolean;

    constructor(
        scene: Phaser.Scene,
        sideLength: number,
        includeNotBlocks: boolean = true
    ) {
        super(scene);
        this.blockMatrix = [];
        this.includeNotBlocks = includeNotBlocks;

        for (let i = 0; i < sideLength; i++) {
            this.blockMatrix.push([]);
            for (let j = 0; j < sideLength; j++) {
                let block = this.createRandomBlock(i, j);
                this.blockMatrix[i].push(block);
                this.add(block);
            }
        }
        this.recenterGrid();
        scene.add.existing(this);
        scene.sound.add("block-break");
    }

    public createRandomBlock(row: number, col: number): BooleanBlock {
        let blockList: Array<string> = ["and", "or", "true", "false"];

        if (this.includeNotBlocks) {
            blockList.push("not");
        }

        let blockType = blockList[Math.floor(Math.random() * blockList.length)];
        let x = col * (this.blockSize + this.blockSpacing);
        let y = row * (this.blockSize + this.blockSpacing);
        let block = new BooleanBlock(this.scene, x, y, blockType, [row, col]);
        block.setInteractive();
        return block;
    }

    public getBlockAtLocation(index: [number, number]) {
        return this.blockMatrix[index[0]][index[1]];
    }

    public switchBlocks(
        indexA: [number, number],
        indexB: [number, number]
    ): Array<Promise<void>> {
        let blockA = this.blockMatrix[indexA[0]][indexA[1]];
        let blockB = this.blockMatrix[indexB[0]][indexB[1]];
        blockA.setGridLocation(indexB);
        blockB.setGridLocation(indexA);
        this.blockMatrix[indexA[0]][indexA[1]] = blockB;
        this.blockMatrix[indexB[0]][indexB[1]] = blockA;
        // promises used to ensure the swap animation is complete before blocks are eliminated
        let promise1 = new Promise<void>((resolve: () => void) => {
            this.scene.tweens.add({
                targets: blockA,
                x: indexB[1] * (this.blockSize + this.blockSpacing),
                y: indexB[0] * (this.blockSize + this.blockSpacing),
                ease: "Linear",
                duration: 300,
                onComplete: resolve,
            });
        });
        let promise2 = new Promise<void>((resolve: () => void) => {
            this.scene.tweens.add({
                targets: blockB,
                x: indexA[1] * (this.blockSize + this.blockSpacing),
                y: indexA[0] * (this.blockSize + this.blockSpacing),
                ease: "Linear",
                duration: 300,
                onComplete: resolve,
            });
        });
        // returns promises of the tweens so that the scene can check truthiness after they finish
        return [promise1, promise2];
    }

    public evaluateBooleanExpression(blocks: Array<BooleanBlock>): boolean {
        let expression = blocks
            .map((block) => {
                switch (block.getBlockType()) {
                    case "and":
                        return "&&";
                    case "or":
                        return "||";
                    case "not":
                        return "!";
                    case "true":
                        return "true";
                    case "false":
                        return "false";
                    default:
                        return "";
                }
            })
            .join(" ");

        try {
            return eval(expression) as boolean;
        } catch (error) {
            return false;
        }
    }

    public findTruthyStatements(): Array<{
        type: "row" | "column";
        index: number;
    }> | null {
        let outArray: Array<{ type: "row" | "column"; index: number }> = [];
        for (let row = 0; row < this.blockMatrix.length; row++) {
            if (this.evaluateBooleanExpression(this.blockMatrix[row])) {
                console.log(`Truthy statement found in row ${row}`);
                outArray.push({ type: "row", index: row });
            }
        }

        for (let col = 0; col < this.blockMatrix.length; col++) {
            let columnBlocks = this.blockMatrix.map((row) => row[col]);
            if (this.evaluateBooleanExpression(columnBlocks)) {
                console.log(`Truthy statement found in column ${col}`);
                outArray.push({ type: "column", index: col });
            }
        }

        return outArray;
    }

    public checkForTruthy(): number {
        let foundTruthy = this.findTruthyStatements();
        let hasUpdated = false;

        if (foundTruthy && foundTruthy.length > 0) {
            for (const statement of foundTruthy) {
                if (statement.type === "row") {
                    this.removeRow(statement.index);
                    this.scene.sound.play("block-break", { volume: 0.6 });
                } else {
                    this.removeColumn(statement.index);
                    this.scene.sound.play("block-break", { volume: 0.6 });
                }
                hasUpdated = true;
            }
            if (hasUpdated) {
                this.updateBlockPositions();
            }
        }
        // returns number of truthy statements found
        if (foundTruthy instanceof Array) {
            return foundTruthy.length;
        }
        return 0;
    }

    public removeRow(rowIndex: number) {
        // Collect animations in an array of promises to know when all animations have completed
        const animPromises = this.blockMatrix[rowIndex].map(
            (block) =>
                new Promise<void>((resolve) => {
                    const breakKey = this.getBreakAnimationKey(block);
                    const horizontalAdjustment = this.includeNotBlocks
                        ? 350
                        : 460;
                    const verticalAdjustment = this.includeNotBlocks ? 80 : 190;

                    // Create and play the animation
                    const anim = this.scene.add
                        .sprite(
                            block.x + this.blockSize / 2 + horizontalAdjustment,
                            block.y + this.blockSize / 2 + verticalAdjustment,
                            breakKey
                        )
                        .setOrigin(0.5, 0.5)
                        .setDepth(10);

                    anim.play(breakKey);
                    anim.on("animationcomplete", () => {
                        // When animation completes, destroy the sprite and resolve the promise
                        anim.destroy();
                        resolve();
                    });

                    // Destroy the block immediately (consider destroying after animation if needed)
                    block.destroy();
                })
        );

        // When all animations are completed, perform clean up
        Promise.all(animPromises).then(() => {
            // Remove the blocks from the grid and adjust the grid accordingly
            this.blockMatrix.splice(rowIndex, 1);
            this.addNewRow();
            this.updateBlockPositions();
        });
    }

    public getBreakAnimationKey(block: BooleanBlock): string {
        switch (block.getBlockType()) {
            case "true":
                return "greenBreak";
            case "false":
                return "redBreak";
            case "and":
                return "blueBreak";
            case "or":
                return "purpleBreak";
            case "not":
                return "yellowBreak";
            default:
                throw new Error(`Unknown block type: ${block.getBlockType()}`);
        }
    }

    public removeColumn(colIndex: number) {
        // Collect animations in an array of promises to know when all animations have completed
        const animPromises = this.blockMatrix.map(
            (row) =>
                new Promise<void>((resolve) => {
                    const block = row[colIndex];
                    const breakKey = this.getBreakAnimationKey(block);
                    const horizontalAdjustment = this.includeNotBlocks
                        ? 350
                        : 460;
                    const verticalAdjustment = this.includeNotBlocks ? 80 : 190;

                    // Create and play the animation
                    const anim = this.scene.add
                        .sprite(
                            block.x + this.blockSize / 2 + horizontalAdjustment, // Adjust the horizontal position
                            block.y + this.blockSize / 2 + verticalAdjustment, // Adjust the vertical position
                            breakKey
                        )
                        .setOrigin(0.5, 0.5)
                        .setDepth(10);

                    anim.play(breakKey);
                    anim.on("animationcomplete", () => {
                        // When animation completes, destroy the sprite and resolve the promise
                        anim.destroy();
                        resolve();
                    });

                    // Destroy the block immediately (consider destroying after animation if needed)
                    block.destroy();
                })
        );

        // When all animations are completed, perform clean up
        Promise.all(animPromises).then(() => {
            // Remove the blocks from the grid and adjust the grid accordingly
            for (let i = 0; i < this.blockMatrix.length; i++) {
                this.blockMatrix[i].splice(colIndex, 1);
            }
            this.addNewColumn();
            this.updateBlockPositions();
        });
    }

    public addNewColumn() {
        for (let row = 0; row < this.blockMatrix.length; row++) {
            let block = this.createRandomBlock(
                row,
                this.blockMatrix[row].length
            );
            this.blockMatrix[row].push(block);
            this.add(block);
        }
    }

    public addNewRow() {
        let newRow: Array<BooleanBlock> = [];
        for (let col = 0; col < this.blockMatrix[0].length; col++) {
            let block = this.createRandomBlock(0, col);
            newRow.push(block);
            this.add(block);
        }
        this.blockMatrix.unshift(newRow);
    }

    public updateBlockPositions() {
        for (let row = 0; row < this.blockMatrix.length; row++) {
            for (let col = 0; col < this.blockMatrix[row].length; col++) {
                let block = this.blockMatrix[row][col];
                block.x = col * (this.blockSize + this.blockSpacing);
                block.y = row * (this.blockSize + this.blockSpacing);
                block.setGridLocation([row, col]);
            }
        }
        this.recenterGrid();
    }

    private recenterGrid() {
        let gridWidth =
            this.blockMatrix[0].length * (this.blockSize + this.blockSpacing) -
            this.blockSpacing;
        let gridHeight =
            this.blockMatrix.length * (this.blockSize + this.blockSpacing) -
            this.blockSpacing;
        this.x = (this.scene.scale.width - gridWidth) / 2 + 30;
        this.y = (this.scene.scale.height - gridHeight) / 2 + 40;
    }
}
