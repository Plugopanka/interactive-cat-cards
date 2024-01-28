import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import CardPage from "./components/CardPage/CardPage";
import imageApi from "./utils/ImageApi";
import factApi from "./utils/FactApi";
import "./App.css";
import "./vendor/normalize.css";
import "./vendor/fonts/fonts.css";

function App() {
  const [cards, setCards] = useState(
    JSON.parse(localStorage.getItem("cards")) || []
  );
  const [likedCards, setLikedCards] = useState(
    JSON.parse(localStorage.getItem("likedCards")) || []
  );

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("cards")));
    if (
      !cards ||
      !JSON.parse(localStorage.getItem("cards")) ||
      JSON.parse(localStorage.getItem("cards")).length == 0
    ) {
      Promise.all([imageApi.getImage(), factApi.getFact()])
        .then(([images, facts]) => {
          let newImageArr = images.splice(0, 5).map((item) => item.url);
          let newIdArr = images.splice(0, 5).map((item) => item.id);
          let newFactArr = facts.map((item) => item.text);
          const newArr = newImageArr.map((x, i) => {
            return { url: x, id: newIdArr[i], text: newFactArr[i] };
          });
          setCards(newArr);
          localStorage.setItem("cards", JSON.stringify(newArr));
          setLikedCards([]);
          localStorage.setItem("likedCards", JSON.stringify([]));
        })
        .catch((err) => {
          console.log(`Ошибка загрузки ${err}`);
        });
    }
  }, []);

  function handleCardLike(card) {
    if (likedCards.length === 0) {
      setLikedCards([card]);
      localStorage.setItem("likedCards", JSON.stringify([card]));
    } else if (likedCards.find((el) => el.id === card.id)) {
      const newLikedCards = likedCards.filter((el) => {
        return el.id !== card.id;
      });
      console.log(newLikedCards);
      setLikedCards(newLikedCards);
      localStorage.setItem("likedCards", JSON.stringify(newLikedCards));
      console.log(JSON.parse(localStorage.getItem("likedCards")));
    } else {
      setLikedCards([card, ...likedCards]);
      localStorage.setItem("likedCards", JSON.stringify([card, ...likedCards]));
      console.log(likedCards);
      console.log(JSON.parse(localStorage.getItem("likedCards")));
    }
  }

  useEffect(() => {
    setLikedCards(likedCards);
  }, [likedCards]);

  return (
    <HelmetProvider>
      <div className="root">
        <Helmet>
          <html lang="en" />
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Cat cards</title>
        </Helmet>
        <div className="page">
          <Header />
          <Routes>
            <Route path="*" element={<Navigate to="/interactive-cat-cards" replace={true} />} />
            <Route
              path="/interactive-cat-cards"
              element={<Main cards={cards} setCards={setCards} handleCardLike={handleCardLike} likedCards={likedCards} />}
            />
            <Route path="/interactive-cat-cards/:id" element={<CardPage cards={cards} />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </HelmetProvider>
  );
}

export default App;
