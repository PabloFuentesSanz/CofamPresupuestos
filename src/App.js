import './App.css';
import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css';
import NuevoPresupuesto from './pages/NuevoPresupuesto'
import Buscador from './pages/Buscador'
import NuevoTrabajo from './pages/NuevoTrabajo'
import logo from './img/Logo.png'
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
            <Navbar.Brand href="/" ><img src={logo} style={{ height: '125px' }} alt="logo" /></Navbar.Brand>
            <Nav className="me-auto">
              <Nav><Link to="/Buscador" className="nav" >Buscador</Link></Nav>
              <Nav><Link to="/NuevoPresupuesto" className="nav" >Presupuestos</Link></Nav>
              <Nav><Link to="/NuevoTrabajo" className="nav" >Trabajos</Link></Nav>
            </Nav>
          </Container>
        </Navbar>

        <Switch>
          <Route path="/Buscador">
            <Buscador />
          </Route>
          <Route path="/NuevoPresupuesto">
            <NuevoPresupuesto />
          </Route>
          <Route path="/NuevoTrabajo">
            <NuevoTrabajo />
          </Route>

        </Switch>

      </Router>
    </div>
  );
}

export default App;
