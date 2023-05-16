import { CharacteristicsFormData } from "./characteristics/interfaces";

export class FormDataController {
  static serialize(formData: FormData) {
    const result: { [key: string]: string } = {};

    for (let [key, value] of formData) {
      result[key] = value as string;
    }

    return result;
  }

  static preparePricePredictionPayload({
    area,
    rooms,
    crimeRateInDistrict,
    predictedClass,
    district,
    address,
  }: CharacteristicsFormData) {
    return {
      area: Number(area),
      rooms: Number(rooms),
      crimeRateInDistrict: Number(crimeRateInDistrict),
      predictedClass: Number(predictedClass),
      district,
      address,
    };
  }
}
