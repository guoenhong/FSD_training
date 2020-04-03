import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoUrlManagementComponent } from './video-url-management.component';

describe('VideoUrlManagementComponent', () => {
  let component: VideoUrlManagementComponent;
  let fixture: ComponentFixture<VideoUrlManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoUrlManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoUrlManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
