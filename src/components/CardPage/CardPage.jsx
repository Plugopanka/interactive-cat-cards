import "./CardPage.css";
import Card from "../Card/Card";
import { useParams, Link } from "react-router-dom";

function CardPage({ cards }) {
  const params = useParams();
  const prodId = params.id;

  const foundCard = cards.find(function (el) {
    return el.id === prodId;
  });

  return (
    <main className="card-page">
      <Link to="/" className="card-page__link">
        <button
          type="button"
          className={`card-page__button 
            card-page__button_state_exit
              `}
          aria-label="Вернуться в каталог"
        ></button>
      </Link>
      {foundCard !== undefined && <Card key={foundCard.id} card={foundCard} />}
    </main>
  );
}

export default CardPage;
