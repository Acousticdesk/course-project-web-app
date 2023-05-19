export enum ApiEnums {
  BASE_URL = "http://ec2-13-59-218-102.us-east-2.compute.amazonaws.com",
}

export enum ApiRouteEnums {
  CLASS_PREDICTION_ENDPOINT = `${ApiEnums.BASE_URL}/class-prediction`,
  PRICE_PREDICTION_ENDPOINT = `${ApiEnums.BASE_URL}/price-prediction`,
}
