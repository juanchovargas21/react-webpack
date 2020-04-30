import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Recuperacion from './components/Recuperacion';

class App extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Recuperacion />
    )
  }
}

export default App;
