import './App.css';
import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css';
import Presupuesto from './pages/Presupuesto'
import Buscador from './pages/Buscador'
import logo from './img/Logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>

        <Navbar className="header">
          <Container >
            <Navbar.Brand href="/Buscador" ><img src={logo} style={{ height: '80px' }} alt="logo" /></Navbar.Brand>
            <Nav className="me-auto">
              <Nav>
                <Link to="/Buscador" className="nav" >
                  <FontAwesomeIcon icon={faSearch} className="icon" />
                  Buscador
                </Link>
              </Nav>
              <Nav>
                <Link to="/Presupuesto" className="nav" >
                  <FontAwesomeIcon icon={faPlus} className="icon" />
                  Presupuestos
                </Link>
              </Nav>
            </Nav>
          </Container>
        </Navbar>

        <Switch>
          <Route path="/Buscador">
            <Buscador />
          </Route>
          <Route path="/Presupuesto">
            <Presupuesto />
          </Route>
          <Route path="/Presupuesto:id">
            <Presupuesto />
          </Route>
        </Switch>

      </Router>
    </div>
  );
}

export default App;
