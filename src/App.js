import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const getRandomNumber = () => {
    return Math.floor(Math.random() * 10 + 1);
  }
  const data = [
    {
      id: 1,
      tittle: "Bayern",
      color: "black",
      textColor: "white",
      value: getRandomNumber(),
      maxValue: 2000,
    },
    {
      id: 2,
      tittle: "Dortmund",
      color: "yellow",
      textColor: "red",
      value: getRandomNumber(),
      maxValue: 4000,
    },
    {
      id: 3,
      tittle: "Zürich",
      color: "blue",
      textColor: "white",
      value: getRandomNumber(),
      maxValue: 3000,
    },
    {
      id: 4,
      tittle: "Bern FC",
      color: "green",
      textColor: "white",
      value: getRandomNumber(),
      maxValue: 1000,
    },
    {
      id: 1,
      tittle: "Fenerbahce",
      color: "purple",
      textColor: "white",
      value: getRandomNumber(),
      maxValue: 500,
    },

  ];



  const setBarDataRandom = () => {
    let data = [...barData];
    data.map((item) => {
      return (item.value += getRandomNumber());
    });
    setBarData(data);
  };



  function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  useEffect(() => {
    const arr = [...barData];
    let timer;
    timer = setInterval(() => {
      arr.forEach((item, index) => {
        if (item.value > item.maxValue) {
          let data = [...barData];
          data.map((item) => {
            return (item.value = item.maxValue);
          });
          setBarData(data);
          clearInterval(timer);
        } else {
          setBarDataRandom();
        }
      });
    }, 1000);
  }, []);

  const [barData, setBarData] = useState(data);
  return (
    <div className="App">
      <h1>
        React BAR Wettbewerb
      </h1>
      {
        barData.sort(compareValues('value', 'desc')).map((item, index) => {
          return <div key={index} className='chart' style={{ backgroundColor: item.color, color: item.textColor, width: item.value >= item.maxValue ? "100%" : (item.value * 100) / item.maxValue + "%", transform: `translateY(${index * 60 + 20 + "px"})`, }}>
            {"der wert vollste " + (index+1) + ". Teilnehmer'in. " + item.tittle + " " + "Teilnehmer punkte " + item.value}
          </div>;
        })
      }
    </div>
  );
}

export default App;
