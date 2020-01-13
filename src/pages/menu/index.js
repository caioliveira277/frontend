import React from "react";
import { Card } from "react-bootstrap";
import "./styles.css";

export default function Menu() {
  const handleSubmit = e => {
    e.preventDefault();
    alert("yes submit");
  };
  return (
    <article className="col-10 row">
      <div className="col-12 col-sm-6">
        <Card className="m-3 p-2 bg-theme2">
          <form id="formMenu" onSubmit={handleSubmit}>
            <div className="form-group">
              
            </div>
          </form>
        </Card>
      </div>
      <div className="col-12 col-sm-6">
        <Card className="m-3 p-2 bg-theme2"></Card>
      </div>
    </article>
  );
}
