

import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Card from './Card';

const List = ({ id, title, cards, index, onAddCard, onMoveCard, onDeleteCard }) => {
  const [newCardText, setNewCardText] = useState('');

  const handleAddCard = () => {
    if (newCardText.trim() !== '') {
      onAddCard(id, newCardText);
      setNewCardText('');
    }
  };

  const handleDeleteCard = (cardId) => {
    onDeleteCard(id, cardId);
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div className="list" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <h3>{title}</h3>
          <Droppable droppableId={id} type="CARD">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {cards.map((card, index) => (
                  <Card
                    key={card.id}
                    id={card.id}
                    text={card.text}
                    index={index}
                    onDeleteCard={handleDeleteCard}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className="add-card">
            <input
              type="text"
              placeholder="Enter card text"
              value={newCardText}
              onChange={(e) => setNewCardText(e.target.value)}
            />
            <button onClick={handleAddCard}>Add Card</button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default List;
