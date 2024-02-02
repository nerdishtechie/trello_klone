

import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import List from './List';

const Board = () => {
  const [lists, setLists] = useState([
    { id: '1', title: 'To-Do', cards: [] },
    { id: '2', title: 'In Progress', cards: [] },
    { id: '3', title: 'Done', cards: [] },
  ]);

  const onDragEnd = (result) => {
  
  };

  const onAddCard = (listId, cardContent) => {
    const updatedLists = lists.map((list) =>
      list.id === listId
        ? {
            ...list,
            cards: [...list.cards, { id: Math.random().toString(), text: cardContent }],
          }
        : list
    );
    setLists(updatedLists);
  };

  const onMoveCard = (sourceListId, destinationListId, cardIndex) => {
    const updatedLists = [...lists];
    const sourceList = updatedLists.find((list) => list.id === sourceListId);
    const destinationList = updatedLists.find((list) => list.id === destinationListId);
    const movedCard = sourceList.cards[cardIndex];

    sourceList.cards.splice(cardIndex, 1);
    destinationList.cards.push(movedCard);

    setLists(updatedLists);
  };

  const onDeleteCard = (listId, cardId) => {
    const updatedLists = lists.map((list) =>
      list.id === listId
        ? {
            ...list,
            cards: list.cards.filter((card) => card.id !== cardId),
          }
        : list
    );
    setLists(updatedLists);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" direction="horizontal">
        {(provided) => (
          <div className="board" ref={provided.innerRef} {...provided.droppableProps}>
            {lists.map((list, index) => (
              <List
                key={list.id}
                id={list.id}
                title={list.title}
                cards={list.cards}
                index={index}
                onAddCard={(content) => onAddCard(list.id, content)}
                onMoveCard={(sourceListId, destinationListId, cardIndex) =>
                  onMoveCard(sourceListId, destinationListId, cardIndex)
                }
                onDeleteCard={(cardId) => onDeleteCard(list.id, cardId)}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
