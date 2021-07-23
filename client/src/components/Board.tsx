import React from "react";

interface IProps {
    board: string[][]
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

                                <td key={res[0] + Math.random()}>{res === "." ? " " : res}</td>
                            )}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );

}