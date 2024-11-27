import { useState } from "react";
import Board from "./Board";
import BoardSelect from "./BoardSelect";
import "./App.css";

/** Simple app that just shows the LightsOut game. */

const App = () => {
	const [config, setConfig] = useState({ boardSize: "5.5", litPercentage: 0.5 });
	const [showBoard, setShowBoard] = useState(false);

	const handleBoardConfigChange = (newBoardSize, newLitPercentage) => {
		setConfig({ boardSize: newBoardSize, litPercentage: newLitPercentage });
		setShowBoard(true);
	};

	const handleRestart = () => setShowBoard(false);

	const [nrows, ncols] = config.boardSize.split("-").map(Number);

	return (
		<div className="App">
			<h1 className="App-title">Lights Out</h1>
			<p className="App-directions">
				<b>Directions:</b> <br /> When the game starts, a random number or a stored pattern of lights are switched on. Pressing any of the lights will toggle it and the four adjacent lights. The goal of the puzzle is to switch all the lights off,
				preferably in as few button presses as possible.
			</p>
			{!showBoard ? (
				<BoardSelect onBoardConfigChange={handleBoardConfigChange} />
			) : (
				<>
					<Board nrows={nrows} ncols={ncols} litChance={config.litPercentage} />
					<button onClick={handleRestart} className="App-button">
						Restart Game
					</button>
				</>
			)}
		</div>
	);
};

export default App;
