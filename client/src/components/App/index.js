import React, { useEffect, useState } from 'react';
import { DrizzleContext } from '@drizzle/react-plugin';
import { Drizzle } from '@drizzle/store';
import drizzleOptions from '../../drizzleOptions';
import Dapp from '../Dapp';
import './app.scss';

// It instanciate new drizzle object with our drizzleOptions
const drizzle = new Drizzle(drizzleOptions);
// console.log(drizzle);

const App = () => {
  // We create an local state in order to set the current account using react hook useState
  // Learn more at https://fr.reactjs.org/docs/hooks-state.html
  const [currentAccount, setCurrentAccount] = useState('');
  async function getAccount() {
    const accounts = await window.ethereum.enable();
    setCurrentAccount(accounts[0]);
  }
  window.ethereum.on('accountsChanged', () => {
    getAccount();
  });

  // We use another react hook in order to make a new component render each time the currentAccount
  // variable change his value, learn more at https://fr.reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    getAccount();
  }, [currentAccount]);

  // console.log(currentAccount);

  return (
    // Here is native drizzle components who helps to Dapp initialisation
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {(drizzleContext) => {
          const { drizzleState, initialized } = drizzleContext;
          if (!initialized) {
            return 'Loading...';
          }
          return (
            <div className="app">
              <Dapp
                drizzle={drizzle}
                account={currentAccount}
                drizzleState={drizzleState}
              />
            </div>
          );
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
};

export default App;
