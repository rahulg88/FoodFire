import React, { useState } from "react";
import "./Atm.css";
const Atm = () => {
  const [balance, setBalance] = useState(0);
  const [enteredPin, setEnteredPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOption, setMenuOption] = useState(null);
  const [message, setMessage] = useState("");
  const PIN = 1234;

  const handlePinChange = (e) => setEnteredPin(e.target.value);

  const checkPin = () => {
    if (parseInt(enteredPin) === PIN) {
      setIsAuthenticated(true);
      setMessage("");
    } else {
      setMessage("Enter a valid pin");
    }
  };

  const handleMenuOption = (option) => {
    setMenuOption(option);
    setMessage("");
  };

  const checkBalance = () => {
    setMessage(`Balance: ${balance}`);
    setMenuOption(null);
  };

  const withdrawMoney = (amount) => {
    if (amount > balance) {
      setMessage("Insufficient balance");
    } else {
      setBalance(balance - amount);
      setMessage("Money withdrawn successfully");
    }
    setMenuOption(null);
  };

  const depositMoney = (amount) => {
    setBalance(balance + amount);
    setMessage("Money deposited successfully");
    setMenuOption(null);
  };

  return (
    <div className="atm-container">
      {!isAuthenticated ? (
        <div className="pin-entry">
          <h2>Enter your pin:</h2>
          <input
            type="password"
            value={enteredPin}
            onChange={handlePinChange}
          />
          <button onClick={checkPin}>Submit</button>
          <p>{message}</p>
        </div>
      ) : (
        <div className="menu">
          <h2>Select Your Choice:</h2>
          <button onClick={() => handleMenuOption(1)}>Check A/C Balance</button>
          <button onClick={() => handleMenuOption(2)}>Withdraw Balance</button>
          <button onClick={() => handleMenuOption(3)}>Deposit Balance</button>
          <button onClick={() => setIsAuthenticated(false)}>Exit</button>
        </div>
      )}

      {menuOption === 1 && checkBalance()}
      {menuOption === 2 && (
        <div className="withdraw">
          <h2>Enter amount to withdraw:</h2>
          <input type="number" id="withdraw-amount" />
          <button
            onClick={() => {
              const amount = parseFloat(
                document.getElementById("withdraw-amount").value
              );
              withdrawMoney(amount);
            }}
          >
            Submit
          </button>
        </div>
      )}
      {menuOption === 3 && (
        <div className="deposit">
          <h2>Enter the amount:</h2>
          <input type="number" id="deposit-amount" />
          <button
            onClick={() => {
              const amount = parseFloat(
                document.getElementById("deposit-amount").value
              );
              depositMoney(amount);
            }}
          >
            Submit
          </button>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Atm;
