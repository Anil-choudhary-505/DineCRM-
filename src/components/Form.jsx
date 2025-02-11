import "./style.css";
import { useState } from "react";
import axios from "axios";
/* 
-> formData → Stores all the user input fields.
-> setFormData → Updates the input values when the user types.
-> fullname, contact, email, etc. → Store the values typed by the user.
-> visitTime → Stores multiple selected checkboxes in an array.
*/
const Form = () => {
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
      <h1>Scan, Fill, Enjoy 🎉 A Delicious Surprise is Waiting for You</h1>
      <form id="customerForm" onSubmit={handleSubmit}>
        <label htmlFor="fullname">Name</label>
        <input
          required
          type="text"
          id="fullname"
          name="fullname"
          placeholder="Enter Full Name"
          value={formData.fullname}
          onChange={handleChange}
        />

        <label htmlFor="contact">Contact</label>
        <input
          required
          type="tel"
          id="contact"
          name="contact"
          placeholder="Enter Phone Number"
          value={formData.contact}
          onChange={handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          required
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label>Gender</label>
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
        <label htmlFor="diet">Dietary Preferences</label>
        <select
          id="diet"
          name="diet"
          value={formData.diet}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="veg">Veg</option>
          <option value="non-veg">Non-Veg</option>
        </select>

        <label htmlFor="birthday">Birthday</label>
        <input
          required
          type="date"
          id="birthday"
          name="birthday"
          value={formData.birthday}
          onChange={handleChange}
        />

        <label>Preferred Visit Time:</label>
        <input
          type="checkbox"
          id="lunch"
          name="visitTime"
          value="lunch"
          checked={formData.visitTime.includes("lunch")}
          onChange={handleChange}
        />
        <label htmlFor="lunch">Lunch</label>

        <input
          type="checkbox"
          id="dinner"
          name="visitTime"
          value="dinner"
          checked={formData.visitTime.includes("dinner")}
          onChange={handleChange}
        />
        <label htmlFor="dinner">Dinner</label>

        <input
          type="checkbox"
          id="weekend"
          name="visitTime"
          value="weekend"
          checked={formData.visitTime.includes("weekend")}
          onChange={handleChange}
        />
        <label htmlFor="weekend">Weekend</label>
        <label htmlFor="feedback">Your Feedback</label>
        <textarea
          id="feedback"
          name="feedback"
          placeholder="Write your feedback here..."
          value={formData.feedback}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default Form;
