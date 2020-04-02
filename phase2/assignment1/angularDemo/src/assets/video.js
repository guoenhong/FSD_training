
//document.write('<script src="https://cdn.staticfile.org/jquery/2.1.1/jquery.min.js" type="text/javascript" charset="utf-8"></script>');

var myVideo=document.getElementById("myVideo"); 
var playBtn=document.getElementById("playBtn"); 
var pauseBtn=document.getElementById("pauseBtn"); 
let vol = myVideo.volume; 
let isMute = myVideo.muted

var video = document.getElementById("video");
var lis = document.getElementsByTagName("li");
var vLen = lis.length; 
var url = [];
var aside = document.getElementById("playList");
var curr = 1; 

for(var i=0;i<lis.length;i++){

    lis[i].onclick = function(){
        for(var j=0;j<lis.length;j++){
            myVideo.setAttribute("src",this.getAttribute("value")); 
            myVideo.setAttribute('autoplay','autoplay');
            pauseBtn.disabled=false;
            playBtn.disabled=true;                
            curr = j+1;

        }
    }
  }  
  $(document).ready(function(){
    
    $("#myVideo").on(
        "timeupdate", 
        function(event){
          onTrackedVideoFrame(this.currentTime, this.duration);
        });
    });
  function onTrackedVideoFrame(currentTime, duration){
  
      $("#current").text("Current: "+currentTime.toFixed(0)+" s");
      $("#duration").text("Total: "+duration.toFixed(0)+" s");
      var a=currentTime/duration;
      var b=(a*100).toFixed(0)+"%";
      document.getElementById('myProgressbar').style.width=b;
      $("#loadingPct").text(b);
      if(currentTime==duration){
        $("#completedFlag").text("(play completed)");
      }
  }

  window.onload=function(){
    pauseBtn.disabled=true;
    myVideo.volume=0.5;
    
  }
  function playVideo()
  { 
      myVideo.play(); 
      pauseBtn.disabled=false;
      playBtn.disabled=true;
  } 
  function pauseVideo()
  { 
    myVideo.pause(); 
    pauseBtn.disabled=true;
    playBtn.disabled=false;
  } 
    function volumeUp()
  { 
    if(vol<0.99){
      vol+=0.1;
      myVideo.volume=vol;
    }
  } 
  
    function volumeDown()
  { 
    if(vol>0.2){
      vol=vol-0.1;
      myVideo.volume=vol;
    }
  } 
  
    function reloadVideo()
  { 
    myVideo.load(); 
    myVideo.play();
    pauseBtn.disabled=false;
    playBtn.disabled=true;
    myVideo.volume=0.5;
  } 

  function muteVideo()
  { 
    if(isMute){
      isMute = false;
    }else{
      isMute = true;
    }
    myVideo.muted=isMute;
  } 

  function myProgress()
  {
      $("#myProgressbar").max=myVideo.duration;
  }

  function like()
  { 
    likeCount = Number(likeCount)+1;
    $("#like").text(likeCount);
    confirm("sorry, because of no server, so you need save like/unlike data to local storage, please click the right red save button, and save the json file to path 'xxx/\assignment', then delete the last version 'like_unlike.json' file and rename your save file to 'like_unlike.json', thanks. If you do not, your views on this video cannot be retained! ")
  } 

 

  function unlike()
  { 
    unlikeCount = Number(unlikeCount)+1;
    $("#unlike").text(unlikeCount);
    confirm("sorry, because of no server, so you need save like/unlike data to local storage, please click the right red save button, and save the json file to path 'xxx/\assignment', then delete the last version 'like_unlike.json' file and rename your save file to 'like_unlike.json', thanks. If you do not, your views on this video cannot be retained! ")
  } 

/* app.filter("trustUrl", ['$sce', function ($sce) {
    return function (recordingUrl) {
        return $sce.trustAsResourceUrl(recordingUrl);
    };
}]); */