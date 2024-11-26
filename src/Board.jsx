import { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import winImage from "./winner.avif";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

const Board = ({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.5 }) => {
	/** create a board nrows high/ncols wide, each cell randomly lit or unlit */
	const createBoard = () => {
		let initialBoard = [];
		for (let i = 0; i < nrows; i++) {
			let row = [];
			for (let j = 0; j < ncols; j++) {
				row.push(Math.random() < chanceLightStartsOn);
			}
			initialBoard.push(row);
		}
		return initialBoard;
	};

	const [board, setBoard] = useState(createBoard());
	const [moves, setMoves] = useState(0);

	const hasWon = () => {
		const hasLights = board.some((row) => row.some((cell) => cell === true));
		return hasLights === false ? true : false;
	};

	const wonHtml = () => {
		return (
			<>
				<h2> Congratulations! You won Lights Out in {moves} moves! </h2>
				<img className="Board-win-image" src={winImage} alt="win image" />
			</>
		);
	};

	const flipCellsAround = (coord) => {
		setBoard((oldBoard) => {
			const [y, x] = coord.split("-").map(Number);

			const flipCell = (y, x, boardCopy) => {
				// if this coord is actually on board, flip it

				if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
					boardCopy[y][x] = !boardCopy[y][x];
				}
			};

			const boardCopy = oldBoard.map((row) => [...row]);

			flipCell(y, x, boardCopy);
			flipCell(y - 1, x, boardCopy);
			flipCell(y + 1, x, boardCopy);
			flipCell(y, x + 1, boardCopy);
			flipCell(y, x - 1, boardCopy);
			setMoves(moves + 1);
			return boardCopy;
		});
	};

	const boardHtml = () => {
		return (
			<>
				<table className="Board-table">
					<tbody className="Board-body">
						{board.map((row, rowIndex) => (
							<tr key={rowIndex}>
								{row.map((cell, cellIndex) => {
									const cellCoord = `${rowIndex}-${cellIndex}`;
									return <Cell isLit={cell} key={cellCoord} flipCellsAroundMe={() => flipCellsAround(cellCoord)} />;
								})}
							</tr>
						))}
					</tbody>
				</table>
				<span className="Board-moves">
					<b>Moves: </b>
					{moves}
				</span>
			</>
		);
	};

	// if the game is won, just show a winning msg & render nothing else

	return hasWon() ? wonHtml() : boardHtml();
};

export default Board;
