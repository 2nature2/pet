import { React, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    fetch('/api/main')
      .then(response => response.text())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);
  return (
    <p>{data}</p>
  );
}

export default App;
