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
    this.clipName = clipName;
    this.searchTag = searchTag;
    this.startTime = startTime;
    this.endTime = endTime;
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
