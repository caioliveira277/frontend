import React, { useEffect, useState, useRef } from "react";
import { Card, InputGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import { ApiZipcode, BaseURL, currentUser } from "../../services/api";
import SaveProfile from "./save-profile";
import SaveUpload from "./save-upload";
import UserDefaultImg from "../../assets/images/userDefault.png";
import DatePicker from "react-date-picker";
import { IMaskInput } from "react-imask";
import ToastMessage from "../../components/toastMessage/toastfy";
import "./styles.css";

export default function Profile() {
  const cardImage = useRef("");
  const inputZipcode = useRef("");

  const [user, setUser] = useState({
    id_user: 0,
    name: "",
    isActive: null,
    type: null,
    email: "",
    cellPhone: "",
    telephone: "",
    cpf: "",
    dateOfBirth: new Date(),
    username: "",
    password: "",
    userImage: UserDefaultImg
  });
  const [gallery, setGallery] = useState({
    id: null,
    key: null
  });
  const [address, setAddress] = useState({
    street: "",
    complement: "",
    number: "",
    city: "",
    neighborhood: "",
    state: "",
    zipcode: "",
    id_address: null
  });

  
  useEffect(() => {
    currentUser().then(result => {
      const dataUser = result.data;
      const dataGallery = result.data.gallery;
      const dataAddress = result.data.address;
      if (dataGallery.length) {
        dataUser.userImage = `${BaseURL}/files/${dataGallery[0].key}`;
        setGallery(dataGallery[0]);
      }else{
        dataUser.userImage = UserDefaultImg;
      }

      dataUser.isActive = dataUser.isActive === true ? "Ativo" : "Inativo";
      dataUser.id_user = dataUser.id
      setUser(dataUser);
      if (dataUser.id_address) {
        dataAddress.neighborhood = dataAddress.neighborhoods.neighborhood;
        dataAddress.city = dataAddress.cities.city;
        dataAddress.state = dataAddress.states.state;
        setAddress(dataAddress);
      }
    });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    SaveProfile({
      user,
      address
    }).then(result => {
      setAddress({ ...address, id_address: result });
    });
  };

  const RenderImage = async e => {
    const inputFiles = e.target;
    if (inputFiles.files && inputFiles.files[0]) {
      const reader = new FileReader();
      reader.onload = e => {
        setUser({ ...user, userImage: e.target.result });
      };
      reader.readAsDataURL(inputFiles.files[0]);
    }
    SaveUpload({
      gallery,
      file: inputFiles.files[0],
      id_user: user.id_user
    }).then(result => {
      if (!result) {
        setUser({ ...user, userImage: UserDefaultImg });
      } else {
        setGallery({ ...gallery, id: result.newId, key: result.newKey });
      }
    });
  };

  function handleChangeUser(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }
  function handleChangeAddress(e) {
    setAddress({
      ...address,
      [e.target.name]: e.target.value
    });
  }

  const SearchZipcode = async e => {
    e.preventDefault();
    const btnTarget = e.target;
    btnTarget.innerHTML = "<span class='spinner-grow spinner-grow-sm'></span>";
    await ApiZipcode.get(`/${address.zipcode}/json`)
      .then(result => {
        const res = result.data;
        btnTarget.innerHTML = "Buscar";
        ToastMessage("Endereço encontrado!", "info");
        setAddress({
          ...address,
          city: res.localidade,
          street: res.logradouro,
          neighborhood: res.bairro,
          state: res.uf
        });
      })
      .catch(() => {
        ToastMessage("CEP inválido, tente novamente!", "error");
        btnTarget.innerHTML = "Buscar";
      });
  };

  return (
    <>
      <Card className="m-3 p-2 bg-theme2">
        <h3 className="text-white">
          Perfil: <hr />
        </h3>
      </Card>
      <form id="formProfile" className="row m-0" onSubmit={handleSubmit}>
        <div className="col-md-4 mb-4">
          <Card
            className="bg-theme2 form-group col-md-12 text-center p-2 h-100"
            ref={cardImage}
          >
            <h5 className="text-left">
              Foto de Perfil: <hr />
            </h5>
            <label htmlFor="inputFile" className="mt-3">
              <img
                src={user.userImage}
                className="rounded-circle img-radius"
                alt=""
              />
            </label>
            <input
              type="file"
              id="inputFile"
              className="d-none"
              accept="image/*"
              onChange={RenderImage}
            />
          </Card>
        </div>
        <div className="col-md-4 mb-4">
          <Card className="bg-theme2 p-2">
            <h5>
              Gerais <hr />
            </h5>
            <div className="form-group">
              <label>Nome:</label>
              <input
                type="text"
                className="form-control"
                placeholder="O seu nome"
                required
                name="name"
                value={user.name}
                onChange={handleChangeUser}
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="O seu melhor email"
                value={user.email}
                onChange={handleChangeUser}
              />
            </div>
          </Card>
        </div>
        <div className="col-md-4 mb-4">
          <Card className="bg-theme2 p-2">
            <h5>
              Contato <hr />
            </h5>
            <div className="form-group">
              <label>Celular:</label>
              <IMaskInput
                mask={"(000) 00000-0000"}
                radix="."
                name="cellPhone"
                value={user.cellPhone}
                unmask={true}
                className="form-control"
                onAccept={e =>
                  handleChangeUser({ target: { name: "cellPhone", value: e } })
                }
                placeholder="DDD + Número"
              />
            </div>
            <div className="form-group">
              <label>Telefone:</label>
              <IMaskInput
                mask={"(000) 0000-0000"}
                radix="."
                name="telephone"
                value={user.telephone}
                unmask={true}
                className="form-control"
                onAccept={e =>
                  handleChangeUser({ target: { name: "telephone", value: e } })
                }
                placeholder="DDD + Número"
              />
            </div>
          </Card>
        </div>
        <div className="col-md-4 mb-4">
          <Card className="bg-theme2 p-2 h-100">
            <h5>
              Dados pessoais <hr />
            </h5>
            <div className="form-group">
              <label>CPF:</label>
              <IMaskInput
                mask={"000.000.000-00"}
                radix="."
                name="cpf"
                value={user.cpf}
                unmask={true}
                className="form-control"
                onAccept={e =>
                  handleChangeUser({ target: { name: "cpf", value: e } })
                }
                placeholder="O seu CPF"
              />
            </div>
            <div className="form-group">
              <p className="text-white">Data de Nascimento:</p>
              <DatePicker
                className="bg-theme3 badge z-index99"
                format="dd-MM-y"
                locale="pt"
                name="dateOfBirth"
                value={new Date(user.dateOfBirth)}
                onChange={handleChangeUser}
              ></DatePicker>
            </div>
          </Card>
        </div>
        <div className="col-md-4 mb-4">
          <Card className="bg-theme2 p-2 h-100">
            <h5>
              Dados de acesso <hr />
            </h5>
            <div className="form-group">
              <label>Nome de usuario:</label>
              <input
                type="text"
                autoComplete="username"
                required
                name="username"
                className="form-control"
                placeholder="O seu nome de usuario"
                value={user.username}
                onChange={handleChangeUser}
              />
            </div>
            <div className="form-group">
              <label>Senha:</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="********"
                autoComplete="current-password"
                onChange={handleChangeUser}
              />
            </div>
          </Card>
        </div>
        <div className="col-md-4 mb-4">
          <Card className="bg-theme2 p-2 h-100">
            <h5>
              Informações:
              <hr />
            </h5>
            <div className="form-group">
              <label htmlFor="">Tipo de usuário:</label>
              <p className="text-primary">{user.type}</p>
            </div>
            <div className="form-group">
              <label htmlFor="">Status:</label>
              <p className="text-theme3">{user.isActive}</p>
            </div>
          </Card>
        </div>
        <div className="col-md-12 mb-4">
          <Card className="bg-theme2 p-2">
            <h5>
              Endereço
              <hr />
            </h5>
            <div className="row">
              <div className="form-group col-md-12">
                <label>CEP:</label>
                <InputGroup className="mb-3">
                  <IMaskInput
                    mask={"00000-000"}
                    radix="."
                    name="zipcode"
                    value={address.zipcode}
                    unmask={true}
                    ref={inputZipcode}
                    className="form-control col-6 col-md-3"
                    onAccept={e =>
                      handleChangeAddress({
                        target: { name: "zipcode", value: e }
                      })
                    }
                    placeholder="Infome o seu CEP"
                  />

                  <InputGroup.Append>
                    <OverlayTrigger
                      overlay={
                        <Tooltip id="tooltip-disabled">
                          Informe o seu cep e clique aqui!
                        </Tooltip>
                      }
                    >
                      <span className="d-inline-block">
                        <a
                          href="http"
                          className="btn btn-primary"
                          onClick={SearchZipcode}
                        >
                          Buscar
                        </a>
                      </span>
                    </OverlayTrigger>
                  </InputGroup.Append>
                </InputGroup>
              </div>
              <div className="form-group col-8 col-md-4">
                <label>Rua:</label>
                <input
                  type="text"
                  className="form-control"
                  name="street"
                  placeholder="A rua onde você mora"
                  value={address.street}
                  onChange={handleChangeAddress}
                />
              </div>
              <div className="form-group col-4 col-md-2">
                <label>Número:</label>
                <IMaskInput
                  mask={Number}
                  radix="."
                  name="number"
                  value={address.number}
                  unmask={true}
                  className="form-control"
                  onAccept={e =>
                    handleChangeAddress({
                      target: { name: "number", value: e }
                    })
                  }
                  placeholder="Nº"
                />
              </div>
              <div className="form-group col-12 col-md-4">
                <label>Complemento:</label>
                <input
                  type="text"
                  name="complement"
                  className="form-control"
                  placeholder="Complemento"
                  value={address.complement}
                  onChange={handleChangeAddress}
                />
              </div>
              <div className="form-group col-12 col-md-6">
                <label>Bairro:</label>
                <input
                  type="text"
                  readOnly
                  className="form-control"
                  name="neighborhood"
                  placeholder="O seu bairro"
                  value={address.neighborhood}
                />
              </div>
              <div className="form-group col-8 col-md-4">
                <label>Cidade:</label>
                <input
                  type="text"
                  readOnly
                  className="form-control"
                  name="city"
                  placeholder="A sua cidade"
                  value={address.city}
                />
              </div>
              <div className="form-group col-4 col-md-2">
                <label>Estado:</label>
                <select className="form-control" name="state" disabled>
                  <option value={address.state}>{address.state}</option>
                </select>
              </div>
            </div>
          </Card>
        </div>
        <div className="form-group col-md-12 text-center div-center">
          <button className="btn bg-theme1 text-white">Salvar</button>
        </div>
      </form>
    </>
  );
}
