import { ApiRouteEnums } from "../../api/api.enums";
import { ToastController } from "../../components/toast-controller";
import { TextareaController } from "../../components/textarea-controller";
import { StateController } from "../../components/state-controller";
import { TooManyRequestsError } from "../../api/errors";

export class DescriptionPageDomController {
  static events = new EventTarget();

  static getConfirmButton() {
    const button = document.querySelector("#description_page_confirm_button");

    if (!button) {
      throw new Error("Confirm Button was not found in the DOM");
    }

    return button;
  }

  static getAside() {
    const descriptionPageAside = document.querySelector(
      "#description_page_aside"
    );

    if (!descriptionPageAside) {
      throw new Error("Description Page Aside was not found in the DOM");
    }

    return descriptionPageAside as HTMLElement;
  }

  static getSection() {
    const descriptionSection = document.querySelector(
      "#description_page_section"
    );

    if (!descriptionSection) {
      throw new Error("Description Section was not found in the DOM");
    }

    return descriptionSection as HTMLElement;
  }

  static getForm() {
    const form = document.querySelector("#description_form");

    if (!form) {
      throw new Error("Description Form was not found in the DOM");
    }

    return form as HTMLFormElement;
  }

  static async handleConfirmButtonClick() {
    const form = DescriptionPageDomController.getForm();

    const formData = new FormData(form);

    if (!formData.get("description")) {
      (
        document.querySelector("#description_input")! as HTMLTextAreaElement
      ).focus();
      return;
    }

    try {
      const { class: predictedClass } = await fetch(
        ApiRouteEnums.CLASS_PREDICTION_ENDPOINT as string,
        {
          method: "POST",
          body: JSON.stringify({
            description: formData.get("description"),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (!res.ok) {
          const errorMessage = `Error ${res.status}. ${res.statusText}`;
          switch (res.status) {
            case 429:
              throw new TooManyRequestsError(errorMessage);
            default:
              throw new Error(errorMessage);
          }
        }

        return res.json();
      });

      StateController.setPredictedClass(predictedClass);
    } catch (e) {
      let description = "";

      if (e instanceof TooManyRequestsError) {
        description =
          "Забагато запитів з вашої IP адреси, спробуйте знову через хвилину";
      } else {
        description =
          e && typeof e === "object" ? e.toString() : "Невідома помилка";
      }

      ToastController.show({
        header: "Помилка при обрахуванні класу житла",
        description,
      });

      return;
    }

    const descriptionPageAside = DescriptionPageDomController.getAside();
    descriptionPageAside.hidden = true;

    const descriptionPageSection = DescriptionPageDomController.getSection();
    descriptionPageSection.hidden = true;

    DescriptionPageDomController.remove();

    DescriptionPageDomController.events.dispatchEvent(new Event("done"));
  }

  static init() {
    const form = DescriptionPageDomController.getForm();

    form.reset();

    const descriptionPageAside = DescriptionPageDomController.getAside();
    descriptionPageAside.hidden = false;

    const descriptionPageSection = DescriptionPageDomController.getSection();
    descriptionPageSection.hidden = false;

    const confirmButton = DescriptionPageDomController.getConfirmButton();

    confirmButton.addEventListener(
      "click",
      DescriptionPageDomController.handleConfirmButtonClick
    );

    TextareaController.init("#description_input");
  }

  static remove() {
    const confirmButton = DescriptionPageDomController.getConfirmButton();

    confirmButton.removeEventListener(
      "click",
      DescriptionPageDomController.handleConfirmButtonClick
    );

    TextareaController.remove("#description_input");
  }

  static awaitStepCompleted() {
    return new Promise((resolve) => {
      DescriptionPageDomController.events.addEventListener("done", resolve);
    });
  }
}
