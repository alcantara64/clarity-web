import { AUTH_GRANT_TYPES } from "./../../constants/constants";
import { ApiResponse } from "./../api/apiResponse";
import { HttpService } from "./../httpService";

export class UserService {
  async getProfile(token: string): Promise<ApiResponse> {
    const httpService: HttpService = new HttpService();

    const response = await httpService.get("/user/profile", null, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    });

    return response;
  }

  async signUp(payload: any): Promise<ApiResponse> {
    const httpService: HttpService = new HttpService();

    const response = await httpService.post("/user", payload);

    return response;
  }
}
