export class StateController {
  static predictedClass = "";

  static setPredictedClass(predictedClass: string) {
    StateController.predictedClass = predictedClass;
  }
}
