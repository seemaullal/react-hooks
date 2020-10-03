// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React from 'react';
import useLocalStorage from './02-useLocalStorage';

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorage(initialName, 'name');
  useLocalStorage({a: 33, b: 2, c: 112}, 'obj');
  function handleChange(event) {
    setName(event.target.value);
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  );
}

function App() {
  return <Greeting />;
}

export default App;
