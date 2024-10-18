/* ---------------------------------- Utils --------------------------------- */
import classNames from "classnames";

/* --------------------------------- Images --------------------------------- */
import questionMark from "../../../assets/images/question_mark.png";

/* --------------------------------- Style ---------------------------------- */
import "./Card.scss";

/* -------------------------------------------------------------------------- */
/*                                    Card                                    */
/* -------------------------------------------------------------------------- */
const Card = ({
  onCardClick,
  isFlipped,
  isPaired,
  image,
  index,
}: {
  onCardClick: (index: number) => void;
  isFlipped: boolean;
  isPaired: boolean;
  image: string;
  index: number;
}) => {
  const handleClick = () => {
    if (!isFlipped && !isPaired) {
      onCardClick(index);
    }
  };

  /* --------------------------------- Render; -------------------------------- */
  return (
    <div className={classNames("card-container")} onClick={handleClick}>
      <div
        className={classNames("card-inner", {
          flipped: isFlipped,
          completed: isPaired,
        })}
      >
        <div className="card-front card-content">
          <img alt="question mark" src={questionMark} />
        </div>
        <div className="card-back card-content">
          <img alt="card face" src={image} />
        </div>
      </div>
    </div>
  );
};

export default Card;
