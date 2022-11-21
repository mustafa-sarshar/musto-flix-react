// Import Styles
import "./button.scss";

// Create a function component
function Button(props) {
    const className =
        props.btnName === "btnBack"
            ? "btn btn-back"
            : props.btnName === "btnSubmit"
            ? "btn btn-submit"
            : "else";
    return (
        <button type="button" className={className} onClick={props.btnOnClick}>
            {props.btnLabel}
        </button>
    );
}

export { Button };