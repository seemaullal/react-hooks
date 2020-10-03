import React from 'react';

function useLocalStorage(initialValue, localStorageProperty) {
  const [value, setValue] = React.useState(
    () =>
      JSON.parse(window.localStorage.getItem(localStorageProperty)) ||
      initialValue,
  );

  React.useEffect(() => {
    window.localStorage.setItem(localStorageProperty, JSON.stringify(value));
  }, [value, localStorageProperty]);
  return [value, setValue];
}

export default useLocalStorage;
