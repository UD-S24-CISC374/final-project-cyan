# Boolean Bonanza EGDD

## Elevator Pitch

In Boolean Bonanza, you are presented with a grid of squares representing boolean values and operators (True, False, OR, AND, NOT, etc.). The player is able to move the rows and columns by clicking and dragging on a square, with the goal of making a row or column evaluate to True. If a row or column evaluates to True, it will be destroyed and give the player points. The goal is to make players able to evaluate boolean expressions on sight and understand how changes will affect their evaluation.

## Influences

-   Yoshi's Cookie
    -   Medium: Video Game
    -   Explanation: Yoshi's Cookie multiplayer mode inspired the block movement of the grid. In Yoshi's Cookie, the player can move rows and columns such that their order is maintained and the blocks wrap around the other side. This will allow for greater control than a system like Candy Crush where only two blocks can be switched at a time.
-   Candy Crush
    -   Medium: Video Game
    -   Explanation: Candy Crush is a popular "match-3" style game that incorporates a pleasing visual style to draw in players. The graphics and animations of Candy Crush are considered so good as to be addictive by some, which could be mimicked to encourage players to participate in this educational game. Blocks in Candy Crush explode into satisfying particle effects when broken. This is something that should be incorporated into Boolean Bonanza.
-   2048
    -   Medium: Video Game
    -   Explanation: 2048 is a popular online matching game where players are tasked with combining squares based on their numerical value. Squares start with low powers of 2 (2, 4, 8, etc.) and are combined with squares of the same value until the player reaches a square of number 2048. The difficulty comes from squares of different values getting in the way of making matches. This is similar to the difficulty in Boolean Bonanza, which comes from the fact that randomly ordered squares will evaluate to false or an error and thus not break.

## Core Gameplay Mechanics

-   Players are presented with a grid of squares representing boolean values and operators.
-   Players can click and drag rows or columns on the grid of blocks to rearrange them.
-   When a row (left to right) or a column (top to bottom) of boolean blocks evaluates to True, it will break and give the player points.
-   After blocks break, the blocks above them will fall down until they are supported from below, with new blocks being spawned on the top of the grid.
-   A timer will be displayed to let the player know how much more time they have in the current level before it ends.

# Learning Aspects

## Learning Domains

Logic
Discrete Math
Introductory Programming (language is irrelevant given it has boolean values)

## Target Audiences

Boolean Bonanza is targeted at young computer scientists in middle school or high school looking to learn the basics of boolean statements.

## Target Contexts

Boolean Bonanza can be used at home as a study tool in order to practice boolean concepts. It can also be used in a classroom setting as an exercise to further strengthen one's booolean knowledge.

## Learning Objectives

-   Truthiness of Booleans: By the end of the lesson, players will be able to explain the truthiness of a boolean expression with at least two variables
-   Adjustment of Booleans: By the end of the lesson, players will be able to rearrange boolean expressions in order to achieve a truthful outcome.
-   Boolean Algebra: By the end of the lesson, players will be able to recognize the order of operations for boolean algebra. Students will learn the priority of operations is NOT, then AND, then OR.

## Prerequisite Knowledge

-   Prior to the game, players need to be able to define the concept of evaluating a boolean expression.
-   Prior to the game, players need to be able to evaluate a boolean expression.
-   Prior to the game, players need to be able to evaluate a boolean expression with more than two variables.
-   Prior to the game, players need to be able to define the concept of order of operations regarding boolean expressions.

## Assessment Measures

A short pre-test and matching post-test should be designed to assess student learning.
The exact format of the test will be multiple choice where the student will be tasked with identifying which boolean expression of the four options provided evaluates to true. Students will be assessed based on their accuracy and efficiency.

-   Given the following boolean expression, determine whether it evaluates to True, False, or an Error: True AND False OR NOT True (False)
-   Given the following boolean expression, determine whether it evaluates to True, False, or an Error: False OR True AND True (True)
-   Given the following boolean expression, determine whether it evaluates to True, False, or an Error: True AND True OR AND FALSE (Error)

# What sets this project apart?

-   Most computer science games revolve around code-writing, this one focuses solely on sharpening the players understanding of boolean expressions.
-   The visuals of the game will mimic a Nintendo/Indie game with a bright and attractive atmosphere.
-   With all input involving the shifting of blocks, the controls of the game are simple and easy to learn.
-   The simple nature of the game along with its flashiness will be addictive to players.
-   Players will improve their speed at evaluating boolean expressions as they improve at the game.

# Player Interaction Patterns and Modes

## Player Interaction Pattern

Players will use a mouse or touchscreen to press buttons and drag blocks across the screen. Players will engage with the game by themselves or competitively. One player at a time will actively play the game while trying to achieve a high score in the time allotted. After that player is finished, other players can use the same device to attempt to reach a new high score. In this way, players can compete and try to achieve their own personal high score or a score higher than their friends.

## Player Modes

-   Main Menu: allows the player to pick between a 3 x 3 and 5 x 5 depending on the player's experience. The player will also be given the option to play the tutorial.
-   Tutorial: the player will be taken through a playable tutorial in which they learn the mechanics of the game. After completing the tutorial the player will be guided back to the main menu.
-   3 x 3 Boolean Grid: the player will make valid boolean statements with only one operator. After completing this level they will be given the option to play again or move on to the next level.
-   5 x 5 Boolean Grid: the player will make valid boolean statements with two operators. After completing this level they will be given the opportunity to play again.

# Gameplay Objectives

-   Scoring Points By Making Valid Truthiness Statements:
    -   Description: Each valid truthiness statement will result in gaining an amount of points adding to you current score.
    -   Alignment: By gaining points, this will allow the player to see how many valid statements they are able to make.
-   Scoring As Many Points As You Can Before The Time Is Up:
    -   Description: In Boolean Bonanza there will be a time limit for each level. During this time the player must make as many valid  
        statements as they can.
    -   Alignment: Each time the player plays the game they will be able to see their learning progress each time they score higher given the same time restriction.

# Procedures/Actions

During menu screens such as the main menu, the player will be able to move the mouse cursor and click on buttons to enter the game or change settings. On the gameplay screen, the player will use the mouse cursor to drag blocks across the screen. Clicking and holding down the mouse button on a block of the grid will allow the player to drag that block up, down, left, or right. The other blocks in that same row or column (depending on the direction of dragging) will also move to follow that block while wrapping around the edges of the screen. This allows the player to rearrange the blocks on the grid while still providing a challenge to plan moves in advance.

# Rules

Time - The player will be given limited time to create as many valid boolean expressions as possible. They do not have a limit on the number of moves that they can make, so having time as a finite resource will force the player to make decisions and movements at a higher rate, leading to some mistakes that will ultimately affect their end of game results. The player starts the game with a fixed amount of time, and once that time runs out the game will be over.

# Objects/Entities

-   Blocks - In order to populate the grid that we have acting as our game board, we will need to design blocks that each depict a different aspect of a boolean statement. We will need a block for True, False, AND, OR, and NOT. Each block will be differentiated based upon their name and color scheme.
-   Grid - The grid will act as the game board which will be a fixed size but can be altered depending on the difficulty of the level/phase. The grid itself will be populated by blocks, which will be stored in a double array. The grid itself will not be a highlight and will not really stick out to the player, it only really creates the boundaries of the game board.
-   Timer - A timer will be created at the top of the grid that will tick downwards, displaying to the player the amount of time they have left in the level. The timer will look analog with a black background and white text for the numbers. Once the timer is finished, the timer will display 0:00 in red numbers to indicate the level is over.
-   Scoreboard - A scoreboard will be create at the top of the grid, beside the timer in order to display the players score for the current level. The scoreboard will initially be listed with the players name above a 0000 to indicate that the player has no points at the start of the level. Once a valid boolean statement is created, the row/column will break and the player will be awarded a certain amount of points that will be reflected on the scoreboard.
-   Background - The background will be behind the grid, and will not serve any real purpose outside of visual appeal. Depending on the difficulty of the level, could be a solid color or something more extreme to reflect the difficulty of the challenge that the player is undertaking.

## Core Gameplay Mechanics

-   Players are presented with a grid of squares representing boolean values and operators. - Players will either be presented with a 3 x 3 grid involving only two boolean values or a 5 x 5 grid involving at least two boolean values. Within this grid the player will find boolean values True and False represented by T and F. The player will also see operators such as NOT, AND, and OR. Using this grid the player will have to determine how they can rearrange these elements in order to make true boolean statements.
-   Players can click and drag rows or columns on the grid of blocks to rearrange them. - Players interact with the grid by clicking and dragging rows or columns to rearrange the blocks. This mechanic is intuitive, mimicking familiar touch and drag gestures, making the game accessible to a wide audience. It encourages strategic thinking and planning as players must consider the effects of their rearrangements not only on the immediate row or column but on the entire grid. This mechanic enhances problem-solving skills and provides a hands-on approach to learning boolean logic.
-   When a row (left to right) or a column (top to bottom) of boolean blocks evaluates to True, it will break and give the player points. - When a row or column is arranged such that it evaluates to True (following standard boolean logic rules), that row or column breaks, rewarding the player with points. This mechanic directly ties the game's puzzle-solving aspect to educational outcomes, as players must apply their knowledge of boolean logic to progress. It provides instant feedback on the correctness of their logic application, reinforcing learning through gameplay.
-   After blocks break, the blocks above them will fall down until they are supported from below, with new blocks being spawned on the top of the grid. - After blocks break, the mechanics of blocks falling to fill empty spaces and new blocks spawning at the top introduce a dynamic element to the game. This mechanic requires players to adapt to a constantly changing puzzle environment, enhancing cognitive flexibility. It adds a layer of complexity and unpredictability, as players must not only plan their current moves but also anticipate how these changes will affect future moves. This simulates a more realistic problem-solving environment, where conditions can change and require flexible thinking.
-   A timer will be displayed to let the player know how much more time they have in the current level before it ends. - A visible timer adds urgency to each level, challenging players to think and act quickly. This time pressure tests and improves players' ability to apply boolean logic under constraints, mirroring real-world situations where decisions must be made within limited time frames. The timer also adds a competitive edge to the game, encouraging players to improve their speed and efficiency for higher scores or better completion times.

## Feedback

Blocks Breaking - When a valid boolean statement is created using the blocks, the blocks themselves will "break" and this break will consist of the blocks disappearing off the screen, each block will have a shattering animation that they leave behind along with a "breaking" audio cue to commend the player on the creation of a valid boolean statement.

Medal Acquisition - Every time a valid boolean statement is created and the statement disappears from the screen, a fixed amount of points will be added to the players scoreboard on the top of the screen. Once these scores reach a certain threshold, there will be a small animation and audio cue indicating that the player has passed this threshold. An example of this would be going from a silver medal to a gold medal. The silver medal will slide down and be replaced with a gold medal from above. While this process is happening, there will be a metallic audio cue to indicate the upgrade of score.

High Scores - There will be a log for all of the previous scores that a player has gotten. The scores themselves will track the amount of boolean statements created in the amount of time that it took. Based on this metric, the player will be able to see how they have progressed in terms of speed and accuracy when it comes to the creation of boolean statements.

# Story and Gameplay

## Presentation of Rules

The player will be guided through a playable tutorial in which they will be making valid truthiness statements. The tutorial will take the player through each mechanic of the game. The player will be shown how to move operators in position to make valid boolean statements in order to add points to their score. After making a series of statements the player will be directed to the main menu where they can choose to play the game on their own.

## Presentation of Content

The playable tutorial will demonstrate to the player how the game is actually meant to be played. From that point, the player will be started off playing the game on the lowest difficulty on the smallest grid. At this point, the time pressure will not be severe and the player will get the opportunity to get their bearings with smaller and easier to handle boolean statements. After completion of these easier grid levels, the player will begin getting exposed to larger grids with less time to work with, forcing them to adapt and learn how to handle larger, more complex booleans. This cycle will continue until the time pressure becomes too great and the player will not be able to get an acceptable score. Because the learning aspect is so heavily tied into the core gameplay mechanics, the player's success within the game will be directly tied to their understanding of what a valid boolean statement is and how to create one given a set amount of variables.

## Story

The player will be tasked with a series of boolean puzzles under a time constraint. The game will present a grid to the player involving blocks consistiing of boolean operators and true/false indicators. The player must rearrange these blocks in order to make as many valid boolean statements as they can before the time is up. After doing the puzzles many times, the player will be able to see the progress they have made in making truthiness statements.

## Storyboarding

Main Gameplay Storyboard:

<img src="https://github.com/ACTrexler/CISC473_EGDD/blob/main/BooleanGameMockup/1.png?raw=true" alt="Story Board 1" width="300">
<img src="https://github.com/ACTrexler/CISC473_EGDD/blob/main/BooleanGameMockup/2.png?raw=true" alt="Story Board 1" width="300">
<img src="https://github.com/ACTrexler/CISC473_EGDD/blob/main/BooleanGameMockup/3.png?raw=true" alt="Story Board 1" width="300">
<img src="https://github.com/ACTrexler/CISC473_EGDD/blob/main/BooleanGameMockup/4.png?raw=true" alt="Story Board 1" width="300">
<img src="https://github.com/ACTrexler/CISC473_EGDD/blob/main/BooleanGameMockup/5.png?raw=true" alt="Story Board 1" width="300">

# Assets Needed

## Aethestics

The game is designed to immerse players in a nostalgic arcade atmosphere, with soft and bright colors that create a comforting and enjoyable visual experience reminiscent of old-timey Nintendo games. Its pixelated graphics and simple animations evoke a sense of retro charm, making the world both inviting and familiar. The chiptune soundtrack and classic sound effects further enhance the nostalgic feel, transporting players back to the golden era of gaming. Together, these elements combine to offer an experience that's not only visually and auditorily captivating but also emotionally resonant with fans of early video gaming.

## Graphical

-   Boolean Blocks
    -   <img src="https://github.com/ACTrexler/CISC473_EGDD/blob/main/True.png?raw=true" alt="True Block" width="200"/>
    -   <img src="https://github.com/ACTrexler/CISC473_EGDD/blob/main/False.png?raw=true" alt="False Block" width="200"/>
    -   <img src="https://github.com/ACTrexler/CISC473_EGDD/blob/main/And.png?raw=true" alt="And Block" width="200"/>
    -   <img src="https://github.com/ACTrexler/CISC473_EGDD/blob/main/Or.png?raw=true" alt="Or Block" width="200"/>
    -   <img src="https://github.com/ACTrexler/CISC473_EGDD/blob/main/Not.png?raw=true" alt="Not Block" width="200"/>
-   Particle Textures:
    -   [AlotofImpacts Red Particles by JoesAlotofthings](https://opengameart.org/content/alotofimpacts-5-frame-impacts-4-variations-red-impacts-19of20)
    -   [AlotofImpacts Green Particles by JoesAlotofthings](https://opengameart.org/content/alotofimpacts-5-frame-impacts-4-variations-green-impacts-15of20)
    -   [AlotofImpacts Blue Particles by JoesAlotofthings](https://opengameart.org/content/alotofimpacts-5-frame-impacts-4-variations-blue-impacts-14of20)
    -   [AlotofImpacts Purple Particles by JoesAlotofthings](https://opengameart.org/content/alotofimpacts-5-frame-impacts-4-variations-purple-impacts-18of20)
    -   [AlotofImpacts Yellow Particles by JoesAlotofthings](https://opengameart.org/content/alotofimpacts-5-frame-impacts-4-variations-yellow-impacts-20of20)
-   Environment Art/Textures:
    -   <img src="https://github.com/ACTrexler/CISC473_EGDD/blob/main/ExampleBackplate.png?raw=true" alt="Example Backplate" width="300"/>
    -   <img src="https://github.com/ACTrexler/CISC473_EGDD/blob/main/MainMenuMockup.png?raw=true" alt="Main Menu Mockup" width="300"/>

## Audio

-   Music List (Ambient sound)

    -   Main Menu Music: [Puzzle Menu by caret7](https://opengameart.org/content/puzzle-menu), [Menu by tcarisland](https://opengameart.org/content/menu-1)
    -   Gameplay Music: [Contemplation by bart](https://opengameart.org/content/contemplation), [Contemplation II by bart](https://opengameart.org/content/contemplation-ii)

-   Sound List (SFX)
    -   Button Press: [8bit Menu Highlight by Fupi](https://opengameart.org/content/8bit-menu-highlight), [Cloud Click by Mobeyee Sounds](https://opengameart.org/content/cloud-click)
    -   Block Breaking: [Cork by Blender Foundation](https://opengameart.org/content/cork), [Breaking/Falling/Hit SFX by rubberduck](https://opengameart.org/content/75-cc0-breaking-falling-hit-sfx)
    -   Block Breaking Combo: [Positive Sounds by remaxim](https://opengameart.org/content/postive-sounds),

# Metadata

-   Template created by Austin Cory Bart <acbart@udel.edu>, Mark Sheriff, Alec Markarian, and Benjamin Stanley.
-   Version 0.0.3

-   Shoutout ChatGPT for helping generate the spiels on the Core Gameplay Mechanics
