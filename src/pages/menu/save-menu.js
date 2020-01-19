import ToastMessage from "../../components/toastMessage/toastfy";
import { Post } from "../../services/api";

export default async function SaveMenu(data = {}) {
  try {
    const { description, dateOfPublication } = data.menu;
    const { id_mixtures, id_sideDishes } = data;
    const body = { description, dateOfPublication, id_mixtures, id_sideDishes };

    await Post("/menus", body)
      .then(() => {
        ToastMessage("Salvo com sucesso!", "success");
      })
      .catch(error => {
        throw new Error(error.response.data);
      });
      return true;
  } catch (error) {
    ToastMessage(error.message, "error");
  }
}
