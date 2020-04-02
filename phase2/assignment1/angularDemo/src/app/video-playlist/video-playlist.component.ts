import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-playlist',
  templateUrl: './video-playlist.component.html',
  styleUrls: ['./video-playlist.component.css']
})
export class VideoPlaylistComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    var lis = document.getElementsByTagName("li");
    for (var i = 0; i < lis.length; i++) {

      lis[i].onclick = function () {
        const video: HTMLVideoElement = document.getElementById('myVideo') as HTMLVideoElement;
        const pauseBtn: HTMLButtonElement = document.getElementById('pauseBtn') as HTMLButtonElement;
        const playBtn: HTMLButtonElement = document.getElementById('playBtn') as HTMLButtonElement;
        let currentLi:HTMLLIElement = this as HTMLLIElement;
        for (var j = 0; j < lis.length; j++) {
          video.setAttribute("src",currentLi.getAttribute("value"));
          video.setAttribute('autoplay', 'autoplay');
          pauseBtn.disabled = false;
          playBtn.disabled = true;
        }
      }
    }
  }


}
