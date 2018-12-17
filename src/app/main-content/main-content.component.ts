// 14-12-2018  Dheymer León (dheymer@gmail.com)
import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Video, Clip } from '../clip.model';
import { VideoRepositoryService } from '../video-repository.service';

/**
 * The main component of VideoTrimmer app
 *
 * @export
 * @class MainContentComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html'
})
export class MainContentComponent implements OnInit {
  @Input ('mode') mode: boolean;                            // Flag that indicates if it's Full mode or Demo mode
  @HostListener('window:keydown', ['$event'])               // To listen if the hotkeys are pressed
  videoDomContainer: HTMLVideoElement;                      // The HTML video player element
  objVideo: Video;                                          // The object with the Full video's info
  clips: Clip[] = [];                                       // The array with the info of all clips
  filteredClips: Clip[] = [];                               // The array of the search filtered clips
  selectedClip: Clip;                                       // The selected clip
  newClip: Clip = new Clip();                               // The new clip to be created
  selectedClipIndex: number;                                // The index of the selected clip
  editClip = false;                                          // Flag that indicates if a clip is being edited
  editVideo = false;                                         // Flag that indicates if the Full video is being edited
  searchTag: string;                                        // The search term used to filter clips by tag
  fullVideo: Clip = new Clip('Complete movie', '', -1, -1); // The Clip object of the complete video

  /**
   * Creates an instance of MainContentComponent.
   * @param {VideoRepositoryService} videoService The clips service
   * @memberof MainContentComponent
   */
  constructor(
    private videoService: VideoRepositoryService
  ) {
    // Get the clips list from the service
    this.clips = this.videoService.list();
    // Asign the whole clips list to the filtered clips list
    this.filteredClips = this.clips;
  }

  /**
   * The method executed when initializing the component
   *
   * @memberof MainContentComponent
   */
  ngOnInit() {
    // tslint:disable-next-line:prefer-const
    let self = this;  // Need this to access the component from another scope
    // Obtain the video player HTML element
    this.videoDomContainer = document.querySelector('#videoPlayer');
    // Add a listener to the video player to obtain the video metadata
    this.videoDomContainer.addEventListener('loadedmetadata', function() {
      // Create the object with the video info
      self.objVideo = new Video(
        self.videoDomContainer.currentSrc.split('#')[0],
        self.videoDomContainer.duration,
        Math.round(self.videoDomContainer.duration)
      );
    });
    // Assign the clip of the whole video to the selected clip, and it's index as well
    this.selectedClip = this.fullVideo;
    this.selectedClipIndex = -1;
  }

  /**
   * Plays the selected clip
   *
   * @param {Clip} clip The clip to be played
   * @param {number} clipIndex The index of the clip to be played
   * @memberof MainContentComponent
   */
  playClip(clip: Clip, clipIndex: number) {
    // Assign the clip index to the selected clip index
    this.selectedClipIndex = clipIndex;
    // Assign the clip to be played to the selected clip object
    this.selectedClip = clip;
    // Set the stop time for the clip
    let stopAfter = (clip.endTime - clip.startTime) * 1000;
    // if it isn't the full video
    if (clip.startTime !== -1 && clip.endTime !== -1) {
      // Set the starting time of the clip in the HTML video element
      this.videoDomContainer.currentTime = clip.startTime;
    } else {
      // Reset the stop time for the clip to the duration of the whole video
      stopAfter = this.videoDomContainer.duration * 1000;
      // Otherwise, set the starting time to 0 (the beginning of the video)
      this.videoDomContainer.currentTime = 0;
    }
    // Play the video
    this.videoDomContainer.play();
    // And pause it right in the stop time
    setTimeout(() => {
      this.videoDomContainer.pause();
    }, stopAfter);
  }

  /**
   * Play all clips showing in the playlist
   *
   * @memberof MainContentComponent
   */
  playAllClips() {
    // tslint:disable-next-line:prefer-const
    let self = this;  // Need this to access the component from another scope
    // Set the clip count with the number of clips in the playlist
    const clipCount = this.filteredClips.length - 1;
    // Set an index (the list index) to 0
    let i = 0;
    // Set the first clip of the list as the current to be played
    let currentClip = this.filteredClips[0];

    // Add a listener to the video player to know when the video is paused
    this.videoDomContainer.addEventListener('pause', function() {
      // If it's not the last video
      if (i < clipCount) {
        // Set the current clip to be played as the next in the list
        currentClip = self.filteredClips[++i];
        // Set a pause of 3 seconds after the clip is paused to play the next clip in the list
        setTimeout(() => {
          self.playClip(currentClip, i);
        } , 3000);
      }
    }, false);
    // Play the last clip
    this.playClip(currentClip, i);
  }

  /**
   * Removes a clip from the list
   *
   * @param {number} clipIndex The index of the clip to be removed
   * @memberof MainContentComponent
   */
  removeClip(clipIndex: number) {
    // Ask to the service to remove the clip
    this.videoService.deleteClip(clipIndex);
  }

  /**
   * Navigates through the clip list with keyboard keys (left and right arrows)
   *
   * @param {KeyboardEvent} event The keyboard event
   * @memberof MainContentComponent
   */
  hotKeyPressed(event: KeyboardEvent) {
    // Set a provisional index
    let playIndex: number;
    // set a new empty Clip object
    let playClip = new Clip();
    // if the pressed key is Left Arrow
    if (event.key === 'ArrowLeft') {
      // set the provisional index to the current selected index - 1
      playIndex = this.selectedClipIndex - 1;
    }
    // if the pressed key is the Right Arrow
    if (event.key === 'ArrowRight') {
      // set the provisional index to the current selected index +1
      playIndex = this.selectedClipIndex + 1;
    }
    // Check the number in the provisional index
    switch (playIndex) {
      // if it's -2 (previous to the full video index)
      case -2: {
          // Set the index to the one of the last clip in the clip list, and select that clip
          playIndex = this.filteredClips.length - 1;
          playClip = this.filteredClips[playIndex];
        } break;
      // if it's -1 (previous to the first clip in the clip list)
      case -1: {
          // select the clip object of the complete video
          playClip = this.fullVideo;
        } break;
      // if it's the length of the clip list (the next to the last video)
      case (this.filteredClips.length): {
          // set the index to -1 (the complete video), and select it's clip object
          playIndex = -1;
          playClip = this.fullVideo;
        } break;
      // if it's an index inside the clip list
      default: {
          // select the corresponding clip in the list
          playClip = this.filteredClips[playIndex];
        } break;
    }
    // play the selected clip in the selected index
    this.playClip(playClip, playIndex);
  }

  /**
   * Add a new clip to the list
   *
   * @param {Clip} clip The clip object to be added
   * @memberof MainContentComponent
   */
  addClip(clip: Clip) {
    // Ask to the service to add the clip
    this.videoService.addClip(clip);
  }

  /**
   * Filters the clip list by tag
   *
   * @param {string} tag The search term to filter the list
   * @memberof MainContentComponent
   */
  filterClipsByTag(tag: string) {
    // Reasign the complete clip list to the filtered list
    this.filteredClips = this.clips;
    // Filter the clip list with the search term
    this.filteredClips = this.clips.filter((clip) => clip.searchTag.toLowerCase().indexOf(tag.toLowerCase()) > -1);
  }

  /**
   * Obtains the left position of the clip marker in the markers bar
   *
   * @param {Clip} item
   * @returns {string}
   * @memberof MainContentComponent
   */
  calculateMarkerLeft(item: Clip): string {
    return ((item.startTime / this.videoDomContainer.duration) * 100) + '%';
  }

}
