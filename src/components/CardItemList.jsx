import { CardItem } from "./CardItem";
import GameData from "../app.mock";
import { useEffect, useState } from "react";

export const CardItemList = () => {
  const [cardList, setCardList] = useState([...GameData]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [lockCards, setLockCards] = useState(false);
  // const [isCardsSame, setIsCardsSame] = useState(false);
  // const [cardClickIds, setCardClickIds] = useState([]);

  const onClickHandler = (card) => {
    if (card === firstCard) return;
    if (lockCards || card.isOpen) return;

    if (!firstCard) {
      setFirstCard(card);
      setCardList(
        cardList.map((c) => (c.id === card.id ? { ...c, isOpen: true } : c))
      );
      return;
    }
    setSecondCard(card);

    setCardList(
      cardList.map((c) => (c.id === card.id ? { ...c, isOpen: true } : c))
    );
    setLockCards(true);
    if (firstCard.name === card.name) {
      setCardList(
        cardList.map((c) => (c.name === card.name ? { ...c, isOpen: true } : c))
      );
      resetCards();
    } else {
      setTimeout(() => {
        setCardList(
          cardList.map((c) =>
            c.id === card.id || c.id === firstCard.id
              ? { ...c, isOpen: false }
              : c
          )
        );
        resetCards();
      }, 500);
    }
  };
  const resetCards = () => {
    setFirstCard(null);
    setSecondCard(null);
    setLockCards(false);
  };
  // useEffect(() => {
  //   if (cardClickIds.length === 2) {
  //     const cardOneName = cardList.filter(
  //       (card) => cardClickIds[0] === card.id
  //     )[0].name;
  //     const cardTwoName = cardList.filter(
  //       (card) => cardClickIds[1] === card.id
  //     )[0].name;
  //     if (cardOneName == cardTwoName) {
  //       console.log("names are true");
  //       setIsCardsSame(true);
  //     } else {
  //       console.log("names are not equal");
  //       setCardClickIds([]);
  //       setCardList(
  //         cardList.map((card) =>
  //           card.id === cardClickIds[0] ? { ...card, isOpen: false } : card
  //         )
  //       );
  //       console.log(cardList[0], cardList[1]);
  //       setCardList(
  //         cardList.map((card) =>
  //           card.id === cardClickIds[1] ? { ...card, isOpen: false } : card
  //         )
  //       );
  //     }
  //   }
  // }, [cardClickIds]);

  return (
    <div className="card-item-list">
      {cardList.map((item) => {
        return (
          <CardItem
            key={item.id}
            id={item.id}
            image={item.pic}
            onClick={() => onClickHandler(item)}
            isOpen={item.isOpen}
          ></CardItem>
        );
      })}
    </div>
  );
};
