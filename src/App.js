import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Validacion from "./components/Validacion";
import Depurados from './components/Depurados';

class App extends React.Component {

  constructor() {
    super()
    userContext._auth = null;
  }

  render() {
    return (
      <BrowserRouter basename='/frontend/'>
        <Switch>
          <Route path="/validacion">
            <Validacion />
          </Route>
          <Route path="/depurados">
            <Depurados />
          </Route>
          <Route path="*">
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

export const userContext = React.createContext()
export default App;
