import React from "react";

const CommonModel = ({ isOpen, onClose, title, content, onConfirm })=>{
    if (!isOpen) return null;
    return(
        <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>{title}</h2>
            <button className="close-button" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">{content}</div>
          <div className="modal-footer">
            <button className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button className="confirm-button" onClick={onConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>    )
}

export default CommonModel;