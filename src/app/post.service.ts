import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Post } from './post.model';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn : 'root'
})
export class PostService{

  errorSub = new Subject<string>();

  constructor(private http : HttpClient){}

  onCreateAndStorePost(title : string , content : string){
    let postData : Post = {title : title , content : content};
    this.http
      .post<{ name: string }>(
        'https://my-http-cams-project.firebaseio.com/post.json',
        postData,
        {
          observe : 'response'
        }
      )
      .subscribe(responseData => {
        console.log(responseData);
      },
      error =>{
        this.errorSub.next(error.message);
      });
  }

  OnFetchPosts(){
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');
    return this.http
      .get<{ [key: string]: Post }>(
        'https://my-http-cams-project.firebaseio.com/post.json',
        {
          headers : new HttpHeaders({
            'Custom-Header' : 'Hi Cams'
          }),
          params : searchParams
        }
      )
      .pipe(
        map(responseData => {
          console.log("responseData"+responseData)
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError( errRes =>{
          //logic
          return throwError(errRes);
        })
      );
  }

  onDeletePosts(){
    this.http
      .delete<{ [key: string]: Post }>(
        'https://my-http-cams-project.firebaseio.com/post.json',
        {
          observe : 'events'
        }
      )
      .pipe(
        tap( event=>{
          console.log(event)
          if(event.type === HttpEventType.Sent){
            console.log("Sent");
          }
          if(event.type === HttpEventType.Response){
            console.log(event.body);
          }
        })
      )
      .subscribe(
        (response)=>{
          console.log(response)
        }
      );
  }

}
