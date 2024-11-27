import { useState } from "react";
import "./BoardSelect.css";

const BoardSelect = ({ onBoardConfigChange }) => {
	const [boardSize, setBoardSize] = useState("5-5");
	const [litPercentage, setLitPercentage] = useState(0.5);

	const handleSubmit = () => onBoardConfigChange(boardSize, litPercentage);

	return (
		<div className="BoardSelect">
			<div className="BoardSelect-input-divs">
				<div className="BoardSelect-boardsizes">
					<span className="BoardSelect-config-header">
						<b>Board Sizes</b>
					</span>
					<label>
						<input type="radio" name="boardsize" value="4-4" checked={boardSize === "4-4"} onChange={(e) => setBoardSize(e.target.value)} /> 4x4
					</label>
					<label>
						<input type="radio" name="boardsize" value="5-5" checked={boardSize === "5-5"} onChange={(e) => setBoardSize(e.target.value)} /> 5x5
					</label>
					<label>
						<input type="radio" name="boardsize" value="6-6" checked={boardSize === "6-6"} onChange={(e) => setBoardSize(e.target.value)} /> 6x6
					</label>
				</div>
				<div>
					<p className="BoardSelect-config-header">
						<b>% of Lit Squares</b>
					</p>
					<input type="range" min=".1" max="1" step="0.1" value={litPercentage} onChange={(e) => setLitPercentage(parseFloat(e.target.value))} />
					<output>{(litPercentage * 100).toFixed(0)}%</output>
				</div>
			</div>
			<button className="BoardSelect-button" onClick={handleSubmit}>
				Create Board
			</button>
		</div>
	);
};

export default BoardSelect;
