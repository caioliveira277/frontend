import React from "react";
import "@kenshooui/react-multi-select/dist/style.css";
import MultiSelect from "@kenshooui/react-multi-select";

export default function MultipleSelect(items, handleChange, selectedItems) {
  const messages = {
    searchPlaceholder: "Buscar...",
    noItemsMessage: "Vazio",
    noneSelectedMessage: "Não selecionado",
    selectedMessage: "Selecionado",
    selectAllMessage: "Selecionar todos",
    clearAllMessage: "Limpar todos",
  }

  return <MultiSelect items={items} messages={messages} onChange={handleChange} selectedItems={selectedItems}/>;
}
