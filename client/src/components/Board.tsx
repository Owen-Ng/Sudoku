import React from "react";

interface IProps {
    board: number[][]
}
export const Board: React.FC<IProps> = (props) => {
    const { board } = props;



    return (
        <table>
            <tbody>
                {(board).map(res => {
                    return (
                        <tr key={res[0] + Math.random()}>
                            {res.map(res =>

                                <td key={res + Math.random()}>{res === 0 ? " " : res}</td>
                            )}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );

}