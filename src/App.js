import Modal from "react-modal";
import { Route, Routes } from "react-router";
import "./App.css";
import { PrivateRoutes } from "./features/auth";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";

// Library CSS files
import "react-loading-skeleton/dist/skeleton.css";
import "swiper/css";
import AppLayout from "./layouts/AppLayout/AppLayout";
import Listing from "./pages/Listing/Listing";

// Swiper register
import { ToastContainer } from "react-toastify";
import { register } from "swiper/element/bundle";
import EditListingRoute from "./features/auth/components/EditListingRoute/EditListingRoute";
import CreateListing from "./pages/CreateListing/CreateListing";
import EditListing from "./pages/EditListing/EditListing";
import Messages from "./pages/Messages/Messages";
import Profile from "./pages/Profile/Profile";

function App() {
  // Registers Swiper custom elements (carousel)
  register();

  return (
    <div id="#root">
      {/* For react toastify */}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<AppLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/listing/:listingId" element={<Listing />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/create-listing" element={<CreateListing />} />
            <Route path="/messages" element={<Messages />} />
            <Route element={<EditListingRoute />}>
              <Route
                path="/edit-listing/:listingId"
                element={<EditListing />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

// Necessary for react-modal
Modal.setAppElement("#root");

export default App;
