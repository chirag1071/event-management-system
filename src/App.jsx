import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// User Components
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Event from "./Components/Event/Event";
import Contact from "./Components/Contact/Contact";
import Gallery from "./Components/Gallery/Gallery";
import Account from "./Components/Account/Account";
import MyBooking from "./Components/MyBooking/Mybooking";
import Login from "./Components/Login/Login";
import Cricket from "./Components/Cricket/Cricket";
import Events from "./Components/Events/Events";
import Register from "./Components/Register/Register";

// Admin Components
import AdminHeader from "./admin-panel/Header/adminHeader";
import Sidebar from "./admin-panel/Sidebar/Sidebar";
import UserList from "./admin-panel/UserList/UserList";
import EventPost from "./admin-panel/Eventpost/Eventpost";
import Postcategory from "./admin-panel/Postcategory/Postcategory";
import Galleryes from "./admin-panel/Galleryes/Galleryes";
import Contactlist from "./admin-panel/Contactlist/Contactlist";
import SystemConfig from "./admin-panel/Settings/SystemConfig";
import Security from "./admin-panel/Settings/Security";
import Roles from "./admin-panel/Settings/Roles";
import Dashboard from "./admin-panel/Dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* User Side */}
        <Route
          path="/*"
          element={
            <>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/event" element={<Event />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/account" element={<Account />} />
                <Route path="/mybooking" element={<MyBooking />} />
                <Route path="/cricket" element={<Cricket />} />
                <Route path="/events" element={<Events />} />
              </Routes>
            </>
          }
        />

        {/* Admin Side */}
        <Route
          path="/admin/*"
          element={
            <div className="admin-layout">
              <Sidebar />
              <main className="admin-main">
                <AdminHeader />
                <div className="admin-content">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/eventpost" element={<EventPost />} />
                    <Route path="/postcategory" element={<Postcategory />} />
                    <Route path="/galleryes" element={<Galleryes />} />
                    <Route path="/contactlist" element={<Contactlist />} />
                    <Route path="/settings/system" element={<SystemConfig />} />
                    <Route path="/settings/security" element={<Security />} />
                    <Route path="/settings/roles" element={<Roles />} />
                  </Routes>
                </div>
              </main>
            </div>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
