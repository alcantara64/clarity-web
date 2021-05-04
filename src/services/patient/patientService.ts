import { AUTH_GRANT_TYPES } from "./../../constants/constants";
import { ApiResponse } from "./../api/apiResponse";
import { HttpService } from "./../httpService";

export class PatientService {
  async getFhirData(
    token: string,
    resource: string,
    payerID: string
  ): Promise<ApiResponse> {
    const httpService: HttpService = new HttpService();

    const response = await httpService.get(
      `/patient/timeline/${resource}/${payerID}`,
      null,
      {
        headers: {
          Authorization: `JWT ${token}`,
        },
      }
    );

    return response;
  }
}
