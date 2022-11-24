// Import Styles
import "./myButton.scss";

// Create a function component
function MyButton(props) {
    return (
        <button type="button" class={props.btnStyle} onClick={props.btnOnClick}>
            {props.btnLabel}
        </button>
    );
}

export { MyButton };
