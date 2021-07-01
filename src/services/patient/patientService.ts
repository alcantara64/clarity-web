import { ApiResponse } from "./../api/apiResponse";
import { HttpService } from "./../httpService";

export class PatientService {
  async getFhirData(
    token: string,
    resource: string,
    payerID: string,
    params:FhirServerQueryParams | null
  ): Promise<ApiResponse> {
    const httpService: HttpService = new HttpService();
    const response = await httpService.get(
      `/patient/timeline/${resource}/${payerID}?startIndex=${params?.startIndex || 0}&_count=${params?._count || ''}&patient=${params?.patient || ''}&next_link=${params?.next_link || ''}&resource_endpoint=${params?.resourceEndpoint}`,
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

export interface FhirServerQueryParams{
  startIndex?:string;
  _count?:number;
  patient?:string;
  next_link:string;
  resourceEndpoint:string;
}