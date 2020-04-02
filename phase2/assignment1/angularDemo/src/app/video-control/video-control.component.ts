import { Component, ElementRef,OnInit } from '@angular/core';

@Component({
  selector: 'app-video-control',
  templateUrl: './video-control.component.html',
  styleUrls: ['./video-control.component.css']
})
export class VideoControlComponent implements OnInit {

 
  constructor() { }

  ngOnInit(): void {
  }


  playVideo(): void {
    const video: HTMLVideoElement = document.getElementById('myVideo') as HTMLVideoElement;
    video.play();
  }

  pauseVideo(): void {
    const video: HTMLVideoElement = document.getElementById('myVideo') as HTMLVideoElement;
    video.pause();
  }
}
