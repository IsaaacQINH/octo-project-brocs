import { Outlet } from "react-router-dom";

const Website = () => {
  return (
    <div>
      <h2>BROCS</h2>
      <Outlet />
    </div>
  );
};

export default Website;
