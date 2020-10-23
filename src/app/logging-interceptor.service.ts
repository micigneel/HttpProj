import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class LoggingIntercaptorService implements HttpInterceptor{

  intercept(request : HttpRequest<any>, next : HttpHandler ){
    console.log("In LoggingIntercaptorService");
    console.log("Headers : "+request.headers);

    return next.handle(request).pipe(
      tap( event =>{
        if(event.type === HttpEventType.Response){
          console.log("Response from LoggingIntercaptorService");

        }
      })
    )
  }
}
