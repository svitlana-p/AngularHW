import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../core/auth.service";


@Injectable()
export class TokenInterceptop implements HttpInterceptor {
    constructor(private auth: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.auth.isAuthenticated()) {
            req = req.clone({
                setHeaders: {
                    authorization: `BearerToken ${this.auth.getToken()}`
                }
            })
        }
        return next.handle(req)
    }
}