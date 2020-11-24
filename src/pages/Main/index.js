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
      image: "",
      name: "",
      email: "",
      birth_day: "",
      description: "",
      estate: "",
      city: "",
      phone_number: "",
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
        console.log(docs);
      }

    } catch (error) {
      alert("Erro na requisição!");
      console.log(error);
    }
  }

  createNewUser = async () => {
    var { image, name, email, birth_day, description, estate, city, phone_number } = this.state.NewUser;

    image = document.querySelector('input[name="text-img"]').value;
    name = document.querySelector('input[name="text-name"]').value;
    email = document.querySelector('input[name="text-email"]').value;
    birth_day = document.querySelector('input[name="text-birth_day"]').value;
    description = document.querySelector('textarea[name="text-description"]').value;
    estate = document.querySelector('select[name="select-estate"]').value;
    city = document.querySelector('input[name="text-city"]').value;
    phone_number = document.querySelector('input[name="text-phone_number"]').value;

    this.setState([ this.state.NewUser = { image, name, email, birth_day, description, estate, city, phone_number } ]);

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
            <div className="col-12 mt-4">
              <div className="list-group">
                <a href="#" className="list-group-item list-group-item-action active" id="top-list" >Listagem de Pessoas Cadastradas</a>
                {users.map(item => (
                  <Link to={`/index/${item._id}`} key={item._id} id="link-user" className="list-group-item list-group-item_user list-group-item-action"><img className="list-user_img" src={item.image} /> <span>{ item.name}</span> </Link>
                ))}
              </div>
            </div>
            <div className="col-12 text-center">
              <button type="button" className="btn btn-primary" id="btnRegister" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Cadastrar Novo</button>
            </div>
          </div>
          {/* Paginação */}
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
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
                          <label htmlFor="recipient-name" className="col-form-label">Link da Imagem:</label>
                          <input type="text" className="form-control" id="recipient-name" name="text-img" required="true"/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="recipient-name" className="col-form-label">Nome Comleto:</label>
                          <input type="text" className="form-control" id="recipient-name" name="text-name" required="true"/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="recipient-name" className="col-form-label">E-mail:</label>
                          <input type="text" className="form-control" id="recipient-name" name="text-email" required="true"/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="recipient-name" className="col-form-label">Dara de Nascimento:</label>
                          <input type="date" className="form-control" id="recipient-name" name="text-birth_day" required="true"/>
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlSelect1">Estado</label>
                          <select class="form-control" id="select-estate" name="select-estate">
                            <option value="Acre">Acre</option>
                            <option value="Alagoas">Alagoas</option>
                            <option value="Amapá">Amapá</option>
                            <option value="Amazonas">Amazonas</option>
                            <option value="Bahia">Bahia</option>
                            <option value="Ceará">Ceará</option>
                            <option value="Distrito Federal">Distrito Federal</option>
                            <option value="Espírito Santo">Espírito Santo</option>
                            <option value="Goiás">Goiás</option>
                            <option value="MA">Maranhão</option>
                            <option value="Maranhão">Mato Grosso</option>
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
                          <input type="text" className="form-control" id="recipient-name" name="text-city" required="true"/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="recipient-name" className="col-form-label">Telefone:</label>
                          <input type="text" className="form-control" id="recipient-name" name="text-phone_number" required="true"/>
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

