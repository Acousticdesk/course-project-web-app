import { StateController } from "../../components/state-controller";
import { MappingController } from "../../components/mapping-controller";

export class PriceInspectionPageDomController {
  static events = new EventTarget();

  static getConfirmButton() {
    const confirmButton = document.querySelector(
      "#price_inspection_page_confirm_button"
    );

    if (!confirmButton) {
      throw new Error("Confirm Button was not found in the DOM");
    }

    return confirmButton;
  }

  static getAside() {
    const priceInspectionPageAside = document.querySelector(
      "#price_inspection_page_aside"
    );

    if (!priceInspectionPageAside) {
      throw new Error("Price Inspection Page Aside was not found in the DOM");
    }

    return priceInspectionPageAside as HTMLElement;
  }

  static getSection() {
    const priceInspectionSection = document.querySelector(
      "#price_inspection_page_section"
    );

    if (!priceInspectionSection) {
      throw new Error("Price Inspection Section was not found in the DOM");
    }

    return priceInspectionSection as HTMLElement;
  }

  static async handleConfirmButtonClick() {
    const priceInspectionPageAside =
      PriceInspectionPageDomController.getAside();
    priceInspectionPageAside.hidden = true;

    const priceInspectionPageSection =
      PriceInspectionPageDomController.getSection();
    priceInspectionPageSection.hidden = true;

    PriceInspectionPageDomController.remove();

    PriceInspectionPageDomController.events.dispatchEvent(new Event("done"));
  }

  static init() {
    const priceInspectionPageAside =
      PriceInspectionPageDomController.getAside();
    priceInspectionPageAside.hidden = false;

    const priceInspectionPageSection =
      PriceInspectionPageDomController.getSection();
    priceInspectionPageSection.hidden = false;

    const confirmButton = PriceInspectionPageDomController.getConfirmButton();

    confirmButton.addEventListener(
      "click",
      PriceInspectionPageDomController.handleConfirmButtonClick
    );

    document.querySelector(
      "#price_inspection_page_description"
    )!.textContent = `${StateController.predictedPrice}, грн.`;
  }

  static remove() {
    const confirmButton = PriceInspectionPageDomController.getConfirmButton();

    confirmButton.removeEventListener(
      "click",
      PriceInspectionPageDomController.handleConfirmButtonClick
    );
  }

  static awaitStepCompleted() {
    return new Promise((resolve) => {
      PriceInspectionPageDomController.events.addEventListener("done", resolve);
    });
  }
}
