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
  const [state, setState] = React.useState({
    pokemon: null,
    status: 'idle',
    error: null,
  });
  React.useEffect(() => {
    setState({status: 'idle'});
    if (!pokemonName) {
      return;
    }
    setState({status: 'pending'});
    fetchPokemon(pokemonName)
      .then(pokemonData => {
        setState({pokemon: pokemonData, status: 'resolved'});
      })
      .catch(error => {
        setState({error, status: 'rejected'});
      });
  }, [pokemonName]);
  if (state.status === 'rejected') {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{state.error.message}</pre>
      </div>
    );
  } else if (state.status === 'idle') {
    return 'Submit a pokemon';
  } else if (state.status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />;
  } else if (state.status === 'resolved') {
    return <PokemonDataView pokemon={state.pokemon} />;
  } else {
    throw new Error('unexpected status');
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
