export class MappingController {
  static predictedClassMapping: { [key: string]: string } = {
    0: "преміум",
    1: "бізнес",
    2: "комфорт",
    3: "економ",
  };

  static mapPredictedClassToLabel(predictedClass: string) {
    return MappingController.predictedClassMapping[predictedClass];
  }
}
