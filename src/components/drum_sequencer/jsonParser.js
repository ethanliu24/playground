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
  if (!invalidPatternData(name, swing, bars, bpm, tracks)) {
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

export default function createTrack() {

}

function invalidPatternData(name, swing, bars, bpm, tracks) {
  if (typeof swing !== "number" && (swing < 0 || swing > 1))
    return false;
  if (typeof bars !== "number" && ![1, 2, 4, 8, 16].includes(bars))
    return false;
  if (typeof bpm != "number" && (bpm < C.MIN_BPM || bpm > C.MAX_BPM))
    return false;
  if (!isArray(tracks))
    return false;

  return true;
}
