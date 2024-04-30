import Phaser from "phaser";
import PreloadScene from "./scenes/preloadScene";
import MenuScene from "./scenes/menuScene";
import FiveByFiveLevel from "./scenes/fiveByFiveLevel";
import PostLevelScene from "./scenes/postLevelScene";
import ThreeByThreeLevel from "./scenes/threeByThreeLevel";
import TutorialLevel from "./scenes/tutorial";

const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 720;

export const CONFIG = {
    title: "Boolean Bonanza",
    version: "0.1.1",
    type: Phaser.AUTO,
    backgroundColor: "#ffffff",
    scale: {
        parent: "phaser-game",
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
    },
    scene: [
        PreloadScene,
        MenuScene,
        FiveByFiveLevel,
        PostLevelScene,
        ThreeByThreeLevel,
        TutorialLevel,
    ],
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            gravity: { y: 300 },
        },
    },
    input: {
        keyboard: true,
        mouse: true,
        touch: true,
        gamepad: false,
    },
    render: {
        pixelArt: false,
        antialias: true,
    },
};
