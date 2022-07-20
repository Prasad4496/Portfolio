import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// import icon from "../images/iphone.png";
const Contact = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const userContact = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setUserData({
        ...userData,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });

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
    userContact();
  }, []);

  // we are storing data in states
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // send the data to the backend
  const contactForm = async (e) => {
    e.preventDefault();

    const { name, email, phone, message } = userData;
    const res = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
      }),
    });

    const data = await res.json();
    if (!data) {
      console.log("message not send");
    } else {
      alert("Message send");
      setUserData({ ...userData, message: "" });
    }
  };

  return (
    <>
      {/* <div className="contact_info">
        <div className="container-fluid-row">
          <div className="row">
            <div className="col-sm d-flex ">
              <div className="contact_info_item d-flex justify-content-start align-item-center">
                <img src={icon} alt="email" />
                <div className="contact_info_content">
                  <div className="contact_info_title">phone</div>
                  <div className="contact_info_title">14879987</div>
                </div>
              </div>
              <div className="contact_info_item d-flex justify-content-start align-item-center">
                <img src={icon} alt="address" />
                <div className="contact_info_content">
                  <div className="contact_info_title">email</div>
                  <div className="contact_info_title">prasad @gmail.com</div>
                </div>
              </div>
              <div className="contact_info_item d-flex justify-content-start align-item-center">
                <img src={icon} alt="address" />
                <div className="contact_info_content">
                  <div className="contact_info_title">address</div>
                  <div className="contact_info_title">Mumbai, Maharashtra.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* contact-form */}

      <div className="contact_form">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="contact_form_container py-5 ">
                <div className="contact_form_title ">Get in Touch</div>
                <form method="POST" id="contact_form">
                  <div className="contact_form_name d-flex justify-content-between align-items-between mt-3">
                    <div className="row ">
                      <div className="col-sm">
                        <input
                          type="text"
                          id="contact_form_name"
                          className="contact_form_name input_field"
                          name="name"
                          value={userData.name}
                          onChange={handleInputs}
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div className="col-sm ">
                        <input
                          type="email"
                          id="contact_form_email"
                          className="contact_form_email input_field"
                          name="email"
                          value={userData.email}
                          onChange={handleInputs}
                          placeholder="Your email"
                          required
                        />
                      </div>
                      <div className="col-sm">
                        <input
                          type="phone"
                          id="contact_form_phone"
                          className="contact_form_phone input_field"
                          name="message"
                          value={userData.phone}
                          onChange={handleInputs}
                          placeholder="Your Phone number"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="contact_form_text  mt-4">
                    <textarea
                      className=" text_field contact_form_message form-control"
                      name="message"
                      value={userData.message}
                      onChange={handleInputs}
                      placeholder="Leave a message here"
                      required
                    ></textarea>
                  </div>
                  <div className="contact_form_button">
                    <button
                      type="submit"
                      className="button contact_submit_button"
                      onClick={contactForm}
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
