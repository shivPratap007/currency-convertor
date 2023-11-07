import Input from "./components/input";
import { GoArrowSwitch } from "react-icons/go";
import { useEffect, useState } from "react";
function App() {
  const [label, setLabel] = useState(true);
  const [country, setCountry] = useState([]);
  let [from, setFrom] = useState("");
  let [to, setTo] = useState("");
  const [fromval, setFromval] = useState("");
  const [toval, setToval] = useState("");
  const [exchange, setExchang] = useState("");

  // https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/jpy.json
  // https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json

  useEffect(() => {
    fetch(
      "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json"
    )
      .then((res) => res.json())
      .then((res) => {
        let newArr = Object.keys(res);
        newArr.splice(0, 2);
        setCountry(newArr);
      });
  }, []);

  useEffect(() => {
    (label
      ? fetch(
          ` https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}/${to}.json`
        )
      : fetch(
          ` https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${to}/${from}.json`
        )
    )
      .then((res) => res.json())
      .then((rs) => {
        console.log(rs);
        console.log(fromval, toval);
        let conversionValue = Object.keys(rs);
        const Price = fromval * parseFloat(rs[conversionValue[1]]);
        console.log(Price);
        setToval(Price);
      });
  }, [to, from, fromval, toval, label]);

  const swap = () => {
    setLabel(!label);
  };

  console.log(
    ` https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}/${to}.json`
  );
  console.log(label);

  return (
    <>
      <h1 className="text-center" style={{ fontSize: "40px" }}>
        Currency Convertor
      </h1>
      <div className="flex justify-center align-middle">
        <Input
          label={label ? "From" : "To"}
          country={country}
          setter={label ? setFrom : setTo}
          val={setFromval}
          read={!label}
          data={label ? fromval : toval}
        />
      </div>
      <div className="text-center flex justify-center align-middle m-5 text-2xl">
        <button className="border p-3 rounded-md">
          <GoArrowSwitch onClick={swap} />
        </button>
      </div>
      <div className="flex justify-center align-middle">
        <Input
          label={label ? "To" : "From"}
          country={country}
          setter={label ? setTo : setFrom}
          val={setFromval}
          read={label}
          data={label ? toval : fromval}
        />
      </div>
    </>
  );
}

export default App;
