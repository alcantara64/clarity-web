import { ApiResponse } from "./../api/apiResponse";
import { HttpService } from "./../httpService";

export class AuthService {
  async userLogin(payload: any): Promise<ApiResponse> {
    const httpService: HttpService = new HttpService();

    const response = await httpService.post("/user/sign_in", payload);

    return response;
  }
}
