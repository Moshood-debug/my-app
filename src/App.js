import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const api = "https://api.adviceslip.com/advice";

  const [advice, setAdvice] = useState({});
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  function fetchData() {
    setIsLoading(true); // Set loading to true when fetching starts
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        setAdvice(data.slip);
        setIsLoading(false); // Set loading to false when fetching completes
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set loading to false in case of error
      });
  }

  useEffect(() => {
    fetchData();
  }, []);
  console.log(advice);

  return (
    <div className="App flex justify-center items-center h-screen ">
      <div className="bg-darkGrayishBlue p-8 flex flex-col justify-center items-center rounded-xl w-96 max-w-screen-md">
        <div className="text-neonGreen text-center tracking-wide	leading-tight mb-3">
          Advice #<span>{advice.id}</span>
        </div>
        <h1 className="font-extrabold text-2xl text-lightCyan text-center break-all text-pretty">
          "{advice.advice}"
        </h1>

        <span className="divider"></span>
        <button
          className="bg-neonGreen rounded-full h-10 w-10 -mb-12 p-2 text-center  active:scale-90"
          onClick={() => fetchData()}
          disabled={isLoading} // Disable button when data is being fetched
        >
          <img
            className={"text-center " + (isLoading ? "animate-spin" : "")} // Conditionally apply animate-spin class
            src="/images/icon-dice.svg"
            alt=""
          />
        </button>
      </div>
    </div>
  );
}

export default App;
