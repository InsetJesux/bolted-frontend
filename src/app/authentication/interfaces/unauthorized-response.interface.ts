import { HttpResponseBase } from "@angular/common/http";

export interface UnauthorizedResponse extends HttpResponseBase {
    statusCode: number;
    message:    string;
}