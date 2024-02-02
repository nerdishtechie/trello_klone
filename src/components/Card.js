

import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Card = ({ id, text, index }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className="card"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {text}
        </div>
      )}
    </Draggable>
  );
};

export default Card;
