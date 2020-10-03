// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React from 'react';
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
  PokemonForm,
} from '../pokemon';

function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = React.useState(null);
  const [status, setStatus] = React.useState('idle');
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    setStatus('idle');
    if (!pokemonName) {
      return;
    }
    setStatus('pending');
    fetchPokemon(pokemonName)
      .then(pokemonData => {
        setPokemon(pokemonData);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [pokemonName]);
  if (status === 'rejected') {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    );
  } else if (status === 'idle') {
    return 'Submit a pokemon';
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />;
  } else {
    return <PokemonDataView pokemon={pokemon} />;
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('');

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  );
}

export default App;
