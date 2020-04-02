import { Component, ElementRef, OnInit } from '@angular/core';
@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})

export class VideoPlayerComponent implements OnInit {
  videoUrl="../../assets/video1.mp4";
  
  //public myVideo: HTMLVideoElement;
  constructor(private el: ElementRef) {
  }
  
  ngOnInit(): void {
    
  }
  // ngAfterViewInit():void {
  //   this.myVideo= this.el.nativeElement.querySelector('#myVideo');
  //   //console.log(this.myVideo);
    
  // }
  

}
