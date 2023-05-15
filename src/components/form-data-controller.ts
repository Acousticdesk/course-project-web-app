export class FormDataController {
  static serialize(formData: FormData) {
    const result = {};

    for (let [key, value] of formData) {
      result[key] = value;
    }

    return result;
  }
}
