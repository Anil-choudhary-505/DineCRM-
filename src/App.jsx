import { useState } from "react";
import "./App.css";
import Form from "./components/Form";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <nav class="navbar">
        <div class="logo">  
          <img src="public/logo1.png" alt="Logo" />
        </div>
        <ul class="nav-links">
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a href="">About</a>
          </li>
          <li>
            <a href="">Services</a>
          </li>
          <li>
            <a href="">Contact</a>
          </li>
        </ul>
      </nav>
      <Form />
    </div>
  );
}

export default App;
