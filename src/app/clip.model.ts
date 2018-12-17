/**
 * Model with the structure of the Clips info
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
