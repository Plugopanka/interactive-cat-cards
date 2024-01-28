import "./Main.css";
import Filter from "../Filter/Filter";
import CardList from "../CardList/CardList";
import { useState } from "react";

function Main({ cards, setCards, handleCardLike, likedCards }) {
  const [isLiked, setIsLiked] = useState(false);
  const [currentCards, setCurrentCards] = useState(cards);

  function handleCheckboxSwitch() {
    setIsLiked(!isLiked);
    if (!isLiked) {
      setCurrentCards(likedCards);
    } else {
      setCurrentCards(cards);
    }
    setIsLiked(!isLiked);
    localStorage.setItem("isLiked", JSON.stringify(!isLiked));
  }

  function handleCardDelete(card) {
    const cards = JSON.parse(localStorage.getItem("cards"));
    const newCards = cards.filter((el) => {
      return el.id !== card.id;
    });
    console.log(newCards);
    setCards(newCards);
    localStorage.setItem("cards", JSON.stringify(newCards));
    console.log(JSON.parse(localStorage.getItem("cards")));
  }

  return (
    <main className="main">
      <Filter handleCheckboxSwitch={handleCheckboxSwitch} />
      <CardList
        cards={currentCards}
        handleCardDelete={handleCardDelete}
        handleCardLike={handleCardLike}
      />
    </main>
  );
}

export default Main;
