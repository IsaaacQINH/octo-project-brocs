import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const Overlay = () => {
  const [isAvaiable, setAvaiability] = useState(false);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(async () => {
    const res = await fetch("http://localhost:1234");
    //const data = await res.json();

    setAvaiability(res.status === 200);

    console.log(res);
    document.getElementById("checker").textContent = isAvaiable
      ? "Site is reachable"
      : "There was an error";
  }, []);

  return (
    <div>
      <h2>Overlay</h2>
      <p id="checker"></p>
      <Outlet />
    </div>
  );
};

export default Overlay;
