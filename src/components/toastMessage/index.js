import "../../components/animations/refused.css";
/**
 * Toast Message
 *
 * @param   Toast required
 * @param   Type default = "success" || "danger"
 * @param   TextHeader default = "Sucesso!"
 * @param   TextBody default = ""
 * @returns [boolean]
 */
function ToastMessage(
  toast,
  type = "success",
  textHeader = "Sucesso!",
  textBody = ""
) {
  let elementHeader = toast.querySelector("strong");
  let elementBody = toast.querySelector("div.toast-body");

  if (type !== "success") {
    elementHeader.classList.remove(`text-success`);

    toast.classList.add("border-primary", "anim-refused");
    toast.addEventListener("animationend", () => {
      toast.classList.remove("anim-refused");
    });
  } else {
    elementHeader.classList.remove(`text-danger`);
  }
  elementHeader.classList.add(`text-${type}`);
  elementHeader.innerHTML = textHeader;
  elementBody.innerHTML = textBody;

  return true;
}

export default ToastMessage;
