/* eslint-disable no-undef */
import React from "react";

const BoardCell = ({ cells, cellIndex, handleClick }) => {
    console.log('render child')

  return (
    <button className="board-cell" onClick={() => handleClick(cellIndex)}>
      {cells[cellIndex]}
    </button>
  );
};

export default BoardCell;
