import { Post, Put } from "../../services/api";
import ToastMessage from "../../components/toastMessage/toastfy";

export default async function SaveUpload(upload = {}) {
  try {
    var newKey, newId;
    const data = new FormData();

    data.append("file", upload.file);
    data.append("type", "profile");
    data.append("id_user", upload.id_user);

    if (upload.galleryKey) {
      data.append("oldUpload", upload.galleryKey);

      await Put("/upload/" + upload.galleryId, data)
        .then(result => {
          newKey = result.data.key;
          ToastMessage(
            "Sua foto de perfil foi atualizada com sucesso",
            "success"
          );
        })
        .catch(error => {
          throw new Error(
            "Falha no upload, verifique o tamanho e a extensão do arquivo"
          );
        });
    } else {
      await Post("/upload", data)
        .then(result => {
          newKey = result.data.key;
          newId = result.data.id;
          ToastMessage(
            "Sua foto de perfil foi atualizada com sucesso",
            "success"
          );
        })
        .catch(() => {
          throw new Error(
            "Falha no upload, verifique o tamanho e a extensão do arquivo"
          );
        });
    }
    return { newId, newKey };
  } catch (error) {
    ToastMessage(error.message, "error");
    return false;
  }
}
