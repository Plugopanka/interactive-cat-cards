import "./CardList.css";
import Card from "../Card/Card";
import { useLocation } from "react-router-dom";

function CardList({
  cards,
  handleCardDelete,
  handleCardLike,
}) {
  const location = useLocation();

  const newCards = JSON.parse(localStorage.getItem("cards"));

  function getLikedCards(card) {
    const likedCards = JSON.parse(localStorage.getItem("likedCards"));
    if (likedCards) {
      return likedCards.find((item) => item.id === card.id);
    }
  }

  return (
    <section className="cards-list">
      {location.pathname === "/" && (
        <ul className="cards-list__list">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              handleCardLike={handleCardLike}
              handleCardDelete={handleCardDelete}
              isLiked={getLikedCards(card)}
            />
          ))}
        </ul>
      )}
      {location.pathname === "/:id" && (
        <>
          <ul className="card-list__list">
            {movies.map((movie) => (
              <MoviesCard
                key={movie._id}
                movie={movie}
                handleMovieDelete={handleMovieDelete}
              />
            ))}
          </ul>
          <button
            type="button"
            className="movies-list__button"
            aria-label="Показать фильмы."
            onClick={addMoreMovies}
          >
            Ещё
          </button>
        </>
      )}
    </section>
  );
}

export default CardList;
