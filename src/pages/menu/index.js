import React, { useState, useEffect } from "react";
import { Card, Row, Badge } from "react-bootstrap";
import DatePicker from "react-date-picker";
import MultipleSelect from "../../components/multiSelect";
import { FaStar } from "react-icons/fa";
import { DateFormatDB, formatForDB } from "../../utils/utilities";
import { Get } from "../../services/api";
import SaveMenu from "./save-menu";
import "./styles.css";

export default function Menu() {
  const defaultDescription = localStorage.getItem("MenuDescription");
  const [mixtures, setMixtures] = useState({
    items: [
      {
        id: 0,
        label: "",
        ingredients: ""
      }
    ],
    selectedItems: []
  });
  const [sideDishes, setSideDishes] = useState({
    items: [
      {
        id: 0,
        label: "",
        ingredients: ""
      }
    ],
    selectedItems: []
  });
  const [menu, setMenu] = useState({
    id: null,
    dateOfPublication: new Date(),
    description: defaultDescription ? defaultDescription : ""
  });

  useEffect(() => {
    Get("/mixtures").then(result => {
      setMixtures({ selectedItems: [], items: result.data });
    });
    Get("/sideDishes").then(result => {
      setSideDishes({ selectedItems: [], items: result.data });
    });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    localStorage.setItem("MenuDescription", menu.description);
    const id_mixtures = [];
    const id_sideDishes = [];
    mixtures.selectedItems.map(arr => id_mixtures.push(arr.id));
    sideDishes.selectedItems.map(arr => id_sideDishes.push(arr.id));

    const SaveResponse = SaveMenu({ menu, id_mixtures, id_sideDishes });

    if (SaveResponse) {
      setMixtures({ ...mixtures, selectedItems: [] });
      setSideDishes({ ...sideDishes, selectedItems: [] });
    }
  };
  const handleChangeMenu = e => {
    setMenu({
      ...menu,
      [e.target.name]: e.target.value
    });
  };
  const handleChangeMixture = e => {
    setMixtures({ ...mixtures, selectedItems: e });
  };
  const handleChangeSideDishe = e => {
    setSideDishes({ ...sideDishes, selectedItems: e });
  };
  console.log(formatForDB(new Date()));
  return (
    <>
      <div className="col-12">
        <Card className="m-3 p-2 bg-theme2">
          <h3 className="text-white">
            Cardapio: <hr />
          </h3>
        </Card>
      </div>
      <div className="col-12">
        <form id="formMenu" onSubmit={handleSubmit}>
          <Card className="m-3 p-2 bg-theme2">
            <h5>
              Cadastro <hr />
            </h5>
            <Row>
              <div className="div-center col-12 col-sm-6 col-md-6">
                <div className="form-group col-12 col-lg-8">
                  <Card className="text-dark currentMenu p-2">
                    <Badge
                      pill
                      variant="primary"
                      className="text-white bg-theme1"
                    >
                      <FaStar className="float-left" />
                      {DateFormatDB(menu.dateOfPublication, false, true)}
                      <FaStar className="float-right" />
                    </Badge>
                    <textarea
                      cols="30"
                      rows="8"
                      readOnly
                      className="form-control"
                      value={
                        menu.description +
                        "\nMisturas:" +
                        mixtures.selectedItems.map(arr => " " + arr.label) +
                        "\nAcompanhamentos:" +
                        sideDishes.selectedItems.map(arr => " " + arr.label)
                      }
                    ></textarea>
                  </Card>
                </div>
              </div>
              <div className="form-group col-12 col-sm-6 col-md-6">
                <div className="form-group">
                  <p className="text-white">Data de Postagem:</p>
                  <DatePicker
                    className="bg-theme3 badge z-index99"
                    format="dd-MM-y"
                    name="dateOfPublication"
                    locale="pt"
                    value={menu.dateOfPublication}
                    onChange={e =>
                      handleChangeMenu({
                        target: { name: "dateOfPublication", value: e }
                      })
                    }
                  ></DatePicker>
                </div>
                <div className="form-group">
                  <label htmlFor="">Descrição:</label>
                  <textarea
                    name="description"
                    className="form-control"
                    placeholder="Descrição"
                    cols="30"
                    rows="5"
                    value={menu.description}
                    onChange={handleChangeMenu}
                  ></textarea>
                </div>
              </div>
              <div className="col-12 col-lg-6 mb-2">
                <label htmlFor="">Misturas:</label>
                {MultipleSelect(
                  mixtures.items,
                  handleChangeMixture,
                  mixtures.selectedItems
                )}
              </div>
              <div className="col-12 col-lg-6">
                <label htmlFor="">Acompanhamentos:</label>
                {MultipleSelect(
                  sideDishes.items,
                  handleChangeSideDishe,
                  sideDishes.selectedItems
                )}
              </div>
            </Row>
          </Card>
          <div className="col-12 text-center">
            <button type="submit" className="btn bg-theme1 text-white">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
