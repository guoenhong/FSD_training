import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-video-control',
  templateUrl: './video-control.component.html',
  styleUrls: ['./video-control.component.css']
})
export class VideoControlComponent implements OnInit {

  private myVideo;
  private playBtn;
  private pauseBtn;
  private current;
  private loadingPct;
  private duration;
  private completedFlag;
  private myProgressbar;
  private likeCount = 0;
  private unlikeCount = 0;
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.myVideo = document.getElementById('myVideo');
    this.playBtn = document.getElementById('playBtn');
    this.pauseBtn = document.getElementById('pauseBtn');
    // this.playBtn= this.el.nativeElement.querySelector('#playBtn');
    // this.pauseBtn= this.el.nativeElement.querySelector('#pauseBtn');
    // console.log(this.myVideo);
    // console.log(this.current);
    this.pauseBtn.disabled = false;
    this.playBtn.disabled = true;

    


    this.myVideo.addEventListener("timeupdate", function () {
      const video: HTMLVideoElement = document.getElementById('myVideo') as HTMLVideoElement;
      const current: HTMLSpanElement = document.getElementById('current') as HTMLSpanElement;
      const duration: HTMLSpanElement = document.getElementById('duration') as HTMLSpanElement;
      const loadingPct: HTMLSpanElement = document.getElementById('loadingPct') as HTMLSpanElement;
      const completedFlag: HTMLSpanElement = document.getElementById('completedFlag') as HTMLSpanElement;
      const myProgressbar: HTMLProgressElement = document.getElementById('myProgressbar') as HTMLProgressElement;
      let currentTime = video.currentTime;
      let durationTime = video.duration;
      current.innerHTML = ("Current: " + currentTime.toFixed(0) + " s");
      duration.innerHTML = ("Total: " + durationTime.toFixed(0) + " s");
      var a = currentTime / durationTime;
      var b = (a * 100).toFixed(0) + "%";
      myProgressbar.style.width = b;
      loadingPct.innerHTML = (b);
      if (currentTime == durationTime) {
        completedFlag.innerHTML = ("(play completed)");
      }
    }, false);


    
  

  }


  playVideo(): void {
    this.myVideo.play();
    this.pauseBtn.disabled = false;
    this.playBtn.disabled = true;

  }

  pauseVideo(): void {
    this.myVideo.pause();
    this.pauseBtn.disabled = true;
    this.playBtn.disabled = false;
  }
  volumeUp(): void {
    let vol = this.myVideo.volume;
    if (vol < 0.99) {
      vol += 0.1;
      this.myVideo.volume = vol;
    }
  }

  volumeDown(): void {
    let vol = this.myVideo.volume;
    if (vol > 0.2) {
      vol = vol - 0.1;
      this.myVideo.volume = vol;
    }
  }

  reloadVideo(): void {
    this.myVideo.load();
    this.myVideo.play();
    this.pauseBtn.disabled = false;
    this.playBtn.disabled = true;
    this.myVideo.volume = 0.5;
  }

  muteVideo(): void {
    let isMute = this.myVideo.muted;
    if (isMute) {
      isMute = false;
    } else {
      isMute = true;
    }
    this.myVideo.muted = isMute;
  }
  /* saveData(): any {
  } */
  like(): void {
    const like: HTMLSpanElement = document.getElementById('like') as HTMLSpanElement;
    this.likeCount = Number(this.likeCount)+1;
    like.innerHTML=(this.likeCount.toFixed());
  }
  unlike(): void {
    const unlike: HTMLSpanElement = document.getElementById('unlike') as HTMLSpanElement;
    this.unlikeCount = Number(this.unlikeCount)+1;
    unlike.innerHTML=(this.unlikeCount.toFixed());
  }
}
