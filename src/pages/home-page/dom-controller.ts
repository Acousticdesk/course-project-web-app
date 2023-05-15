export class HomePageDomController {
  static events = new EventTarget();

  static getStartButton() {
    const button = document.querySelector("#home_page_start_button");

    if (!button) {
      throw new Error("Start Button was not found in the DOM");
    }

    return button;
  }

  static getAside() {
    const homePageAside = document.querySelector("#home_page_aside");

    if (!homePageAside) {
      throw new Error("Home Page Aside was not found in the DOM");
    }

    return homePageAside as HTMLElement;
  }

  static getSection() {
    const homeSection = document.querySelector("#home_page_section");

    if (!homeSection) {
      throw new Error("Home Section was not found in the DOM");
    }

    return homeSection as HTMLElement;
  }

  static handleStartButtonClick() {
    HomePageDomController.remove();
  }

  static init() {
    const startButton = HomePageDomController.getStartButton();

    startButton.addEventListener(
      "click",
      HomePageDomController.handleStartButtonClick
    );
  }

  static remove() {
    const homePageAside = HomePageDomController.getAside();
    homePageAside.hidden = true;

    const homePageSection = HomePageDomController.getSection();
    homePageSection.hidden = true;

    const startButton = HomePageDomController.getStartButton();

    startButton.removeEventListener(
      "click",
      HomePageDomController.handleStartButtonClick
    );

    HomePageDomController.events.dispatchEvent(new Event("done"));
  }

  static awaitStepCompleted() {
    return new Promise((resolve) => {
      HomePageDomController.events.addEventListener("done", resolve);
    });
  }
}
