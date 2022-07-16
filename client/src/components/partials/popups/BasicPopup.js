import "./Popup.scss";

function BasicPopup({ trigger, setTrigger, children }) {
  const close = () => {
    setTrigger(false);
  };

  return trigger ? (
    <div>
      <button className="btn-close" onClick={close}>
        <div className="popup">
          <div className="popup-inner">{children}</div>
        </div>
      </button>
    </div>
  ) : null;
}

export default BasicPopup;
