export enum ApiEnums {
  BASE_URL = "http://localhost:5000",
}

export enum ApiRouteEnums {
  CLASS_PREDICTION_ENDPOINT = `${ApiEnums.BASE_URL}/class-prediction`,
  PRICE_PREDICTION_ENDPOINT = `${ApiEnums.BASE_URL}/price-prediction`,
}
