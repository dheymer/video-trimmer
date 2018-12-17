// 14-12-2018  Dheymer León (dheymer@gmail.com)
import { Injectable } from '@angular/core';
import { Clip } from './clip.model';

/**
 * Service with the dummy data for the Clip list
 *
 * @export
 * @class VideoRepositoryService
 */
@Injectable({
  providedIn: 'root'
})

export class VideoRepositoryService {
  clips: Clip[] = [];                   // The clips list

  /**
   * Creates an instance of VideoRepositoryService.
   * @memberof VideoRepositoryService
   */
  constructor(  ) {
    // The dummy data with the example clips
    this.clips = [
      new Clip('Video 1', 'intro', 0, 10.4),
      new Clip('Video 2', 'trailer', 10.5, 20.9),
      new Clip('Video 3', 'movie', 21, 31.4),
      new Clip('Video 4', 'trailer', 31.5, 41.9),
      new Clip('Video 5', 'movie', 42, 52),
    ];
  }

  /**
   * Returns the complete list of clips
   *
   * @returns {Clip[]} The list of clips
   * @memberof VideoRepositoryService
   */
  list(): Clip[] {
    return this.clips;
  }

  /**
   * Add a new Clip object to the clip list
   *
   * @param {Clip} clip The Clip object to be added
   * @memberof VideoRepositoryService
   */
  addClip(clip: Clip) {
    this.clips.push(clip);
  }

  /**
   * Delete a clip from the clip list
   *
   * @param {number} clipIndex The index of the clip to be deleted
   * @memberof VideoRepositoryService
   */
  deleteClip(clipIndex: number) {
    this.clips.splice(clipIndex, 1);
  }

}
