import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { VideoDetails } from './videoDetails';
import { EventManager } from '@angular/platform-browser';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-video-url-management',
  templateUrl: './video-url-management.component.html',
  styleUrls: ['./video-url-management.component.css']
})

export class VideoUrlManagementComponent implements OnInit {
  constructor(private http: HttpClient, private render: Renderer2, private el: ElementRef, private em: EventManager) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  match = /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/;
  videoCount: number;
  videoDetails: VideoDetails[] = [];
  videoDetail: VideoDetails;
  editBtn: NodeListOf<HTMLElement>;
  delBtn;
  approveBtn;

  showId;


  ngOnInit(): void {
    /* this.http.get('assets/videoDetails.json').subscribe((data: VideoDetails[]) => {
      this.videoDetails = data;
      this.generateVideoDetail();
    }) */
    //use json-server as FAKE REST API
    this.http.get('http://localhost:3000/vedios').subscribe((data: VideoDetails[]) => {
      this.videoDetails = data;
      this.videoCount = data.length;
      this.generateVideoDetail();

    })
      ;
    setTimeout(() => {
      /*    for (let i = 0; i < this.editBtn.length; i++) {
           console.log(this.editBtn[i]);
           this.render.listen(this.editBtn[i], 'click', (event) => {
             this.editVideoDetails();
           });
         }
   
         this.render.listen(this.delBtn, 'click', (event) => {
           this.deleteVideoDetails();
         });
         this.render.listen(this.approveBtn, 'click', (event) => {
           this.approveVideoDetails();
         }); */
      fromEvent(this.editBtn, 'click').subscribe((event) => {
        console.log("listen editBtn click");
        this.editVideoDetails(event);
      });
      fromEvent(this.delBtn, 'click').subscribe(() => {
        console.log("listen delBtn click");
        this.deleteVideoDetails(event);
      });
      fromEvent(this.approveBtn, 'click').subscribe(() => {
        console.log("listen approveBtn click");
        this.approveVideoDetails(event);
      });
    }, 1000);


  }



  addVideoDetails() {
    let title: HTMLInputElement = document.getElementById('title') as HTMLInputElement;
    let youURL: HTMLInputElement = document.getElementById('youURL') as HTMLInputElement;
    if (this.match.test(youURL.value)) {

      let vd = new VideoDetails();
      vd.title = title.value;
      vd.url = youURL.value;
      this.http.post<VideoDetails>('http://localhost:3000/vedios', vd, this.httpOptions).subscribe();
    } else {
      confirm("pls input correct format url");
      youURL.value = "";
    }
  }

  editVideoDetails(event) {
    let index = this.getClickBtnIndex(event);

    let showId: HTMLTableDataCellElement = document.getElementById('videoShowId' + index) as HTMLTableDataCellElement;
    let showTitle: HTMLTableDataCellElement = document.getElementById('showTitle' + index) as HTMLTableDataCellElement;
    let showURL: HTMLTableDataCellElement = document.getElementById('showURL' + index) as HTMLTableDataCellElement;
    let title: HTMLInputElement = document.getElementById('title') as HTMLInputElement;
    let youURL: HTMLInputElement = document.getElementById('youURL') as HTMLInputElement;
    let editConfirmBtn: HTMLButtonElement = document.getElementById('editConfirmBtn') as HTMLButtonElement;
    let addBtn: HTMLButtonElement = document.getElementById('addBtn') as HTMLButtonElement;
    editConfirmBtn.disabled = false;
    addBtn.disabled = true;
    title.value = showTitle.innerHTML;
    youURL.value = showURL.innerHTML;

    this.showId = showId.innerHTML;


    let approveBtn: HTMLButtonElement = document.getElementById('approveBtn' + index) as HTMLButtonElement;
    approveBtn.disabled=false;

  }
  editVideoConfirm() {
    let title: HTMLInputElement = document.getElementById('title') as HTMLInputElement;
    let youURL: HTMLInputElement = document.getElementById('youURL') as HTMLInputElement;
    if (this.match.test(youURL.value)) {

      let vd = new VideoDetails();
      vd.title = title.value;
      vd.url = youURL.value;
      this.http.put<VideoDetails>('http://localhost:3000/vedios/' + this.showId, vd, this.httpOptions).subscribe();
    } else {
      confirm("pls input correct format url");
      youURL.value = "";
    }


    

  }
  deleteVideoDetails(event) {
    let index = this.getClickBtnIndex(event);

    let showId: HTMLTableDataCellElement = document.getElementById('videoShowId' + index) as HTMLTableDataCellElement;
    this.showId = showId.innerHTML;
    this.http.delete('http://localhost:3000/vedios/' + this.showId).subscribe();
  }
  approveVideoDetails(event) {
    let index = this.getClickBtnIndex(event);
    let approveBtn: HTMLButtonElement = document.getElementById('approveBtn' + index) as HTMLButtonElement;
    approveBtn.disabled=true;
  }

  getClickBtnIndex(event): string {
    event = event ? event : window.event;
    var clickBtn = event.srcElement ? event.srcElement : event.target;
    var index = clickBtn.id.replace(/[^0-9]/ig, "");
    return index;
  }

  generateVideoDetail() {
    for (var i = 0; i != this.videoDetails.length; ++i) {

      var videoDetailList = document.getElementById("videoDetailList");
      var trNode = document.createElement('tr');
      var id = document.createElement('td');
      id.setAttribute("id", "videoShowId" + i);
      id.innerHTML = this.videoDetails[i].id.toFixed();
      var title = document.createElement('td');
      title.setAttribute("id", "showTitle" + i);
      title.innerHTML = this.videoDetails[i].title;
      var url = document.createElement('td');
      url.setAttribute("id", "showURL" + i);
      url.innerHTML = this.videoDetails[i].url;
      var edit = document.createElement('td');
      var deleted = document.createElement('td');
      var approve = document.createElement('td');
      edit.innerHTML = '<button class="btn btn-info " name="editBtn" id="editBtn' + i + '" >Edit</button>';
      deleted.innerHTML = '<button class="btn btn-danger" name="delBtn" id="delBtn' + i + '" >Delete</button>';
      approve.innerHTML = '<button class="btn btn-success" name="approveBtn" id="approveBtn' + i + '">Approve</button>';
      trNode.appendChild(id);
      trNode.appendChild(title);
      trNode.appendChild(url);
      trNode.appendChild(edit);
      trNode.appendChild(deleted);
      trNode.appendChild(approve);

      videoDetailList.appendChild(trNode);


    }
    this.editBtn = document.getElementsByName('editBtn') as NodeListOf<HTMLElement>;
    this.delBtn = document.getElementsByName('delBtn') as NodeListOf<HTMLElement>;
    this.approveBtn = document.getElementsByName('approveBtn') as NodeListOf<HTMLElement>;
    // let test = this.el.nativeElement.querySelector('#editBtn');
  }

}
