import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import profilepic from "../images/profile.png";
import aboutpic from "../images/aboutpic.png";
const About = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});

  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      setUserData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <>
      <div className="container emp-profile">
        <form method="GET">
          <div className="row">
            <div className="col-md-4">
              <img
                src={userData.name === "harry" ? aboutpic : profilepic}
                alt="profile"
              />
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <h5>{userData.name}</h5>
                <h6>{userData.work}</h6>
                <p className="profile-rating mt-3 mb-5">
                  RANKINGS <span>1/10</span>
                </p>
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a
                      href="#home"
                      id="home-tab"
                      data-toggle="tab"
                      className="nav-link active"
                      role="tab"
                    >
                      About
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="#profile"
                      id="profile-tab"
                      data-toggle="tab"
                      className="nav-link "
                      role="tab"
                    >
                      Timeline
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2">
              <input
                type="submit"
                className="profile-edit-btn"
                name="btnAddMore"
                value="Edit Profile"
              />
            </div>
          </div>

          <div className="row">
            {/* left side url */}
            <div className="col-md-4">
              <div className="profile-work">
                <p>Work Link</p>
                <a href="https://github.com/Prasad4496" target="prasad">
                  github
                </a>
                <br />
                <a href="https://github.com/Prasad4496" target="prasad">
                  youtube
                </a>
                <br />
                <a href="https://github.com/Prasad4496" target="prasad">
                  instagram
                </a>
                <br />
                <a href="https://github.com/Prasad4496" target="prasad">
                  Facebook
                </a>
                <br />
                <a href="https://github.com/Prasad4496" target="prasad">
                  whatsapp
                </a>
                <br />

                <a href="https://github.com/Prasad4496" target="prasad">
                  Linked In
                </a>
                <br />
                <a href="https://github.com/Prasad4496" target="prasad">
                  Twitter
                </a>
                <br />
                <a href="https://github.com/Prasad4496" target="prasad">
                  Telegram
                </a>
                <br />
              </div>
            </div>
            {/* right side data toggel */}
            <div className="col-md-8 pl-5 about-info">
              <div className="tab-content profiel-tab" id="myTabContent">
                <div
                  className="tab-panel fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>user id</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData._id}</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Name</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.name}</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Email</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.email}</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Phone</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.phone}</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Profession</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.work}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default About;
