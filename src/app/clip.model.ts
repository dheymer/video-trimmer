// 14-12-2018  Dheymer León (dheymer@gmail.com)
/**
 * Model with the Clip's info structure
 *
 * @export
 * @class Clip
 */
export class Clip {
  clipName: string;
  searchTag: string;
  startTime: number;
  endTime: number;

  constructor(
    clipName?: string,
    searchTag?: string,
    startTime?: number,
    endTime?: number
  ) {
    this.clipName = (clipName === undefined) ? '' : clipName;
    this.searchTag = (searchTag === undefined) ? '' : searchTag;
    this.startTime = (startTime === undefined) ? 0 : startTime;
    this.endTime = (endTime === undefined) ? 0 : endTime;
  }

}

/**
 * Model with the Video's info structure
 *
 * @export
 * @class Video
 */
export class Video {
  videoName: string;
  videoUrl: string;
  videoDuration: number;
  videoRoundedDuration: number;
  constructor(
    url?: string,
    duration?: number,
    roundDuration?: number,
    name?: string
  ) {
    this.videoName = (name === undefined) ? 'Complete Video' : name;
    this.videoUrl = url;
    this.videoDuration = duration;
    this.videoRoundedDuration = roundDuration;
  }
}
