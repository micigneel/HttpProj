import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor{

  intercept( request : HttpRequest<any>, next : HttpHandler){
      console.log("Request is on it way");
      console.log("URL : "+request.url)
      const modifiedReq = request.clone({
        headers : request.headers.append('cams', '2504'),
        params : request.params.append('Rak', '720')
      });
      return next.handle(modifiedReq).pipe(
        tap( event =>{
          console.log(event)
          if(event.type === HttpEventType.Response){
            console.log("Response Recived ");

          }
        })
      );
  }

}
