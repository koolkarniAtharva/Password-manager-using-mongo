import { useState } from "react";
import Navbar from "./components/navbar";
import Manager from "./components/manager";
import Footer from "./components/footer";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <div className="min-h-[85vh]">
      <Manager />
      </div>
      <Footer />

      <div></div>
    </>
  );
}

export default App;
