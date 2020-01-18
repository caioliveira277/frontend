import React from "react";
import "@kenshooui/react-multi-select/dist/style.css";
import MultiSelect from "@kenshooui/react-multi-select";

export default function MultipleSelect(items) {
  const messages = {
    searchPlaceholder: "Buscar...",
    noItemsMessage: "Vazio",
    noneSelectedMessage: "Não selecionado",
    selectedMessage: "deletar",
    selectAllMessage: "Selecionar todos",
    clearAllMessage: "Limpar todos",
  }

  return <MultiSelect items={items} messages={messages}/>;
}
