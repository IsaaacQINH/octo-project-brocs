import { Outlet } from "react-router-dom";
import { useState } from "react";

const Overlay = () => {
  const [isAvaiable, setAvaiability] = useState(false);

  const handleClick = async () => {
    const res = await fetch("http://localhost:1234");
    //const data = await res.json();

    setAvaiability(res.status === 200);

    document.getElementById("checker").textContent = isAvaiable
      ? "Site is reachable"
      : "There was an error";
  }

  return (
    <div>
      <h2>Overlay</h2>
      <p id="checker">None</p>
      <button onClick={handleClick}>Check</button>
      <Outlet />
    </div>
  );
};

export default Overlay;
