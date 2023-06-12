import { HttpResponseBase } from "@angular/common/http";

export interface LoginResponse extends HttpResponseBase  {
    access_token: string;
}