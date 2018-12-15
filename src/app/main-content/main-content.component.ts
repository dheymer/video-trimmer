import { Component, OnInit, Input } from '@angular/core';
import { Video, Clip } from '../clip.model';
import { VideoRepositoryService } from '../video-repository.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html'
})

export class MainContentComponent implements OnInit {
  videoDomContainer: HTMLVideoElement;
  objVideo: Video;
  clips: Clip[] = [];
  filteredClips: Clip[] = [];
  selectedClip: Clip;
  newClip: Clip = new Clip();
  selectedClipIndex: number;
  editClip: false;
  editVideo: false;
  searchTag: string;

  constructor(
    private videoService: VideoRepositoryService
  ) {
    this.clips = this.videoService.list();
    this.filteredClips = this.clips;
  }

  ngOnInit() {
    // tslint:disable-next-line:prefer-const
    let self = this;
    this.videoDomContainer = document.querySelector('#videoPlayer');
    this.videoDomContainer.addEventListener('loadedmetadata', function() {
      self.objVideo = new Video(
        self.videoDomContainer.currentSrc.split('#')[0],
        self.videoDomContainer.duration,
        Math.round(self.videoDomContainer.duration)
      );
    });
    console.log(this.newClip);
  }

  playClip(clip: Clip, clipIndex: number) {
    this.selectedClipIndex = clipIndex;
    this.selectedClip = clip;
    if (clip.startTime !== -1 && clip.endTime !== -1) {
      const clipSection = '#t' + clip.startTime + ',' + clip.endTime;
      this.videoDomContainer.src = this.objVideo.videoUrl + clipSection;
    } else {
      this.videoDomContainer.src = this.objVideo.videoUrl;
    }
    this.videoDomContainer.load();
    this.videoDomContainer.play();
  }

  playClipTimeout(clip: Clip, clipIndex: number) {
    return window.setTimeout(this.playClip(clip, clipIndex), 3000);
  }

  playAllClips() {
    // tslint:disable-next-line:prefer-const
    let self = this;
    const clipCount = this.filteredClips.length - 1;
    let i = 0;
    let currentClip = this.filteredClips[0];

    this.videoDomContainer.addEventListener('pause', function() {
      if (i < clipCount) {
        self.selectedClip.clipName = 'Timeout 3s';
        currentClip = self.filteredClips[++i];
        self.playClipTimeout(currentClip, i);
      }
    }, false);
    this.playClip(currentClip, i);
  }

  removeClip(clipIndex: number) {
    this.videoService.deleteClip(clipIndex);
  }

  addClip(clip: Clip) {
    console.log(clip);
    this.videoService.addClip(clip);
  }

}
