import { StateController } from "../../components/state-controller";
import { MappingController } from "../../components/mapping-controller";

export class ClassInspectionPageDomController {
  static events = new EventTarget();

  static getConfirmButton() {
    const confirmButton = document.querySelector(
      "#class_inspection_page_confirm_button"
    );

    if (!confirmButton) {
      throw new Error("Confirm Button was not found in the DOM");
    }

    return confirmButton;
  }

  static getAside() {
    const classInspectionPageAside = document.querySelector(
      "#class_inspection_page_aside"
    );

    if (!classInspectionPageAside) {
      throw new Error("Class Inspection Page Aside was not found in the DOM");
    }

    return classInspectionPageAside as HTMLElement;
  }

  static getSection() {
    const classInspectionSection = document.querySelector(
      "#class_inspection_page_section"
    );

    if (!classInspectionSection) {
      throw new Error("Class Inspection Section was not found in the DOM");
    }

    return classInspectionSection as HTMLElement;
  }

  static async handleConfirmButtonClick() {
    const classInspectionPageAside =
      ClassInspectionPageDomController.getAside();
    classInspectionPageAside.hidden = true;

    const classInspectionPageSection =
      ClassInspectionPageDomController.getSection();
    classInspectionPageSection.hidden = true;

    ClassInspectionPageDomController.remove();

    ClassInspectionPageDomController.events.dispatchEvent(new Event("done"));
  }

  static init() {
    const classInspectionPageAside =
      ClassInspectionPageDomController.getAside();
    classInspectionPageAside.hidden = false;

    const classInspectionPageSection =
      ClassInspectionPageDomController.getSection();
    classInspectionPageSection.hidden = false;

    const confirmButton = ClassInspectionPageDomController.getConfirmButton();

    confirmButton.addEventListener(
      "click",
      ClassInspectionPageDomController.handleConfirmButtonClick
    );

    document.querySelector("#class_inspection_page_description")!.textContent =
      MappingController.mapPredictedClassToLabel(
        StateController.predictedClass
      );
  }

  static remove() {
    const confirmButton = ClassInspectionPageDomController.getConfirmButton();

    confirmButton.removeEventListener(
      "click",
      ClassInspectionPageDomController.handleConfirmButtonClick
    );
  }

  static awaitStepCompleted() {
    return new Promise((resolve) => {
      ClassInspectionPageDomController.events.addEventListener("done", resolve);
    });
  }
}
