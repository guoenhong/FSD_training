import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { VideoControlComponent } from './video-control/video-control.component';
import { VideoPlaylistComponent } from './video-playlist/video-playlist.component';
import { TrustVideoUrlPipe } from './video-player/trustVideoUrl.pipe';
import { VideoUrlManagementComponent } from './video-url-management/video-url-management.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    VideoPlayerComponent,
    VideoControlComponent,
    VideoPlaylistComponent,
    TrustVideoUrlPipe,
    VideoUrlManagementComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
