import { Component, OnInit, Input } from '@angular/core';
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
  videoDomContainer: HTMLVideoElement;                      // The HTML video player element
  objVideo: Video;                                          // The object with the Full video's info
  clips: Clip[] = [];                                       // The array with the info of all clips
  filteredClips: Clip[] = [];                               // The array of the search filtered clips
  selectedClip: Clip;                                       // The selected clip
  newClip: Clip = new Clip();                               // The new clip to be created
  selectedClipIndex: number;                                // The index of the selected clip
  editClip: false;                                          // Flag that indicates if a clip is being edited
  editVideo: false;                                         // Flag that indicates if the Full video is being edited
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
    // Assign the clip of the whole video to the selected clip
    this.selectedClip = this.fullVideo;
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
    const stopAfter = (clip.endTime - clip.startTime) * 1000;
    // if it isn't the full video
    if (clip.startTime !== -1 && clip.endTime !== -1) {
      // Set the starting time of the clip in the HTML video element
      this.videoDomContainer.currentTime = clip.startTime;
    } else {
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

}
