import * as React from 'react';
import './App.scss';
import Game from './components/game/index';

export interface AppProps {}
 
export interface AppState {}
 
class App extends React.Component<AppProps, AppState> {
  state = {}

  render() { 
    return <Game></Game>;
  }
}
 
export default App;