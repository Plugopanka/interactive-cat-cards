import "./Card.css";
import { useLocation, Link } from "react-router-dom";

function Card({ card, handleCardLike, handleCardDelete, isLiked }) {
  const location = useLocation();

  function onLikeClick() {
    handleCardLike(card);
  }

  function onDeleteClick() {
    handleCardDelete(card);
  }

  return (
    <li className={`card card_location_${location.pathname === "/interactive-cat-cards" ? "catalog" : "card"}`}>
      <Link to={card.id} className={`card__link card__link_location_${location.pathname === "/interactive-cat-cards" ? "catalog" : "card"}`}>
        <img
          src={card.url}
          alt="Изображение с котиком."
          className={`card__image card__image_location_${location.pathname === "/interactive-cat-cards" ? "catalog" : "card"}`}
        />
        <span className={`card__text card__text_location_${location.pathname === "/interactive-cat-cards" ? "catalog" : "card"}`}>{card.text}</span>
      </Link>
      {location.pathname === "/interactive-cat-cards" && (
        <div className="card__button-container">
          <button
            type="button"
            onClick={onLikeClick}
            className={`card__button 
            card__button_state_${isLiked ? "saved" : "save"}
              `}
            aria-label="Поставить лайк"
          ></button>
          <button
            type="button"
            onClick={onDeleteClick}
            className="card__button card__button_state_delete"
            aria-label="Удалить карточку"
          ></button>
        </div>
      )}
    </li>
  );
}

export default Card;
