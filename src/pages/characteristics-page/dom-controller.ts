import { FormDataController } from "../../components/form-data-controller";
import { ApiRouteEnums } from "../../api/api.enums";
import { ToastController } from "../../components/toast-controller";
import { StateController } from "../../components/state-controller";
import { CharacteristicsFormData } from "../../components/characteristics/interfaces";
import { TooManyRequestsError } from "../../api/errors";

export class CharacteristicsDomController {
  static events = new EventTarget();

  static getConfirmButton() {
    const confirmButton = document.querySelector(
      "#characteristics_page_confirm_button"
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

  static getForm() {
    const form = document.querySelector(
      "#characteristics_form"
    ) as HTMLFormElement;

    if (!form) {
      throw new Error("Form was not found in the DOM");
    }

    return form;
  }

  static async handleConfirmButtonClick() {
    const form = CharacteristicsDomController.getForm();

    const select = CharacteristicsDomController.getPredictedClassInput();

    select.disabled = false;

    const formData = FormDataController.serialize(new FormData(form));

    try {
      const { prediction: predictedPrice } = await fetch(
        ApiRouteEnums.PRICE_PREDICTION_ENDPOINT as string,
        {
          method: "POST",
          body: JSON.stringify(
            FormDataController.preparePricePredictionPayload({
              ...formData,
              crimeRateInDistrict: "2317",
            } as CharacteristicsFormData)
          ),
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

      StateController.setPredictedPrice(predictedPrice);
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
        header: "Помилка при обрахуванні вартості нерухомості",
        description,
      });

      return;
    }

    CharacteristicsDomController.remove();
  }

  static getPredictedClassInput() {
    const select = document.querySelector(
      "#characteristics_predicted_class_input"
    );

    if (!select) {
      throw new Error(
        "Characteristics Predicted Class was not found in the DOM"
      );
    }

    return select as HTMLSelectElement;
  }

  static setPredictedClassInitialValue(initialValue: string) {
    const select = CharacteristicsDomController.getPredictedClassInput();
    const options = [...select.querySelectorAll("option")];

    for (let option of options) {
      if (option.value === initialValue) {
        option.selected = true;
        option.defaultSelected = true;
        select.value = initialValue;
        select.dispatchEvent(new Event("change"));
        break;
      }
    }
  }

  static init() {
    const form = CharacteristicsDomController.getForm();

    form.reset();

    const characteristicsPageAside = CharacteristicsDomController.getAside();
    characteristicsPageAside.hidden = false;

    const homePageSection = CharacteristicsDomController.getSection();
    homePageSection.hidden = false;

    const confirmButton = CharacteristicsDomController.getConfirmButton();

    confirmButton.addEventListener(
      "click",
      CharacteristicsDomController.handleConfirmButtonClick
    );

    CharacteristicsDomController.setPredictedClassInitialValue(
      StateController.predictedClass
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
