import React, { Component } from 'react';
import ActionsMenu from './components/ActionsMenu';
import Table from './components/Tabla/Table'
import Modal from './components/Modal';
import { listarEntidad, crearEditarEntidad, eliminarEntidad } from './service';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
class Pagina extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entidades: [],
      objeto: {},
      idObjeto: null,
      method: 'POST',
      columnas: [],
    }
  }

  listar = async () => {
    const { entidad } = this.props;
    const entidades = await listarEntidad({ entidad });
    let columnas = [];
    if (Array.isArray(entidades) && entidades.length > 0) {
      columnas = Object.keys(entidades[0]) || [];
    }
    this.setState({ entidades, columnas })
  };

  manejarInput = (e) => {
    const
      {
        target: { value, name },
      } = e
    let { objeto } = this.state;
    objeto = { ...objeto, [name]: value, }
    this.setState({ objeto })
  }

  crearEntidad = async () => {
    const { entidad } = this.props;
    let { objeto, method, idObjeto } = this.state;
    if (method === 'PUT') {
      await crearEditarEntidad({ entidad, objeto, method, idObjeto });
      this.setState({ method: 'POST' });
    } else if (method === 'POST') {
      await crearEditarEntidad({ entidad, objeto, method });
    }
    this.listar();
  };

  editarEntidad = async (_e, index) => {
    const objeto = { ...this.state.entidades[index] };
    this.setState({ objeto, idObjeto: index, method: 'PUT' }, () => {
    });
  };

  eliminarEntidad = async (_e, index) => {
    const { entidad } = this.props;
    const res = await eliminarEntidad({ entidad, idObjeto: index });
    console.log(res);
    this.listar();
  }

  componentDidMount() {
    this.listar();
  }

  render() {
    const { titulo = "Pagina sin titulo" } = this.props;
    return (
      <div className="container">
        <ActionsMenu titulo={titulo} />
        <Table
          entidades={this.state.entidades}
          editarEntidad={this.editarEntidad}
          eliminarEntidad={this.eliminarEntidad}
          columnas={this.state.columnas} />
        <Modal
          manejarInput={this.manejarInput}
          crearEntidad={this.crearEntidad}
          objeto={this.state.objeto} />
      </div>
    );
  }
}

export default Pagina;
