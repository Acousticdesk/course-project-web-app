import { HomePageDomController } from "../pages/home-page";
import { DescriptionPageDomController } from "../pages/description-page";

export class ScenarioController {
  static async init() {
    HomePageDomController.init();
    await HomePageDomController.awaitStepCompleted();

    DescriptionPageDomController.init();
  }
}
