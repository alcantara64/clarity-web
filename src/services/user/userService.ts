
import { ApiResponse } from "./../api/apiResponse";
import { HttpService } from "./../httpService";
import { DATA_SOURCE } from "./../../enums/dataSource";
export class UserService {
  private httpService:HttpService;
  constructor(){
  this.httpService = new HttpService()
  }
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
    const response = await httpService.delete("/data/disconnect", {
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
  async forgotPassword(token:string, email:string){
    const response = await this.httpService.post("/user/forgot_password", {email, device_id:'web', tenantId:process.env.REACT_APP_TENANT_ID}, {
      headers: {
        Authorization: `JWT ${token}`,
      }
    });
    return response;
  }
  async resetPassword(token:string, payload:any){
    const httpService: HttpService = new HttpService();
    const response = await httpService.post("/user/reset_password", {...payload, tenantId:process.env.REACT_APP_TENANT_ID}, {
      headers: {
        Authorization: `JWT ${token}`,
      }
    });
    return response;
  }
  async verifyResetCode(token:string, payload:{code:string, token:string, device_id:string}){
    const httpService: HttpService = new HttpService();
    const response = await httpService.post("/user/reset_code", {...payload, tenantId:process.env.REACT_APP_TENANT_ID}, {
      headers: {
        Authorization: `JWT ${token}`,
      }
    });
    return response;
  }
}
