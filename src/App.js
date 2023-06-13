import React from 'react'
import './App.css';
import { CharSheet } from './components/CharSheet';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <CharSheet></CharSheet>
      </section>
    </div>
  );
}

export default App;
