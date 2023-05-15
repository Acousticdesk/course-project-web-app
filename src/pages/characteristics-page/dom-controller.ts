import { FormDataController } from "../../components/form-data-controller";
import { ApiRouteEnums } from "../../api/api.enums";
import { ToastController } from "../../components/toast-controller";
import { StateController } from "../../components/state-controller";

export class CharacteristicsDomController {
  static events = new EventTarget();

  static getConfirmButton() {
    const confirmButton = document.querySelector(
      "#characteristics_page_start_button"
    );

    if (!confirmButton) {
      throw new Error(
        "Characteristics Confirm Button was not found in the DOM"
      );
    }

    return confirmButton;
  }

  static getAside() {
    const characteristicsPageAside = document.querySelector(
      "#characteristics_page_aside"
    );

    if (!characteristicsPageAside) {
      throw new Error("Characteristics Page Aside was not found in the DOM");
    }

    return characteristicsPageAside as HTMLElement;
  }

  static getSection() {
    const characteristicsSection = document.querySelector(
      "#characteristics_page_section"
    );

    if (!characteristicsSection) {
      throw new Error("Characteristics Section was not found in the DOM");
    }

    return characteristicsSection as HTMLElement;
  }

  static async handleConfirmButtonClick() {
    const form = document.querySelector(
      "#characteristics_form"
    ) as HTMLFormElement;

    if (!form) {
      throw new Error("Form was not found in the DOM");
    }

    const formData = FormDataController.serialize(new FormData(form));

    try {
      const { prediction: predictedPrice } = await fetch(
        ApiRouteEnums.PRICE_PREDICTION_ENDPOINT as string,
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}. ${res.statusText}`);
        }

        return res.json();
      });

      StateController.setPredictedPrice(predictedPrice);
    } catch (e) {
      ToastController.show({
        header: "Price prediction error",
        description:
          e && typeof e === "object" ? e.toString() : "Unrecognized error",
      });

      return;
    }

    CharacteristicsDomController.remove();
  }

  static init() {
    const confirmButton = CharacteristicsDomController.getConfirmButton();

    confirmButton.addEventListener(
      "click",
      CharacteristicsDomController.handleConfirmButtonClick
    );
  }

  static remove() {
    const characteristicsPageAside = CharacteristicsDomController.getAside();
    characteristicsPageAside.hidden = true;

    const homePageSection = CharacteristicsDomController.getSection();
    homePageSection.hidden = true;

    const confirmButton = CharacteristicsDomController.getConfirmButton();

    confirmButton.removeEventListener(
      "click",
      CharacteristicsDomController.handleConfirmButtonClick
    );

    CharacteristicsDomController.events.dispatchEvent(new Event("done"));
  }

  static awaitStepCompleted() {
    return new Promise((resolve) => {
      CharacteristicsDomController.events.addEventListener("done", resolve);
    });
  }
}
