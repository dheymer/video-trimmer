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
  fullVideo: Clip = new Clip('Complete movie', '', -1, -1);
  clipSection = '';

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
    this.selectedClip = this.fullVideo;
  }

  playClip(clip: Clip, clipIndex: number) {
    this.selectedClipIndex = clipIndex;
    this.selectedClip = clip;
    const stopAfter = (clip.endTime - clip.startTime) * 1000;
    if (clip.startTime !== -1 && clip.endTime !== -1) {
      this.videoDomContainer.currentTime = clip.startTime;
    } else {
      // this.videoDomContainer.src = this.objVideo.videoUrl;
      this.clipSection = '';
    }
    this.videoDomContainer.play();
    setTimeout(() => {
      this.videoDomContainer.pause();
    }, stopAfter);
  }

  playClipTimeout(clip: Clip, clipIndex: number) {
    setTimeout(this.playClip(clip, clipIndex), 3000);
  }

  playAllClips() {
    // tslint:disable-next-line:prefer-const
    let self = this;
    const clipCount = this.filteredClips.length - 1;
    let i = 0;
    let currentClip = this.filteredClips[0];

    this.videoDomContainer.addEventListener('pause', function() {
      if (i < clipCount) {
        currentClip = self.filteredClips[++i];
        // self.playClipTimeout(currentClip, i);
        setTimeout(() => {
          self.playClip(currentClip, i);
        } , 3000);
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

  filterClipsByTag(tag: string) {
    this.filteredClips = this.clips;
    this.filteredClips = this.clips.filter((clip) => clip.searchTag.toLowerCase().indexOf(tag.toLowerCase()) > -1);
  }

}
