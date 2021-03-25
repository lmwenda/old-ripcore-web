import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import Show from "../Components/Modal";
import Header from "../Components/Header";
import UserUpdates from "../Components/UserUpdates";
import UserDetails from "../Components/UserDetails";

import { History } from "../Global/history";

import "../Styles/dist/UserSettings.css";

function UserSettings() {
  const [active, setActive] = React.useState(false);
  const [details, setDetails] = React.useState(false);
  const [updates, setUpdates] = React.useState(false);
  const [isAdmin, setAdmin] = React.useState(false);

  axios
    .get(`http://localhost:5000/api/users/user/${localStorage.getItem("_id")}`)
    .then((res) => setAdmin(res.data.isAdmin));

  //   console.log(props);
  const Details = () => {
    setActive(true);
    if (updates) {
      setUpdates(false);
    }
    setDetails(true);
  };

  const Update = () => {
    setActive(true);
    if (details) {
      setDetails(false);
    }
    setUpdates(true);
  };

  const Logout = () => {

    // Removing Marked in User Details - NEEDED TO USE THE WEBSITE

    localStorage.removeItem("token");
    localStorage.removeItem("_id");

    // Redirecting the User

    History.push('/login');
    window.location.reload();
  };

  return (
    <div className="usersettings">
      <header>
        <Header title="RIP Core" />
      </header>

      <div className="usersettings_sidebar">
        <h3>Account Settings</h3>

        <br />
        <hr />
        <br />

        <div>
          <Button onClick={Details} style={{ marginBottom: "5px" }}>
            Account Details
          </Button>

          <Button onClick={Update} style={{ marginBottom: "10px" }}>
            Update Account
          </Button>
          {isAdmin ? (
            <Link to="/admin">
              <Button style={{ marginBottom: "10px", width: "100%" }}>
                Upload Packs
              </Button>
            </Link>
          ) : (
            ""
          )}

          <Button
            variant="secondary"
            onClick={Logout}
            style={{ marginBottom: "5px" }}
          >
            Logout
          </Button>

          <Show />
        </div>
      </div>

      <div className="usersettings_main">
        {active ? (
          details ? (
            <UserDetails />
          ) : updates ? (
            <UserUpdates />
          ) : null
        ) : (
          <div>
            <h1
              style={{
                color: "#000",
                margin: "100px",
                textAlign: "center",
              }}
            >
              Account Settings
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserSettings;
