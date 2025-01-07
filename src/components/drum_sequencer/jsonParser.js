import { isArray } from "tone";
import * as C from "./constants.js";

/**
 * Writes the pattern data as a json file.
 * @param {string} name - The name of the pattern.
 * @param {number} swing - The amount of swing on the pattern, in the range [0, 1].
 * @param {number} bars - The number of bars the pattern has.
 * @param {number} bpm - The bpm of the pattern, it's an integer.
 * @param {array} tracks - Holds the data for tracks.
 * @returns void
 */
export default function createPattern(name, swing, bars, bpm, tracks) {
  if (!validPatternData(name, swing, bars, bpm, tracks)) {
    console.error("Invalid pattern data");
    return;
  }

  const patternData = {
    [C.NAME]: name,
    [C.SWING]: swing,
    [C.BARS]: bars,
    [C.BPM]: bpm,
    [C.TRACKS]: tracks,
  };
}

/**
 *
 * @param {string} fileName - The name of the audio file.
 * @param {boolean} muted - Whether the track is muted or not.
 * @param {number} volume - The volume of the track, in db.
 * @param {number} pan - The panning of the track, in range [-1, 1].
 * @param {array} trackPattern - The notes to be placed in the track. 0 is not activated, 1 is.
 * @returns
 */
export default function createTrack(fileName, muted, volume, pan, trackPattern) {
  if (!validTrackData(fileName, muted, volume, pan, trackPattern)) {
    console.error("Invalid track data");
    return;
  }

  return {
    [C.FILE_NAME]: fileName,
    [C.TRACK_MUTED]: muted,
    [C.TRACK_VOL]: volume,
    [C.TRACK_PAN]: pan,
    [C.TRACK_PATTERN]: trackPattern,
  }
}

function validPatternData(name, swing, bars, bpm, tracks) {
  // TODO return useful messages
  if (typeof name !== "string")
    return false;
  if (typeof swing !== "number" || (swing < 0 || swing > 1))
    return false;
  if (typeof bars !== "number" || ![1, 2, 4, 8, 16].includes(bars))
    return false;
  if (typeof bpm != "number" || (bpm < C.MIN_BPM || bpm > C.MAX_BPM))
    return false;
  if (!isArray(tracks))
    return false;

  const subdivisions = bars * C.DIVISIONS_PER_BAR;
  tracks.forEach((track, idx) => {
    if (track[C.PATTERN].length !== subdivisions) {
      return false;
    }
  });

  return true;
}

function validTrackData(fileName, muted, volume, pan, trackPattern) {
  if (typeof fileName !== "string")
    return false;
  if (typeof muted !== "boolean")
    return false;
  if (typeof volume !== "number" || volume > C.CHANNEL_DEFAULT_VOL)
    return false;
  if (typeof pan !== "number" || (pan < -1 || pan > 1))
    return false
  if (!isArray(trackPattern))
    return false;

  trackPattern.forEach((note, idx) => {
    if (note !== 0 || note !== 1) {
      return false;
    }
  });
}
