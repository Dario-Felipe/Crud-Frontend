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
      var { image, name, email, birth_day, description, estate, city, phone_number } = this.state.user;

      image = document.querySelector('input[name="text-img"]').value;
      name = document.querySelector('input[name="text-name"]').value;
      email = document.querySelector('input[name="text-email"]').value;
      birth_day = document.querySelector('input[name="text-birth_day"]').value;
      description = document.querySelector('textarea[name="text-description"]').value;
      estate = document.querySelector('select[name="select-estate"]').value;
      city = document.querySelector('input[name="text-city"]').value;
      phone_number = document.querySelector('input[name="text-phone_number"]').value;

      this.setState([ this.state.user = { image, name, email, birth_day, description, estate, city, phone_number } ]);
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
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                  <img style={{width: "190px", borderRadius: "110px"}} src={user.image}/>
                  <h4 className="card-title mt-3"> {user.name} </h4>
                  <p className="card-text"> {user.description} </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"> <strong>E-mail:</strong> {user.email} </li>
                  <li className="list-group-item"> <strong>Data de Nascimento:</strong> {user.birth_day} </li>
                  <li className="list-group-item"> <strong>Estado:</strong> {user.estate} </li>
                  <li className="list-group-item"> <strong>Cidade:</strong> {user.city} </li>
                  <li className="list-group-item"> <strong>Telefone:</strong> {user.phone_number} </li>
                  <li className="list-group-item"> <strong>Registrado desde:</strong> {user.createdAt} </li>
                </ul>
                <div className="card-body d-flex align-items-center justify-content-center">
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
                          <label htmlFor="recipient-name" className="col-form-label">Link da Imagem:</label>
                          <input type="text" className="form-control" id="recipient-name" name="text-img" defaultValue={user.image} required="true"/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="recipient-name" className="col-form-label">Nome Comleto:</label>
                          <input type="text" className="form-control" id="recipient-name" name="text-name" defaultValue={user.name} required="true" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="recipient-name" className="col-form-label">E-mail:</label>
                          <input type="text" className="form-control" id="recipient-name" name="text-email" defaultValue={user.email} required="true"/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="recipient-name" className="col-form-label">Dara de Nascimento:</label>
                          <input type="date" className="form-control" id="recipient-name" name="text-birth_day" defaultValue={user.birth_day}  required="true"/>
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlSelect1">Estado</label>
                          <select class="form-control" id="select-estate" name="select-estate">
                            <option value={user.estate}>{user.estate}</option>
                            <option value="Acre">Acre</option>
                            <option value="Alagoas">Alagoas</option>
                            <option value="Amapá">Amapá</option>
                            <option value="Amazonas">Amazonas</option>
                            <option value="Bahia">Bahia</option>
                            <option value="Ceará">Ceará</option>
                            <option value="Distrito Federal">Distrito Federal</option>
                            <option value="Espírito Santo">Espírito Santo</option>
                            <option value="Goiás">Goiás</option>
                            <option value="Maranhão">Maranhão</option>
                            <option value="Mato Grosso do Sul">Mato Grosso do Sul</option>
                            <option value="Minas Gerais">Minas Gerais</option>
                            <option value="Pará">Pará</option>
                            <option value="Paraíba">Paraíba</option>
                            <option value="ParanáR">Paraná</option>
                            <option value="Pernambuco">Pernambuco</option>
                            <option value="Piauí">Piauí</option>
                            <option value="Rio de Janeiro">Rio de Janeiro</option>
                            <option value="Rio Grande do NorteN">Rio Grande do Norte</option>
                            <option value="Rio Grande do Sul">Rio Grande do Sul</option>
                            <option value="Rondônia">Rondônia</option>
                            <option value="Roraima">Roraima</option>
                            <option value="Santa Catarina">Santa Catarina</option>
                            <option value="São Paulo">São Paulo</option>
                            <option value="Sergipe">Sergipe</option>
                            <option value="Tocantins">Tocantins</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="recipient-name" className="col-form-label">Cidade:</label>
                          <input type="text" className="form-control" id="recipient-name" name="text-city" defaultValue={user.city} required="true"/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="recipient-name" className="col-form-label">Telefone:</label>
                          <input type="text" className="form-control" id="recipient-name" name="text-phone_number" defaultValue={user.phone_number} required="true"/>
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