
import { AUTH_GRANT_TYPES } from "./../../constants/constants";
import { ApiResponse } from "./../api/apiResponse";
import { HttpService } from "./../httpService";
import { DATA_SOURCE } from "./../../enums/dataSource";
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
  async disconnectFromDataSource(token:string, dataSourceId:string, type:DATA_SOURCE): Promise<ApiResponse> {
    const httpService: HttpService = new HttpService();
    const response = await httpService.delete("/data/disconnect", null, {
      headers: {
        Authorization: `JWT ${token}`,
      },
      data:{
        data_source:type,
        data_source_id:dataSourceId
      }
    });
    return response;
  }
}
