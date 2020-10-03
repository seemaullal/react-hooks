// Lifting state
// http://localhost:3000/isolated/exercise/03-extra.js

import React from 'react';

function Name() {
  const [name, setName] = React.useState('');
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input
        id="name"
        value={name}
        onChange={event => {
          setName(event.target.value);
        }}
      />
    </div>
  );
}

function FavoriteAnimal({animal, setAnimal}) {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input
        id="animal"
        value={animal}
        onChange={event => setAnimal(event.target.value)}
      />
    </div>
  );
}

function Display({animal}) {
  return <div>{`Your favorite animal is: ${animal}!`}</div>;
}

function App() {
  const [animal, setAnimal] = React.useState('');
  return (
    <form>
      <Name />
      <FavoriteAnimal animal={animal} setAnimal={setAnimal} />
      <Display animal={animal} />
    </form>
  );
}

export default App;
