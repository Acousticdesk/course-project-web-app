export class MappingController {
  static predictedClassMapping: { [key: string]: string } = {
    0: "Преміум",
    1: "Бізнес",
    2: "Комфорт",
    3: "Економ",
  };

  static mapPredictedClassToLabel(predictedClass: string) {
    return MappingController.predictedClassMapping[predictedClass];
  }
}
