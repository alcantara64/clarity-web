import { AUTH_GRANT_TYPES } from "./../../constants/constants";
import { ApiResponse } from "./../api/apiResponse";
import { HttpService } from "./../httpService";

export class PayerService {
  async getPayer(token: string): Promise<ApiResponse> {
    const httpService: HttpService = new HttpService();

    const response = await httpService.get("/payer", null, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    });

    return response;
  }

  async connectPayer(token: string, payload: any): Promise<ApiResponse> {
    const httpService: HttpService = new HttpService();

    const { payerId, code, codeVerifier, extraData } = payload;

    const grantType = extraData && extraData.grantType;
    const implicitData = extraData && extraData.implicitData;

    if (
      grantType === AUTH_GRANT_TYPES.password ||
      grantType === AUTH_GRANT_TYPES.clientCredentials
    ) {
      return await httpService.get(`/payer/${payerId}/code`, null, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
    } else if (implicitData) {
      return await httpService.get(
        `/payer/${payerId}/code?code=${code}&code_verifier=${codeVerifier}&access_token=${implicitData.access_token}&token_type=${implicitData.token_type}&expires_in=${implicitData.expires_in}&scope=${implicitData.scope}`,
        null,
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );
    }

    return await httpService.get(
      `/payer/${payerId}/code?code=${code}&code_verifier=${codeVerifier}`,
      null,
      {
        headers: {
          Authorization: `JWT ${token}`,
        },
      }
    );
  }
}
