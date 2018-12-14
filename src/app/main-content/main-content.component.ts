import { Component, OnInit, Input } from '@angular/core';
import { Video, Clip } from '../clip.model';
import { VideoRepositoryService } from '../video-repository.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html'
})
export class MainContentComponent implements OnInit {
  @Input('fullView') fullView: boolean;
  @Input('fullVideo') fullVideo: string;
  @Input('videoType') videoType: string;
  videoDomContainer: any;
  videoDomElement: any;
  objVideo: Video;
  clips: Clip[] = [];
  filteredClips: Clip[] = [];
  selectedClip: Clip;
  selectedClipIndex: number;
  editClip: false;
  editVideo: false;

  constructor(
    private videoService: VideoRepositoryService
  ) {
    this.clips = this.videoService.list();
    this.filteredClips = this.clips;
  }

  ngOnInit() {
    this.videoDomContainer = document.querySelector('#videoPlayer');
    this.videoDomElement = document.querySelector('#videoPlayerSource');
    console.log(this.videoDomElement);
    this.objVideo = new Video(
      this.videoDomElement.src.split('#')[0],
      this.videoDomElement.duration,
      Math.round(this.videoDomElement.duration)
    );
    console.log(this.objVideo);
  }

  playClip(clip: Clip, clipIndex: number) {
    this.selectedClipIndex = clipIndex;
    this.selectedClip = clip;
    if (clip.startTime !== -1 && clip.endTime !== -1) {
      const clipSection = '#t' + clip.startTime + ',' + clip.endTime;
      this.videoDomContainer.currentSrc = this.objVideo.videoUrl + clipSection;
    } else {
      this.videoDomContainer.currentSrc = this.objVideo.videoUrl;
    }
    this.videoDomContainer.load();
    this.videoDomContainer.play();
  }

}
