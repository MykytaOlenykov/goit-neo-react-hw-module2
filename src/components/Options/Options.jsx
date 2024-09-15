import PropTypes from "prop-types";
import css from "./Options.module.css";

export default function Options({ options, updateFeedback }) {
  return (
    <ul className={css.list}>
      {options.map((option) => {
        return (
          <li key={option}>
            <button
              className={css.button}
              type="button"
              onClick={() => updateFeedback(option)}
            >
              {option}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

Options.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string.isRequired),
  updateFeedback: PropTypes.func.isRequired,
};
