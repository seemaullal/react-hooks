// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
  PokemonForm,
} from '../pokemon';

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    pokemon: null,
    status: pokemonName ? 'pending' : 'idle',
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
    throw state.error;
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

function PokemonInfoError({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('');

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  const handleReset = () => setPokemonName('');

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary
          FallbackComponent={PokemonInfoError}
          onReset={handleReset}
          resetKeys={[pokemonName]}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
