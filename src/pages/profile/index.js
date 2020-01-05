import React, { useEffect, useState, useRef } from "react";
import { Card, InputGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import "./styles.css";
import { currentUser, ApiZipcode, BaseURL } from "../../services/api";
import SaveProfile from "./save-profile";
import SaveUpload from "./save-upload";
import UserDefaultImg from "../../assets/images/userDefault.png";
import DatePicker from "react-date-picker";
import { IMaskInput } from "react-imask";
import ToastMessage from "../../components/toastMessage/toastfy";

export default function Profile() {
  const cardImage = useRef("");
  const inputZipcode = useRef("");

  const [id_user, setId_user] = useState(0);
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(null);
  const [type, setType] = useState(null);
  const [email, setEmail] = useState("");
  const [cellPhone, setCellPhone] = useState("");
  const [telephone, setTelephone] = useState("");
  const [cpf, setCpf] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userImage, setUserImage] = useState(UserDefaultImg);
  const [street, setStreet] = useState("");
  const [complement, setComplement] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [state, setState] = useState("UF");
  const [zipcode, setZipcode] = useState("");
  const [id_address, setId_address] = useState(null);
  const [galleryId, setGalleryId] = useState(null);
  const [galleryKey, setGalleryKey] = useState(null);

  useEffect(() => {
    currentUser().then(result => {
      if (result.data.gallery) {
        setUserImage(`${BaseURL}/files/${result.data.gallery.key}`);
        setGalleryId(result.data.gallery.id);
        setGalleryKey(result.data.gallery.key);
      }
      setIsActive(result.data.isActive === true ? "Ativo" : "Inativo");
      setType(result.data.type === 1 ? "Administrador" : "Cliente");
      setId_user(result.data.id);
      setName(result.data.name);
      setEmail(result.data.email);
      setCellPhone(result.data.cellPhone);
      setTelephone(result.data.telephone);
      setCpf(result.data.cpf);
      setDateOfBirth(result.data.dateOfBirth.split("-"));
      setUsername(result.data.username);
      setPassword(result.data.password);
      if (result.data.id_address) {
        setStreet(result.data.address.street);
        setComplement(result.data.address.complement);
        setNumber(result.data.address.number);
        setCity(result.data.address.cities.city);
        setNeighborhood(result.data.address.neighborhoods.neighborhood);
        setState(result.data.address.states.state);
        setZipcode(result.data.address.zipcode);
        setId_address(result.data.id_address);
      }
    });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    SaveProfile({
      user: {
        name,
        email,
        cellPhone,
        telephone,
        cpf,
        dateOfBirth,
        username,
        password,
        id_address
      },
      address: {
        street,
        number,
        city,
        neighborhood,
        state,
        zipcode,
        complement
      }
    }).then(result => {
      setId_address(result);
    });
  };

  const RenderImage = async e => {
    const inputFiles = e.target;
    if (inputFiles.files && inputFiles.files[0]) {
      const reader = new FileReader();
      reader.onload = e => {
        setUserImage(e.target.result);
      };
      reader.readAsDataURL(inputFiles.files[0]);
    }
    SaveUpload({
      file: inputFiles.files[0],
      id_user,
      galleryId,
      galleryKey
    }).then(result => {
      if (!result) {
        setUserImage(UserDefaultImg);
      } else {
        setGalleryId(result.newId);
        setGalleryKey(result.newKey);
      }
    });
  };

  const SearchZipcode = async e => {
    e.preventDefault();
    const btnTarget = e.target;
    btnTarget.innerHTML = "<span class='spinner-grow spinner-grow-sm'></span>";
    await ApiZipcode.get(`/${zipcode}/json`)
      .then(result => {
        btnTarget.innerHTML = "Buscar";
        ToastMessage("Endereço encontrado!", "info");
        setCity(result.data.localidade);
        setStreet(result.data.logradouro);
        setNeighborhood(result.data.bairro);
        setState(result.data.uf);
      })
      .catch(() => {
        ToastMessage("CEP inválido, tente novamente!", "error");
        btnTarget.innerHTML = "Buscar";
      });
  };
  return (
    <>
      <article className="col-10" id="main-article">
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
                  src={userImage}
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
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="O seu melhor email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
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
                  value={cellPhone}
                  unmask={true}
                  className="form-control"
                  onAccept={value => setCellPhone(value)}
                  placeholder="DDD + Número"
                />
              </div>
              <div className="form-group">
                <label>Telefone:</label>
                <IMaskInput
                  mask={"(000) 0000-0000"}
                  radix="."
                  value={telephone}
                  unmask={true}
                  className="form-control"
                  onAccept={value => setTelephone(value)}
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
                  value={cpf}
                  unmask={true}
                  className="form-control"
                  onAccept={value => setCpf(value)}
                  placeholder="O seu CPF"
                />
              </div>
              <div className="form-group">
                <p className="text-white">Data de Nascimento:</p>
                <DatePicker
                  className="bg-theme3 badge z-index99"
                  onChange={e => setDateOfBirth(e)}
                  format="dd-MM-y"
                  locale="pt"
                  value={new Date(dateOfBirth)}
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
                  className="form-control"
                  placeholder="O seu nome de usuario"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Senha:</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="********"
                  autoComplete="current-password"
                  onChange={e => setPassword(e.target.value)}
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
                <p className="text-primary">{type}</p>
              </div>
              <div className="form-group">
                <label htmlFor="">Status:</label>
                <p className="text-theme3">{isActive}</p>
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
                      value={zipcode}
                      unmask={true}
                      ref={inputZipcode}
                      className="form-control col-6 col-md-3"
                      onAccept={value => setZipcode(value)}
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
                    placeholder="A rua onde você mora"
                    value={street}
                    onChange={e => setStreet(e.target.value)}
                  />
                </div>
                <div className="form-group col-4 col-md-2">
                  <label>Número:</label>
                  <IMaskInput
                    mask={Number}
                    radix="."
                    value={number}
                    unmask={true}
                    className="form-control"
                    onAccept={value => setNumber(value)}
                    placeholder="Nº"
                  />
                </div>
                <div className="form-group col-12 col-md-4">
                  <label>Complemento:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Complemento"
                    value={complement}
                    onChange={e => setComplement(e.target.value)}
                  />
                </div>
                <div className="form-group col-12 col-md-6">
                  <label>Bairro:</label>
                  <input
                    type="text"
                    readOnly
                    className="form-control"
                    placeholder="O seu bairro"
                    value={neighborhood}
                  />
                </div>
                <div className="form-group col-8 col-md-4">
                  <label>Cidade:</label>
                  <input
                    type="text"
                    readOnly
                    className="form-control"
                    placeholder="A sua cidade"
                    value={city}
                  />
                </div>
                <div className="form-group col-4 col-md-2">
                  <label>Estado:</label>
                  <select className="form-control" disabled>
                    <option value={state}>{state}</option>
                  </select>
                </div>
              </div>
            </Card>
          </div>
          <div className="form-group col-md-12 text-center div-center">
            <button className="btn bg-theme1 text-white">Salvar</button>
          </div>
        </form>
      </article>
    </>
  );
}
