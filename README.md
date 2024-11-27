# Lights Out Game

## Overview

Lights Out is a classic puzzle game where the goal is to turn off all the lights on the board. The board consists of several lights (represented as squares), which can either be lit or unlit. Clicking on a light toggles its state and the state of its adjacent lights (up, down, left, and right).

### Objective

- The objective of the game is to turn off all the lights.
- Each time you click a light, it will toggle between "on" and "off."
- Adjacent lights (up, down, left, and right) will also toggle when you click on a light.

## Features

- **Adjustable Board Size**: You can choose from various board sizes such as 4x4, 5x5, and 6x6.
- **Randomly Lit Squares**: At the start of the game, some of the lights will be randomly lit based on a configurable chance.
- **Win Condition**: The game is won when all lights are turned off.

## Game Flow

1. A board is created with random lights turned on based on the selected board size and the probability of a light being on.
2. The player clicks on a light to toggle its state and the state of its adjacent lights.
3. The player continues making moves until all the lights are turned off.
4. A message will display the number of moves taken to win the game.

## Installation and Setup

### Prerequisites

Ensure you have the following installed:

- Vite
- npm or yarn (for managing dependencies)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/seanism4113/react-lights-out.git
   ```
