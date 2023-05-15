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
    ceilingHeight,
    numApartmentsTotal,
    floor,
    crimeRateInDistrict,
    predictedClass,
  }: CharacteristicsFormData) {
    return {
      area: Number(area),
      rooms: Number(rooms),
      ceilingHeight: Number(ceilingHeight),
      numApartmentsTotal: Number(numApartmentsTotal),
      floor: Number(floor),
      crimeRateInDistrict: Number(crimeRateInDistrict),
      predictedClass: Number(predictedClass),
    };
  }
}
