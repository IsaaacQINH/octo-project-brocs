import { Outlet } from "react-router-dom";

const Overlay = () => {
  return (
    <div>
      <h2>Overlay</h2>
      <Outlet />
    </div>
  );
};

export default Overlay;
