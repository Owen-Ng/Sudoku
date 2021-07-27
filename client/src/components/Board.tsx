
import React from "react";

interface IProps {
    board: number[][],
    setValue: (row: number, col: number, val: number) => void,
    Wrongs?: number[][],
    Goods?: number[][],
    updateboard?: number[][]
}
export const Board: React.FC<IProps> = (props) => {
    const { board } = props;
    function ChangeHandler(event: React.ChangeEvent<HTMLInputElement>, key: number[]) {
        const { value } = event.target;
        console.log(typeof parseInt(value, 10))
        if (isNaN(parseInt(value)) || parseInt(value) < 1) {
            event.target.value = "";
        }
        else {
            props.setValue(key[0], key[1], parseInt(value, 10))
        }
    }

    function CheckWrong(row: number, col: number): any {
        // console.log(props.Wrongs)
        if (props.Wrongs) {
            for (let i = 0; i < props.Wrongs.length; i++) {
                if (JSON.stringify(props.Wrongs[i]) === JSON.stringify([row, col])) {
                    return true
                }

            }
        }

        return false
    }

    function CheckGood(row: number, col: number): any {
        // console.log(props.Wrongs)
        if (props.Goods) {
            for (let i = 0; i < props.Goods.length; i++) {
                if (JSON.stringify(props.Goods[i]) === JSON.stringify([row, col])) {
                    return true
                }

            }
        }

        return false
    }

    console.log(CheckWrong(0, 0))
    return (
        <table>
            <tbody>
                {[...Array(board.length).keys()].map(row => {
                    return (
                        <tr key={row + Math.random()}>
                            {[...Array(board[row].length).keys()].map(col =>

                                <td key={`[${row},${col}]`}>{board[row][col] === 0 || CheckWrong(row, col) || CheckGood(row, col) ? <input type="text" onChange={(event) => ChangeHandler(event, [row, col])}
                                    style={CheckWrong(row, col) ? { width: 10, height: 25, backgroundColor: "red" } : CheckGood(row, col) ? { width: 10, height: 25, backgroundColor: "green" } : { width: 10, height: 25 }}
                                    maxLength={1} /> : board[row][col]}</td>
                            )}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );

}