"use client"
import { ethers } from "ethers";
import { useState } from "react";

function App() {
  // State variables for wallet connection status and address
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");


  async function connectWallet() {
    if (!window.ethereum) {
       console.error("MetaMask not installed or enabled");
       return;
    }
   
    // Toggle connection state
    if (connected) {
       // Disconnect the wallet by updating the state
       setConnected(false);
       setWalletAddress(""); // Clear the wallet address
       alert("Please disconnect from MetaMask through its UI to fully disconnect.");
    } else {
       try {
         // Request accounts from MetaMask
         const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
         if (accounts.length === 0) {
           console.error("No account selected");
           return;
         }
   
         // Create a provider and signer
         const provider = new ethers.providers.Web3Provider(window.ethereum);
         const signer = provider.getSigner();
   
         // Get the wallet address
         const walletAddress = await signer.getAddress();
         console.log("Connected to wallet:", walletAddress);
         // Update state variables
         setConnected(true);
         setWalletAddress(walletAddress);
       } catch (error) {
         if (error.code === 4001) {
           console.error("User rejected request for accounts");
           // Display a message to the user about rejection
         } else {
           console.error("Failed to connect to wallet:", error);
           // Handle other connection errors (e.g., network issues)
           // Display an error message to the user
         }
       }
    }
   }
   
  

  return (
    <div className="app">
      <div className="main">
        <div className="content">
          <button className="btn" onClick={connectWallet}>
            {connected ? "Disconnect Wallet" : "Connect Wallet"}
          </button>
          <h3>Address</h3>
          <h4 className="wal-add">{walletAddress}</h4>
        </div>
      </div>
    </div>
  );
}

export default App;