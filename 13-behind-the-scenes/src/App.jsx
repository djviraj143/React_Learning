import { useState } from 'react';

import Counter from './components/Counter/Counter.jsx';
import Header from './components/Header.jsx';
import ConfigureCounter from './components/Counter/ConfigureCounter.jsx';
import { log } from './log.js';

function App() {
  log('<App /> rendered');

  const [chosenCount, setChosenCount] = useState(0);

  function handleSetCount(newCount) {
    // setChosenCount(newCount);
    // setChosenCount((prevCount) => prevCount + 1);
    setChosenCount((prevCount) => {
      if (prevCount === newCount) {
        return prevCount;
      }
      return newCount;
    });
    console.log('Count set to:', newCount, chosenCount);
  }

  return (
    <>
      <Header />
      <main>
        <ConfigureCounter onSetCount={handleSetCount} />
        <Counter key={chosenCount} initialCount={chosenCount} />
        <Counter initialCount={0} />
      </main>
    </>
  );
}

export default App;
