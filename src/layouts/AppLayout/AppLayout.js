import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import AppLayoutCSS from "./AppLayout.module.css";

function AppLayout() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      {/* Makes sure page content spans at least the entire viewport */}
      <div className={AppLayoutCSS["page-content-container"]}>
        <Outlet />
      </div>
      {location.pathname.includes("/messages") || <Footer />}
    </>
  );
}

export default AppLayout;
