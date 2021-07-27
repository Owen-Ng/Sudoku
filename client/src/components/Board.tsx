
import React from "react";

interface IProps {
    board: number[][],
    solveBoard?: number[][],
    Celebration: React.Dispatch<React.SetStateAction<boolean>>
}
export const Board: React.FC<IProps> = (props) => {
    const { board } = props;
    function ChangeHandler(event: React.ChangeEvent<HTMLInputElement>, key: number[]) {
        const { value } = event.target;
        console.log(typeof parseInt(value, 10))
        if (isNaN(parseInt(value)) || parseInt(value) < 1) {
            event.target.value = "";
        }
        // console.log(key)
        // if (props.solveBoard && props.solveBoard[key[0]][key[1]] === parseInt(value)) {
        //     const cur: HTMLElement = document.getElementById(`[${key[0]},${key[1]}]`) as HTMLElement;
        //     cur.style.backgroundColor = "green";
        // } else {
        //     const cur: HTMLElement = document.getElementById(`[${key[0]},${key[1]}]`) as HTMLElement;
        //     cur.style.backgroundColor = "red";
        // }

    }

    function highlighCheck() {
        let redCount = 0;
        let greenCount = 0;
        [...Array(board.length).keys()].map(row => {
            [...Array(board[row].length).keys()].map(col => {
                const cur: HTMLInputElement = document.getElementById(`[${row},${col}]`) as HTMLInputElement;

                if (cur) {


                    if (props.solveBoard && props.solveBoard[row][col] === parseInt(cur.value)) {
                        cur.style.backgroundColor = "green";
                        greenCount += 1;
                    } else {
                        cur.style.backgroundColor = "red";
                        redCount += 1
                    }

                    setTimeout(function () {
                        cur.style.backgroundColor = "";
                    }, 1000);

                }
            })

        }
        )
        if (redCount === 0 && greenCount > 0) {


            props.Celebration(true);

        }
    }


    return (
        <div>
            <table >
                <tbody>
                    {[...Array(board.length).keys()].map(row => {
                        return (
                            <tr key={row + Math.random()}>
                                {[...Array(board[row].length).keys()].map(col =>

                                    <td key={`[${row},${col}]`}>{board[row][col] === 0 ? <input id={`[${row},${col}]`} type="text" onChange={(event) => ChangeHandler(event, [row, col])}
                                        style={{ width: 10, height: 25 }}
                                        maxLength={1} /> : board[row][col]}</td>
                                )}
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <button onClick={highlighCheck}>Check</button>
        </div>

    );

}