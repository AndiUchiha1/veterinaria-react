import React, { Component } from 'react';
import Nav from './components/Nav';
import ActionsMenu from './components/ActionsMenu';
import Table from './components/Tabla/Table'
import Modal from './components/Modal';
import { listarEntidad, crearEditarEntidad } from './service';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
class Pagina extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entidades: [],
      objeto: {},
    }
  }

  listar = async () => {
    const { entidad } = this.props;
    const entidades = await listarEntidad({ entidad });
    this.setState({ entidades })
  };

  manejarInput = (e) => {

    console.log(e.target.value);
  }

  crearEditarEntidad() {

  }

  componentDidMount() {
    this.listar();
  }

  render() {
    const { titulo = "Pagina si titulo" } = this.props;
    return (
      <div className="container">
        <Nav />
        <ActionsMenu titulo={titulo} />
        <Table entidades={this.state.entidades} />
        <Modal manejarInput={this.manejarInput} />
      </div>
    );
  }
}

export default Pagina;
