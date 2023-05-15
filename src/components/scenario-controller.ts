import { HomePageDomController } from "../pages/home-page";
import { DescriptionPageDomController } from "../pages/description-page";
import { ClassInspectionPageDomController } from "../pages/class-inspection-page";
import { CharacteristicsDomController } from "../pages/characteristics-page";
import { PriceInspectionPageDomController } from "../pages/price-inspection-page";

export class ScenarioController {
  static async init() {
    HomePageDomController.init();
    await HomePageDomController.awaitStepCompleted();

    await ScenarioController.loop();
  }

  static async loop() {
    DescriptionPageDomController.init();
    await DescriptionPageDomController.awaitStepCompleted();

    ClassInspectionPageDomController.init();
    await ClassInspectionPageDomController.awaitStepCompleted();

    CharacteristicsDomController.init();
    await CharacteristicsDomController.awaitStepCompleted();

    PriceInspectionPageDomController.init();
    await PriceInspectionPageDomController.awaitStepCompleted();

    ScenarioController.loop();
  }
}
