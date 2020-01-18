import { Put, Post } from "../../services/api";
import ToastMessage from "../../components/toastMessage/toastfy";

export default async function SaveProfile(data) {
  data["user"].dateOfBirth = new Date(data["user"].dateOfBirth);
  try {
    if (
      data["address"].zipcode.length === 8 ||
      data["address"].number ||
      data["address"].street
    ) {
      await Post("/cities", data["address"]).then(result => {
        data["address"].id_city = result.data[0].id;
      });
      await Post("/neighborhoods", data["address"]).then(result => {
        data["address"].id_neighborhood = result.data[0].id;
      });
      await Post("/states", data["address"]).then(result => {
        data["address"].id_state = result.data[0].id;
      });
      if (data["user"].id_address) {
        await Put(
          `/addresses/${data["user"].id_address}/`,
          data["address"]
        ).catch(error => {
          throw new Error(error.response.data);
        });
      } else {
        await Post("/addresses", data["address"])
          .then(result => {
            data["user"].id_address = result.data.id;
          })
          .catch(error => {
            throw new Error(error.response.data);
          });
      }
    }

    if (!data["user"].cellPhone && !data["user"].telephone)
      throw new Error("Informe um número de contato");
    if (!data["user"].password) delete data["user"].password;
    await Put("/users/true/", data["user"])
      .then(() => {
        ToastMessage("Salvo com sucesso!", "success");
      })
      .catch(error => {
        throw new Error(error.response.data);
      });
  } catch (error) {
    ToastMessage(error.message, "error");
  } finally {
    return data["user"].id_address;
  }
}
