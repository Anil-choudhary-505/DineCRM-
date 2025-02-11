import "./popup.css";

const Popup = ({ show, onClose, message }) => {
  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-header">
          <h2>🍦 Congratulations! 🎉</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="popup-body">
          <p>{message}</p>
          <img 
            src="/public/ice-cream.gif" 
            alt="Ice Cream"
            className="popup-image" 
          />
        </div>
      </div>
    </div>
  );
};

export default Popup;