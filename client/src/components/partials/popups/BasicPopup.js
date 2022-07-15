import "./Popup.scss";

function BasicPopup(props) {
  const close = () => {
    props.setTrigger(false);
  };

  return props.trigger ? (
    <div>
      <button className="close-btn" onClick={close}>
        <div className="popup">
          <div className="popup-inner">{props.children}</div>
        </div>
      </button>
    </div>
  ) : null;
}

export default BasicPopup;
