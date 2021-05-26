import { HttpService } from './../httpService';
export class NotificationService{
   private httpService:HttpService;
    constructor(){
    this.httpService = new HttpService();
    }
  getNotifications(token:string){
  return this.httpService.get('/notifications',null,
  {
    headers: {
      Authorization: `JWT ${token}`,
    },
  })
   } 

}