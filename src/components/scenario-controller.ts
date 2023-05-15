import { HomePageDomController } from "../pages/home-page";
import { DescriptionPageDomController } from "../pages/description-page";

export class ScenarioController {
  static init() {
    HomePageDomController.init().addEventListener("done", () => {
      // todo akicha: to promise interface
      DescriptionPageDomController.init();
    });
  }
}
