export class StateController {
  static predictedClass = "";
  static predictedPrice = "";

  static setPredictedClass(predictedClass: string) {
    StateController.predictedClass = predictedClass;
  }

  static setPredictedPrice(predictedPrice: string) {
    StateController.predictedPrice = predictedPrice;
  }
}
