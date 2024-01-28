import "./Filter.css";

function FilterCheckbox({ isLiked, handleCheckboxSwitch }) {
  return (
    <label className="filter">
      <input
        className="filter__checkbox"
        type="checkbox"
        checked={isLiked}
        onChange={handleCheckboxSwitch}
      />
      <div className="filter__tumbler"></div>
      <span className="filter__text">Favorite</span>
    </label>
  );
}

export default FilterCheckbox;
