import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

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
function randomSwitch() {
	return Math.round(Math.random()) === 1;
}

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn }) {
	const [board, setBoard] = useState(createBoard());

	/** create a board nrows high/ncols wide, each cell randomly lit or unlit */
	function createBoard() {
		let initialBoard = [];
		// TODO: create array-of-arrays of true/false values
		for (let i = 0; i < nrows; i++) {
			const row = [];
			initialBoard.push(row);
			for (let j = 0; j < ncols; j++) {
				row.push(randomSwitch());
			}
		}
		return initialBoard;
	}

	function hasWon() {
		// TODO: check the board in state to determine whether the player has won.
		for (let i = 0; i < nrows; i++) {
			for (let j = 0; j < ncols; j++) {
				if (board[i][j]) return false;
			}
		}
		return true;
	}

	function flipCellsAround(coord) {
		setBoard((oldBoard) => {
			const [y, x] = coord.split("-").map(Number);

			const flipCell = (y, x, boardCopy) => {
				// if this coord is actually on board, flip it

				if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
					console.log(`${y}-${x}`);
					console.log(boardCopy);
					boardCopy[y][x] = !boardCopy[y][x];
					console.log(boardCopy);
				}
			};

			// TODO: Make a (deep) copy of the oldBoard
			const copyBoard = [...oldBoard];
			// TODO: in the copy, flip this cell and the cells around it
			flipCell(y, x, copyBoard);
			flipCell(y - 1, x, copyBoard);
			flipCell(y + 1, x, copyBoard);
			flipCell(y, x + 1, copyBoard);
			flipCell(y, x - 1, copyBoard);
			// TODO: return the copy
			return copyBoard;
		});
	}
	return (
		<div className="Board">
			{/* if the game is won, just show a winning msg & render nothing else //
			TODO */}
			<h2>{hasWon() ? "You Won!!!" : ""}</h2>
			{/* // make table board // TODO */}
			<table>
				<tbody>
					{board.map((row, idx) => (
						<tr key={idx}>
							{row.map((col, idx1) => (
								<Cell
									key={`${idx1}-${idx}`}
									flipCellsAroundMe={() => flipCellsAround(`${idx}-${idx1}`)}
									isLit={board[idx][idx1]}
								/>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Board;
