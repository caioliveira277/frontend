import React from "react";
import { Card } from "react-bootstrap";
import DatePicker from "react-date-picker";
import MultipleSelect from "../../components/multiSelect";
import "./styles.css";


export default function Menu() {
  const handleSubmit = e => {
    e.preventDefault();
    alert("yes submit");
  };
  const mixtures = [
    { id: 0, label: "item 1" },
    { id: 2, label: "item 2", disabled: true },
    { id: 3, label: "item 3", disabled: false },
    { id: 4, label: "item 4" }
  ];
  const sideDishes = [
    { id: 0, label: "item 1" },
    { id: 2, label: "item 2", disabled: true },
    { id: 3, label: "item 3", disabled: false },
    { id: 4, label: "item 4" }
  ];
  return (
    <>
      <div className="col-12">
        <Card className="m-3 p-2 bg-theme2">
          <h3 className="text-white">
            Menu: <hr />
          </h3>
        </Card>
      </div>
      <div className="col-12 col-sm-6">
        <Card className="m-3 p-2 bg-theme2">
          <h5>
            Cadastro <hr />
          </h5>
          <form id="formMenu" onSubmit={handleSubmit}>
            <div className="form-group">
              <p className="text-white">Data de Postagem:</p>
              <DatePicker
                className="bg-theme3 badge z-index99"
                format="dd-MM-y"
                locale="pt"
              ></DatePicker>
            </div>
            <div className="form-group">
              <label htmlFor="">Misturas:</label>
              {MultipleSelect(mixtures)}}
            </div>
            <div className="form-group">
              <label htmlFor="">Acompanhamentos:</label>
              {MultipleSelect(sideDishes)}}
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}
