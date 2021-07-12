
import { ApiResponse } from "./../api/apiResponse";
import { HttpService } from "./../httpService";
export class SettingService {
    private httpService: HttpService;
    constructor() {
        this.httpService = new HttpService()
    }
    async getSettings(token: string): Promise<ApiResponse> {
        const response = await this.httpService.get("/setting", null, {
            headers: {
                Authorization: `JWT ${token}`,
            },
        });

        return response;
    }

    async createSetting(token: string, payload: any): Promise<ApiResponse> {
        const response = await this.httpService.post("/user", payload, {
            headers: {
                Authorization: `JWT ${token}`,
            },
        });

        return response;
    }
    async updateSetting(token: string, _id: string, payload: any): Promise<ApiResponse> {
        const response = await this.httpService.put("/data/disconnect", payload, {
            headers: {
                Authorization: `JWT ${token}`,
            },
        });
        return response;
    }
    async forgotPassword(token: string, email: string) {
        const response = await this.httpService.post("/user/forgot_password", { email, device_id: 'web', tenantId: process.env.REACT_APP_TENANT_ID }, {
            headers: {
                Authorization: `JWT ${token}`,
            }
        });
        return response;
    }
    async resetPassword(token: string, payload: any) {
        const httpService: HttpService = new HttpService();
        const response = await httpService.post("/user/reset_password", { ...payload, tenantId: process.env.REACT_APP_TENANT_ID }, {
            headers: {
                Authorization: `JWT ${token}`,
            }
        });
        return response;
    }
    async verifyResetCode(token: string, payload: { code: string, token: string, device_id: string }) {
        const httpService: HttpService = new HttpService();
        const response = await httpService.post("/user/reset_code", { ...payload, tenantId: process.env.REACT_APP_TENANT_ID }, {
            headers: {
                Authorization: `JWT ${token}`,
            }
        });
        return response;
    }
}
