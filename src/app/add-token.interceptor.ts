import { Injectable } from '@angular/core';
import {HttpInterceptor , HttpRequest , HttpHandler , HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';

/**
 * intercept all requests to add tokens
 */
@Injectable( )
export class AddTokenInterceptor implements HttpInterceptor {
    /**
     * user token
     */
    token: string;
    /** */
    formDataRequests=[
        
    ];
    /**
     * form data request
     */
    found:boolean=false;
    /**
     * add tokens for all requests except log in and sign up
     * @param req out request
     * @param next modifed request
     */
    intercept(req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        this.token = localStorage.getItem('TOKEN');
        let jsonReq: HttpRequest<any>;
        this.formDataRequests.forEach(element => {
            if(element === req.url)
                this.found =true;
        });
        if(!this.found) {
        jsonReq= req.clone({
            setHeaders: {'Content-Type': 'application/json' , 'authorization': `Bearer ${this.token}` }
        });
        } else {
            jsonReq= req.clone({
                setHeaders: { 'authorization': `Bearer ${this.token}` }
            });
            this.found = false;
        }
        return next.handle(jsonReq);
    }

}