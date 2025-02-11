import "./style.css";
import { useState } from "react";
import axios from "axios";
import Popup from "./Popup";
/* 
-> formData → Stores all the user input fields.
-> setFormData → Updates the input values when the user types.
-> fullname, contact, email, etc. → Store the values typed by the user.
-> visitTime → Stores multiple selected checkboxes in an array.
*/
const Form = () => {
  // for popup content
  const [showPopup, setShowPopup] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    contact: "",
    email: "",
    gender: "",
    diet: "",
    birthday: "",
    visitTime: [],
    feedback: "",
  });

  const [message, setMessage] = useState(""); // State to show response message

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        visitTime: checked
          ? [...prev.visitTime, value]
          : prev.visitTime.filter((time) => time !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/submit-form", formData);
      console.log(formData);
      setShowPopup(true);
      setMessage(response.data.message); // Show success message
      setFormData({
        fullname: "",
        contact: "",
        email: "",
        gender: "",
        diet: "",
        birthday: "",
        visitTime: [],
        feedback: "",
      }); // Reset form after submission
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Failed to submit form. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>Scan, Fill, Enjoy 🎉</h1>
      <p className="subtitle">A Delicious Surprise is Waiting for You</p>

      <form id="customerForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullname">Full Name</label>
          <input
            required
            type="text"
            id="fullname"
            name="fullname"
            placeholder="Enter your full name"
            value={formData.fullname}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact">Contact Number</label>
          <input
            required
            type="tel"
            id="contact"
            name="contact"
            placeholder="Enter your phone number"
            value={formData.contact}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            required
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group radio-group">
          <label className="group-label">Gender</label>
          <div className="radio-options">
            <div className="radio-item">
              <input
                required
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
              />
              <label htmlFor="male">Male</label>
            </div>
            <div className="radio-item">
              <input
                required
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="diet">Dietary Preferences</label>
          <select
            id="diet"
            name="diet"
            value={formData.diet}
            onChange={handleChange}
            required
          >
            <option value="">Select your preference</option>
            <option value="veg">Vegetarian</option>
            <option value="non-veg">Non-Vegetarian</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="birthday">Birthday</label>
          <input
            required
            type="date"
            id="birthday"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
          />
        </div>

        <div className="form-group checkbox-group">
          <label className="group-label">Preferred Visit Time</label>
          <div className="checkbox-options">
            {["lunch", "dinner", "weekend"].map((time) => (
              <div key={time} className="checkbox-item">
                <input
                  type="checkbox"
                  id={time}
                  name="visitTime"
                  value={time}
                  checked={formData.visitTime.includes(time)}
                  onChange={handleChange}
                />
                <label htmlFor={time}>
                  {time.charAt(0).toUpperCase() + time.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="feedback">Your Feedback</label>
          <textarea
            id="feedback"
            name="feedback"
            placeholder="Please share your thoughts with us..."
            value={formData.feedback}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {message && <div className="message">{message}</div>}

        <button type="submit">Submit Form</button>
      </form>
      <Popup
        show={showPopup}
        onClose={() => setShowPopup(false)}
        message="Your Free Ice-Cream is on the way! 🍨"
      />
    </div>
  );
};

export default Form;
