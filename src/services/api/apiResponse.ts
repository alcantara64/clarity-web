export class ApiResponse {
  kind: string = "";

  data?: any;
  statusText?: any;

  temporary?: any;

  constructor(kind: string, statusText?: any, data?: any, temporary?: any) {
    this.kind = kind;
    this.data = data;
    this.statusText = statusText;

    this.temporary = temporary;
  }
}
