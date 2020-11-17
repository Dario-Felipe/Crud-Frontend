import React, { Component } from 'react';
import api from '../../service/api';
import { Link, Redirect } from 'react-router-dom';

export default class UserDetails extends Component {
  state = {
    user: {}
  }

  componentDidMount() {
    this.loadUser();
  }

  loadUser = async () => {
    try {
      const { id } = this.props.match.params;
      const response = await api.get(`/index/${id}`);

      if (response.status == 200) {
        const { data } = response;
        this.setState({ user: data });
      }

    } catch (error) {
      alert("Erro na requisição!");
      console.log(error);
    }
  }

  deleteUser = async () => {
    try {
      const { id } = this.props.match.params;
      const response = await api.delete(`/index/${id}`);
      console.log(response);

      if (response.status == 200) {
        return document.location.href = "/index";
      }

    } catch (error) {
      alert("Erro ao tentar excluir, tente novamente.");
      console.log(error);
    }
  }

  updateUser = async () => {
    try {
      const { id } = this.props.match.params;
      var { name, idade, description } = this.state.user;

      name = document.querySelector('input[name="text-name"]').value;
      idade = document.querySelector('input[name="text-age"]').value;
      description = document.querySelector('textarea[name="text-description"]').value;

      this.setState([ this.state.user = { name, idade, description } ]);
      console.log(this.state.user);

      const response = await api.put(`/index/${id}`, this.state.user);

      if ( response.status == 200 ) {
        alert("Dados atualizados com Sucesso!")
        document.location.reload();
      }

    } catch (error) {
      alert("Erro ao alterar, tente novamente!");
      console.log(error);
    }
  }

  render() {
    const { user } = this.state;

    return (
      <div className="app-user-datails">

        <div className="container">

          {/* Detalhes do usuário */}
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title"> {user.name} </h5>
                  <p className="card-text"> {user.description} </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"> <strong>Idade:</strong> {user.idade} </li>
                  <li className="list-group-item"> <strong>Registrado desde:</strong> {user.createdAt} </li>
                </ul>
                <div className="card-body">
                  <a href="#" className="card-link" data-toggle="modal" data-target="#Alterar" data-whatever="@mdo">Alterar</a>
                  <a href="#" className="card-link" data-toggle="modal" data-target="#Excluir" data-whatever="@mdo">Deletar</a>
                  <Link to={'/index'} className="card-link">Voltar</Link>
                </div>
              </div>
            </div>
          </div>
          {/* Modal de Exclusão */}
          <div className="row">
            <div className="col-12">
              <div className="modal fade" id="Excluir" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Deseja excluir este usuário?</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      Perderá todos os dados sobre este usuário caso prossiga com a exclusão.
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                      <button type="button" className="btn btn-primary" onClick={this.deleteUser}>Confirmar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Modal de Alteração */}
          <div className="row">
            <div className="col-12">
              <div className="modal fade" id="Alterar" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Alterar Dados</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="form-group">
                          <label htmlFor="recipient-name" className="col-form-label">Nome Comleto:</label>
                          <input type="text" className="form-control" id="recipient-name" name="text-name" defaultValue={user.name} required="true" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="recipient-name" className="col-form-label">Idade:</label>
                          <input type="number" className="form-control" id="recipiente-name" name="text-age" min="18" max="110" defaultValue={user.idade} required="true" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="message-text" className="col-form-label">Descrição:</label>
                          <textarea className="form-control" id="message-text" placeholder="Descrição sobre você..." name="text-description" defaultValue={user.description} required="true"></textarea>
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                      <button type="submit" className="btn btn-primary" data-dismiss="modal" onClick={this.updateUser}>Pronto</button>
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