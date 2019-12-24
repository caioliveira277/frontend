import React from "react";
import styled from "styled-components";
import DataTable, { createTheme } from "react-data-table-component";
import { dateNow, monthsName, weeks } from "../../utils/utilities";
import {
  FaArrowRight,
  FaArrowLeft,
  FaAngleDoubleLeft,
  FaAngleDoubleRight
} from "react-icons/fa";

function TableMenu(dataSet) {
  const columns = [
    {
      name: weeks[0],
      selector: "monday"
    },
    {
      name: weeks[1],
      selector: "tuesday"
    },
    {
      name: weeks[2],
      selector: "wednesday"
    },
    {
      name: weeks[3],
      selector: "thursday"
    },
    {
      name: weeks[4],
      selector: "friday"
    },
    {
      name: weeks[5],
      selector: "saturday"
    }
  ];
  createTheme("theme", {
    text: {
      primary: "#ffffff",
      secondary: "#2aa198"
    },
    background: {
      default: "#0e1e25"
    },
    context: {
      text: "#FFFFFF"
    },
    divider: {
      default: "#5a48a5"
    }
  });
  const customStyles = {
    headCells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
        fontSize: "1rem"
      }
    },
    rows: {
      highlightOnHoverStyle: {
        backgroundColor: "#ffffffc4",
        borderRadius: "5px",
        outline: "1px solid #6c4fc3"
      }
    }
  };
  const paginationOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de"
  };
  const iconNext = <FaArrowRight className="text-white" />;
  const iconPrevious = <FaArrowLeft className="text-white" />;
  const iconFirst = <FaAngleDoubleLeft className="text-white" />;
  const iconLast = <FaAngleDoubleRight className="text-white" />;

  const ExpandStyle = styled.div`
    padding: 16px;
    display: block;
    width: 100%;

    p {
      font-weight: 700;
    }
  `;

  const ExpandedComponent = ({ data }) => {
    return (
      <ExpandStyle>
          {data.id}
      </ExpandStyle>
    );
  };
  return (
    <DataTable
      title={`Cardápio Semanal (${monthsName[dateNow.getMonth()]})`}
      columns={columns}
      data={dataSet}
      theme="theme"
      customStyles={customStyles}
      paginationComponentOptions={paginationOptions}
      highlightOnHover
      pointerOnHover
      expandableRows
      pagination
      paginationIconNext={iconNext}
      paginationIconPrevious={iconPrevious}
      paginationIconFirstPage={iconFirst}
      paginationIconLastPage={iconLast}
      expandableRowsComponent={<ExpandedComponent />}
      expandOnRowClicked
    />
  );
}

export { TableMenu };
