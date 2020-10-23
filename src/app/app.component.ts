import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from './post.model';
import { PostService } from './post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;

  subs = new Subscription();

  constructor(private postSer : PostService) {}

  ngOnInit() {
    this.subs = this.postSer.errorSub.subscribe(
      erMess =>{
        this.error = erMess;
      }
    );
    this.fetchPost();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postSer.onCreateAndStorePost(postData.title , postData.content);

  }

  onFetchPosts() {
    // Send Http request
    this.fetchPost();
  }

  onClearPosts() {
    // Send Http request
    this.postSer.onDeletePosts();
    this.fetchPost();
  }

  fetchPost(){
    this.isFetching = true;
    this.postSer.OnFetchPosts().subscribe(
      (posts : Post[])=>{
        this.isFetching = false;
        this.loadedPosts = posts
      },
      (error)=>{
        this.isFetching = false;
        this.error = error.message;
      }
    );
  }

  handleError(){
    this.error = null;
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

}
