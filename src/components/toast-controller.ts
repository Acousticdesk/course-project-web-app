export class ToastController {
  static show(
    { header, description } = {
      header: "",
      description: "",
    },
    duration: number = 3000
  ) {
    const toast = document.querySelector("#toast") as HTMLDivElement;

    if (!toast) {
      throw new Error("Toast element was not found in the DOM");
    }

    toast.querySelector(".toast__header")!.textContent = header;
    toast.querySelector(".toast__description")!.textContent = description;

    toast.hidden = false;
    toast.classList.add("toast--error", "bounce-animation");

    window.setTimeout(() => {
      toast.classList.remove("toast-error", "bounce-animation");
      toast.hidden = true;
    }, duration);
  }
}
