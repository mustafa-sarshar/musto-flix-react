import "./button.scss";

// Create a function component
export function Button(props) {
    const className =
        props.btnName === "btnBack"
            ? "btn-back"
            : props.btnName === "anything"
            ? "anything"
            : "else";
    return (
        <button type="button" className={className} onClick={props.btnOnClick}>
            {props.btnLabel}
        </button>
    );
}
