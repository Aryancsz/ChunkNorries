import React, { useEffect, useState } from "react";
import axios from "axios";
import uuidv4 from "uuid/v4";

const Selector = () => {
  const [result, setResult] = useState([]);

  //   LOADING THE CATEGORIES FROM API TO CREATE SEPERATE BUTTONS FOR EACH

  useEffect(() => {
    const search = async () => {
      const response = await axios.get(
        "https://api.chucknorris.io/jokes/categories"
      );
      setResult(response.data);
    };
    search();
  }, []);

  //   USE EFFECT TO RENDER WHENEVER UPDATE IS REQUIRED

  const [call, setCall] = useState("");
  const [count, setCount] = useState(0);
  const [val, setVal] = useState("animal");

  useEffect(() => {
    const search = async () => {
      const response = await axios.get(
        "https://api.chucknorris.io/jokes/random?",
        {
          params: {
            // Firest letter to be made lowercase as we have made it upper case to render a button capitalization (string.charAt(0).toLocaleLowerCase() + string.slice(1))
            category: val.charAt(0).toLocaleLowerCase() + val.slice(1),
          },
        }
      );
      setCall(response.data.value);
    };
    search();
  }, [val, count]);

  const renderjoke = (e) => {
    setVal(e.target.innerText);
  };

  //   SETTING COUNT VALUE JUST TO RE-RENDER THE NEW RESULT
  const newClicked = (e) => {
    setCount(count + 1);
  };

  //   MAPPING OVER JSON(ARRAY) TO CREATE SEPERATE BUTTON FOR EACH CATEGORY

  const but = result.map((res) => {
    return (
      <div key={uuidv4()} className="grid ">
        <button className="catButton" onClick={renderjoke}>
          {res.charAt(0).toUpperCase() + res.slice(1)}
        </button>
      </div>
    );
  });

  //   CONVERTING FIRST LETTER TO UPPER CASE

  const conVal = val.charAt(0).toUpperCase() + val.slice(1);

  return (
    <>
      <div className="container">{but}</div>
      <div className="category">Selected Category: {conVal}</div>
      <div className="rendered">{call}</div>
      <div className="newbuttondiv">
        <button onClick={newClicked} className="newbutton">
          New Joke
        </button>
      </div>
    </>
  );
};

export default Selector;
