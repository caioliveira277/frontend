import { Api } from "../../services/api";
import ToastMessage from "../../components/toastMessage/toastfy";

export default async function saveProfile(data = []) {
  try {
    const token = sessionStorage.getItem("token");
    data[0].dateOfBirth = new Date(data[0].dateOfBirth);

    if (data[0].id_address) {
      await Api.post(`/cities`, data[1], {
        headers: {
          Authorization: "Bearer " + token
        }
      }).then(result => {
        data[1].id_city = result.data[0].id;
      });
      await Api.post(`/neighborhoods`, data[1], {
        headers: {
          Authorization: "Bearer " + token
        }
      }).then(result => {
        data[1].id_neighborhood = result.data[0].id;
      });
      await Api.post(`/states`, data[1], {
        headers: {
          Authorization: "Bearer " + token
        }
      }).then(result => {
        data[1].id_state = result.data[0].id;
      });
    }
    await Api.put(`/addresses/${data[0].id_address}/`, data[1], {
      headers: {
        Authorization: "Bearer " + token
      }
    }).catch(error => {
      throw new Error(error.response.data);
    });

    if (!data[0].cellPhone && !data[0].telephone)
      throw new Error("Informe um número de contato");
    if (!data[0].password) delete data[0].password;

    await Api.put("/users/true/", data[0], {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(() => {
        ToastMessage("Salvo com sucesso!", "success");
      })
      .catch(error => {
        throw new Error(error.response.data);
      });
  } catch (error) {
    ToastMessage(error.message, "error");
  }
}
