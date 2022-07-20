import React, { useEffect, useState } from "react";
import background from "../images/background.jpeg";

const Home = () => {
  const [userName, setUserName] = useState("");
  const [show, setShow] = useState(false);

  const userHomePage = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setUserName(data.name);
      setShow(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userHomePage();
  }, []);
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${background}) `,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "100vh",
        }}
      >
        <div className="home-page">
          <div className="home-div">
            <p className="pt-5">WELCOME</p>
            <h1>{userName}</h1>
            <h1>
              {show ? "Happy, to see you back." : "We are the Mern developer."}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
