"use strict";

class HttpException {
  async HttpBadGateway(res) {
    return res.status(502).json({
      success: false,
      message: "Bad gateway",
    });
  }

  async HttpBadRequest(res) {
    return res.status(400).json({
      success: false,
      message:
        "Bad Request. The server could not understand the request due to invalid syntax.",
      api_version: 'HospitalWFManagement-v1.1' + new Date().toString(),
    });
  }

  async HttpUnAuthorized(res) {
    return res.status(403).json({
      success: "false",
      message:
        "UnAuthorized. The client does not have access rights to the content;",
      api_version: 'HospitalWFManagement-v1.1' + new Date().toString(),
    });
  }
  async HttptokenExpired(res, err) {
    return res.status(401).json({
      success: "false",
      message: "token Expire or Broken.",
      data: err,
    });
  }

  async HttpUnAuthenticate(res) {
    return res.status(401).json({
      success: "false",
      message:
        "UnAuthenticate. the client must authenticate it self to get the requested response.",
      api_version: 'HospitalWFManagement-v1.1' + new Date().toString(),
    });
  }

  async HttpInvalidSignature(res) {
    return res.status(400).json({
      success: "false",
      message:
        "Invalid Signature. the signature must valid in payload + hask key",
      api_version: 'HospitalWFManagement-v1.1' + new Date().toString(),
    });
  }

  async HttpInvalidCLientKey(res) {
    return res.status(400).json({
      success: "false",
      message: "Invalid ClientKey. the ClientKey must valid base64(key)",
      api_version: 'HospitalWFManagement-v1.1' + new Date().toString(),
    });
  }

  async HttpNotFound(res, data) {
    return res.status(404).json({
      success: "false",
      message: "The server can not find the requested resource.",
      data: data ? data : "{}",
      api_version: 'HospitalWFManagement-v1.1' + new Date().toString(),
    });
  }

  async HttpinteralServerError(res, error) {
    return res.status(500).json({
      success: "false",
      message: "Internal Server Error",
      data: error,
      api_version: 'HospitalWFManagement-v1.1' + new Date().toString(),
    });
  }

  async HttpSuccess(res, data) {
    return res.status(200).json({
      success: true,
      message: "The request has succeeded",
      data: data,
      api_version: 'HospitalWFManagement-v1.1' + new Date().toString(),
    });
  }

  async HttpSuccessCreate(res, data) {
    return res.status(201).json({
      success: "true",
      message:
        "The request has succeeded and a new resource has been created as a result.",
      data: data,
      api_version: 'HospitalWFManagement-v1.1' + new Date().toString(),
    });
  }

  async HttpSuccessUpdate(res, data) {
    return res.status(201).json({
      success: "true",
      message: "The request has succeeded and a resource has been updated.",
      data: data,
      api_version: 'HospitalWFManagement-v1.1' + new Date().toString(),
    });
  }

  async HttpConflict(res, data) {
    return res.status(409).json({
      success: "false",
      message:
        "This response is sent when a request conflicts with the current state of the server.",
      data: data,
      api_version: 'HospitalWFManagement-v1.1' + new Date().toString(),
    });
  }

  async HttpUnprocessable(res, data) {
    return res.status(422).json({
      success: "false",
      message: "Some attributes required",
      data: data,
      api_version: 'HospitalWFManagement-v1.1' + new Date().toString(),
    });
  }

  async HttpInvalid(res, message, data) {
    return res.status(422).json({
      success: "false",
      message: message,
      data: data,
      api_version: 'HospitalWFManagement-v1.1' + new Date().toString(),
    });
  }
}

module.exports = new HttpException();
