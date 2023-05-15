export class MappingController {
  static predictedClassMapping: { [key: string]: string } = {
    3: "Преміум",
    2: "Бізнес",
    1: "Комфорт",
  };

  static mapPredictedClassToLabel(predictedClass: string) {
    return MappingController.predictedClassMapping[predictedClass];
  }
}
