import { isArray } from "tone";
import * as C from "./constants.js";
import { samples } from "../../utils/drumSequencerFiles.js";

/**
 * Constructs a json obj of a pre made pattern
 * @param {string} name - The name of the pattern.
 * @param {number} swing - The amount of swing on the pattern, in the range [0, 1].
 * @param {number} bars - The number of bars the pattern has.
 * @param {number} bpm - The bpm of the pattern, it's an integer.
 * @param {array} tracks - Holds the data for tracks.
 * @returns The pattern data for the sequencer.
 */
export function createPreset(name, swing, bars, bpm, tracks) {
  if (!validPresetData(name, swing, bars, bpm, tracks)) {
    console.error("Invalid pattern data");
    return;
  }

  return {
    [C.PRESET_NAME]: name,
    [C.PATTERN_SWING]: swing,
    [C.PATTERN_BARS]: bars,
    [C.PATTERN_BPM]: bpm,
    [C.PATTERN_TRACKS]: tracks,
  };
}

function validPresetData(name, swing, bars, bpm, tracks) {
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
    if (track[C.TRACK_PATTERN].length !== subdivisions) {
      return false;
    }
  });

  return true;
}

/**
 *
 * @param {string} fileName - The name of the audio file.
 * @param {boolean} muted - Whether the track is muted or not.
 * @param {number} volume - The volume of the track, in range [0, 1].
 * @param {number} pan - The panning of the track, in range [-1, 1].
 * @param {array} trackPattern - The notes to be placed in the track. 0 is not activated, 1 is.
 * @returns A channel rack (track)'s data.
 */
export function createTrack(fileName, muted, volume, pan, trackPattern) {
  if (!validTrackData(fileName, muted, volume, pan, trackPattern)) {
    console.error("Invalid track data");
    return;
  }

  let trackIdx = -1;
  samples.forEach((sample, idx) => {
    const sampleName = sample.split("/").at(-1);
    if (sampleName === fileName) {
      trackIdx = idx;
    }
  });

  if (trackIdx === -1) console.error(`File ${fileName} doesn't exist`);

  return {
    [C.FILE_NAME]: fileName,
    [C.TRACK_MUTED]: muted,
    [C.TRACK_VOL]: volume,
    [C.TRACK_PAN]: pan,
    [C.TRACK_PATTERN]: trackPattern,
    [C.TRACK_INDEX]: trackIdx,
  }
}

function validTrackData(fileName, muted, volume, pan, trackPattern) {
  if (typeof fileName !== "string")
    return false;
  if (typeof muted !== "boolean")
    return false;
  if (typeof volume !== "number" || (volume < 0 || volume > 1))
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

  return true;
}
