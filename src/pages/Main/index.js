import React, { Component } from 'react';
import api from '../../service/api';
import { Link } from 'react-router-dom';
import './style.css';

export default class Main extends Component {
  state = {
    users: [],
    infoUsers: {},
    page: 1,
    NewUser: {
      name: "",
      idade: 0,
      description: "",
    },
  }

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = async (page = 1) => {
    try {
      const response = await api.get(`/index?page=${page}`);

      if (response.status == 200) {
        const { docs, ...infoUsers } = response.data;
        this.setState({ users: docs, infoUsers, page });
      }

    } catch (error) {
      alert("Erro na requisição!");
      console.log(error);
    }
  }

  createNewUser = async () => {
    var { name, idade, description } = this.state.NewUser;

    name = document.querySelector('input[name="text-name"]').value;
    idade = document.querySelector('input[name="text-age"]').value;
    description = document.querySelector('textarea[name="text-description"]').value;

    this.setState([ this.state.NewUser = { name, idade, description } ]);

    try {
      const response = await api.post('/index', this.state.NewUser);
      console.log(response);

      if ( response.status == 200 ) {
        alert("Cadatrado com Sucesso!");
        window.location.reload();
      }
      else {
        alert("Alguma coisa deu errado, tente novamente mais tarte!")
      }

    } catch (error) {
      alert("Erro ao cadastrar, tente novamente.");
      console.log(error);
    }
  }

  loadPrevPage = () => {
    const { page } = this.state;
    const NumberPage = page - 1;
    this.loadUsers(NumberPage);
  }

  loadNextPage = () => {
    const { page } = this.state;
    const NumberPage = page + 1;
    this.loadUsers(NumberPage);
  }

  render() {
    const { users, infoUsers, page } = this.state;

    return (
      <div className="app">

        <div className="container">
          {/* Listagem de Usuários */}
          <div className="row">
            <div className="col-12">
              <div className="list-group">
                <a href="#" className="list-group-item list-group-item-action active" id="top-list" >Listagem de Pessoas Cadastradas</a>
                {users.map(item => (
                  <Link to={`/index/${item._id}`} key={item._id} id="link-user" className="list-group-item list-group-item-action"> { item.name} </Link>
                ))}
              </div>
            </div>
            <div className="col-12 text-center">
              <button type="button" className="btn btn-primary" id="btnRegister" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Cadastrar Novo</button>
            </div>
          </div>
          {/* Paginação */}
          <div className="row">
            <div className="col-12">
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item"><button className="page-link" onClick={this.loadPrevPage} disabled={page == 1}>Anterior</button></li>
                  <li className="page-item"><button className="page-link"> {page} </button></li>
                  <li className="page-item"><button className="page-link" onClick={this.loadNextPage} disabled={page == infoUsers.pages}>Próxima</button></li>
                </ul>
              </nav>
            </div>
          </div>
          {/* Modal de Cadastro */}
          <div className="row">
            <div className="col-12">
              <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Cadastre-se Já!</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="form-group">
                          <label htmlFor="recipient-name" className="col-form-label">Nome Comleto:</label>
                          <input type="text" className="form-control" id="recipient-name" name="text-name" required="true"/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="recipient-name" className="col-form-label">Idade:</label>
                          <input type="number" className="form-control" id="recipiente-name" name="text-age" min="18" max="110" required="true"/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="message-text" className="col-form-label">Descrição:</label>
                          <textarea className="form-control" id="message-text" placeholder = "Descrição sobre você..." name="text-description" required="true"></textarea>
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                      <button type="submit" className="btn btn-primary" onClick={ this.createNewUser } data-dismiss="modal">Cadastrar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

