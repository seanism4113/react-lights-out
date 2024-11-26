import { useState } from "react";
import "./BoardSelect.css";

const BoardSelect = ({ onBoardConfigChange }) => {
	const [litPercentage, setLitPercentage] = useState(0.5);
	const [boardSize, setBoardSize] = useState("5-5");

	const handleRangeChange = (e) => {
		setLitPercentage(e.target.value);
	};

	const handleBoardSizeChange = (e) => {
		setBoardSize(e.target.value);
	};

	const configBoard = () => {
		onBoardConfigChange(boardSize, litPercentage);
	};
	return (
		<div className="BoardSelect">
			<div className="BoardSelect-input-divs">
				<div className="BoardSelect-boardsizes">
					<span className="BoardSelect-config-header">
						<b>Board Sizes</b>
					</span>
					<label>
						<input type="radio" name="board-size-choice" value="4-4" checked={boardSize === "4-4"} onChange={handleBoardSizeChange} /> 4x4
					</label>
					<label>
						<input type="radio" name="board-size-choice" value="5-5" checked={boardSize === "5-5"} onChange={handleBoardSizeChange} /> 5x5
					</label>
					<label>
						<input type="radio" name="board-size-choice" value="6-6" checked={boardSize === "6-6"} onChange={handleBoardSizeChange} /> 6x6
					</label>
				</div>
				<div>
					<p className="BoardSelect-config-header">
						<b>% of Lit Squares</b>
					</p>
					<input type="range" id="rangeInput" name="range" min="0" max="1" step="0.1" value={litPercentage} onChange={handleRangeChange} />
					<output htmlFor="rangeInput">{`${litPercentage * 100}%`}</output>
				</div>
			</div>
			<button className="BoardSelect-button" onClick={configBoard}>
				Create Board
			</button>
		</div>
	);
};

export default BoardSelect;
