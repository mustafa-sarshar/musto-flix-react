// Import Styles
import "./styles.scss";

// Create a function component
function MyButton(props) {
  return (
    <button type="button" className={props.btnStyle} onClick={props.btnOnClick}>
      {props.btnLabel}
    </button>
  );
}

export { MyButton };
