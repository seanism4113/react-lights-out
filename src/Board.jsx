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

/** Game board of Lights Out. */
const Board = ({ nrows = 5, ncols = 5, litChance = 0.5 }) => {
	const createBoard = () => Array.from({ length: nrows }, () => Array.from({ length: ncols }, () => Math.random() < litChance));

	const [board, setBoard] = useState(createBoard());
	const [moves, setMoves] = useState(0);

	/** Check if the player has won */
	const hasWon = () => board.every((row) => row.every((cell) => !cell));

	/** Flip a single cell's state */
	const flipCell = (y, x, boardCopy) => {
		if (y >= 0 && y < nrows && x >= 0 && x < ncols) {
			boardCopy[y][x] = !boardCopy[y][x];
		}
	};

	/** Flip cells around a given coordinate */
	const flipCellsAround = (coord) => {
		const [y, x] = coord.split("-").map(Number);
		setBoard((oldBoard) => {
			const boardCopy = oldBoard.map((row) => [...row]);
			flipCell(y, x, boardCopy);
			flipCell(y - 1, x, boardCopy);
			flipCell(y + 1, x, boardCopy);
			flipCell(y, x - 1, boardCopy);
			flipCell(y, x + 1, boardCopy);
			return boardCopy;
		});
		setMoves((prev) => prev + 1);
	};

	/** Render the board as a table of cells */
	const renderBoard = () =>
		board.map((row, y) => (
			<tr key={y}>
				{row.map((cell, x) => {
					const coord = `${y}-${x}`;
					return <Cell key={coord} isLit={cell} flipCellsAroundMe={() => flipCellsAround(coord)} />;
				})}
			</tr>
		));

	return hasWon() ? (
		<div className="Board Board-won">
			<h2>Congratulations! You won in {moves} moves!</h2>
			<img src={winImage} alt="You win!" className="Board-win-image" />
		</div>
	) : (
		<div className="Board">
			<table className="Board-table">
				<tbody>{renderBoard()}</tbody>
			</table>
			<p className="Board-moves">Moves: {moves}</p>
		</div>
	);
};

export default Board;
