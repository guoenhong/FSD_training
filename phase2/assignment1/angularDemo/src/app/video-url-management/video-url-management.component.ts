import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'
import { VideoDetails } from './videoDetails';
import { element } from 'protractor';

@Component({
  selector: 'app-video-url-management',
  templateUrl: './video-url-management.component.html',
  styleUrls: ['./video-url-management.component.css']
})

export class VideoUrlManagementComponent implements OnInit {
  constructor(private http: HttpClient) { }

  videoDetails: VideoDetails[] = [];
  videoDetail: VideoDetails;
  ngOnInit(): void {
    this.http.get('assets/videoDetails.json').subscribe((data: VideoDetails[]) => {
      this.videoDetails = data;
      this.generateVideoDetail();
    })

    
  }
  addVideoDetails() {

  }

  generateVideoDetail(){
    for (var i = 0; i != this.videoDetails.length; ++i) {

      var videoDetailList = document.getElementById("videoDetailList");  
      var trNode = document.createElement('tr');
      var id = document.createElement('td');
      id.innerHTML=this.videoDetails[i].id.toFixed();
      var title = document.createElement('td');
      title.innerHTML=this.videoDetails[i].title;
      var url = document.createElement('td');
      url.innerHTML=this.videoDetails[i].url;
      var edit = document.createElement('td');
      var deleted = document.createElement('td');
      var approve = document.createElement('td');
      edit.innerHTML='<button class="btn btn-info">Edit</button>';
      deleted.innerHTML='<button class="btn btn-danger">Delete</button>';
      approve.innerHTML='<button class="btn btn-success">Approve</button>';
      trNode.appendChild(id);
      trNode.appendChild(title);
      trNode.appendChild(url);
      trNode.appendChild(edit);
      trNode.appendChild(deleted);
      trNode.appendChild(approve);

      videoDetailList.appendChild(trNode);
      

    }
  }

}
