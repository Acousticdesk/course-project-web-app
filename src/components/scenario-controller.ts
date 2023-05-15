import { HomePageDomController } from "../pages/home-page";
import { DescriptionPageDomController } from "../pages/description-page";
import { ClassInspectionPageDomController } from "../pages/class-inspection-page";
import { CharacteristicsDomController } from "../pages/characteristics-page";

export class ScenarioController {
  static async init() {
    HomePageDomController.init();
    await HomePageDomController.awaitStepCompleted();

    DescriptionPageDomController.init();
    await DescriptionPageDomController.awaitStepCompleted();

    ClassInspectionPageDomController.init();
    await ClassInspectionPageDomController.awaitStepCompleted();

    CharacteristicsDomController.init();
    await CharacteristicsDomController.awaitStepCompleted();
  }
}
