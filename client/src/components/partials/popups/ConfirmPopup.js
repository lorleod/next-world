import "./Popup.scss";

function ConfirmPopup({ trigger, setTrigger, handleDeleteConfirm, children }) {
  const close = () => {
    setTrigger(false);
  };
  const confirm = () => {
    setTrigger(false);
    handleDeleteConfirm(true);
  };

  return trigger ? (
    <div>
      <button className="close-btn">
        <div className="popup">
          <div className="popup-inner">
            {children}
            <button className="btn" onClick={close}>
              Close
            </button>
            <button className="btn" onClick={confirm}>
              Confirm
            </button>
          </div>
        </div>
      </button>
    </div>
  ) : null;
}

export default ConfirmPopup;
