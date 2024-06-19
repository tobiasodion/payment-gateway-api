export enum PaymentStatus {
  PENDING = "pending",
  AUTHORIZED = "authorized",
  DECLINED = "declined",
}

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
}
