/**
 * To make a pattern, create a function and fill in valid data to construct a json file.
 * Then, call that function. Refer to jsonParser.js on how to construct data.
 */
import { createTrack, createPreset } from "./presetParser.js";
import { sampleNames } from "../../utils/drumSequencerFiles.js";
import * as C from "./constants.js";

export function createNewJackSwing() {
  const tracks = [
    createTrack(
      sampleNames.kick, false, C.CHANNEL_DEFAULT_VOL_PERCENTAGE, C.CHANNEL_DEFAULT_PAN_PERCENTAGE,
      [
        1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0,
      ]
    ),
    createTrack(
      sampleNames.spinz808, false, C.CHANNEL_DEFAULT_VOL_PERCENTAGE, C.CHANNEL_DEFAULT_PAN_PERCENTAGE,
      [
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0,
      ]
    ),
    createTrack(
      sampleNames.snarePower, false, C.CHANNEL_DEFAULT_VOL_PERCENTAGE, C.CHANNEL_DEFAULT_PAN_PERCENTAGE,
      [
        0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
      ]
    ),
    createTrack(
      sampleNames.hitC, false, C.CHANNEL_DEFAULT_VOL_PERCENTAGE, C.CHANNEL_DEFAULT_PAN_PERCENTAGE,
      [
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ]
    ),
    createTrack(
      sampleNames.hitB, false, C.CHANNEL_DEFAULT_VOL_PERCENTAGE, C.CHANNEL_DEFAULT_PAN_PERCENTAGE,
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
      ]
    ),
    createTrack(
      sampleNames.hihatMain, false, C.CHANNEL_DEFAULT_VOL_PERCENTAGE, C.CHANNEL_DEFAULT_PAN_PERCENTAGE,
      [
        0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0,
        0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0,
      ]
    ),
    createTrack(
      sampleNames.hihatSoft, false, C.CHANNEL_DEFAULT_VOL_PERCENTAGE, C.CHANNEL_DEFAULT_PAN_PERCENTAGE,
      [
        0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0,
        0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0,
      ]
    ),
    createTrack(
      sampleNames.openHat, false, C.CHANNEL_DEFAULT_VOL_PERCENTAGE, C.CHANNEL_DEFAULT_PAN_PERCENTAGE,
      [
        0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
      ]
    ),
    createTrack(
      sampleNames.crash, false, C.CHANNEL_DEFAULT_VOL_PERCENTAGE, C.CHANNEL_DEFAULT_PAN_PERCENTAGE,
      [
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ]
    ),
    createTrack(
      sampleNames.clap, false, C.CHANNEL_DEFAULT_VOL_PERCENTAGE, C.CHANNEL_DEFAULT_PAN_PERCENTAGE,
      [
        0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
      ]
    ),
    createTrack(
      sampleNames.triangle, false, 0.4, C.CHANNEL_DEFAULT_PAN_PERCENTAGE,
      [
        1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1,
        1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0,
      ]
    ),
    createTrack(
      sampleNames.woodblock, false, C.CHANNEL_DEFAULT_VOL_PERCENTAGE, C.CHANNEL_DEFAULT_PAN_PERCENTAGE,
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0,
      ]
    ),
    createTrack(
      sampleNames.glassBell, false, 0.4, C.CHANNEL_DEFAULT_PAN_PERCENTAGE,
      [
        0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
        0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0,
      ]
    ),
    createTrack(
      sampleNames.tambourine, false, C.CHANNEL_DEFAULT_VOL_PERCENTAGE, C.CHANNEL_DEFAULT_PAN_PERCENTAGE,
      [
        0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0,
        0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0,
      ]
    ),
    createTrack(
      sampleNames.djScratch, false, C.CHANNEL_DEFAULT_VOL_PERCENTAGE, C.CHANNEL_DEFAULT_PAN_PERCENTAGE,
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
      ]
    ),
  ];

  return createPreset(C.NEW_JACK_SWING, 0.85, 4, 97, tracks);
}

export function createHipHop() {
  const tracks = [
    createTrack(
      sampleNames.kick, false, C.CHANNEL_DEFAULT_VOL_PERCENTAGE, C.CHANNEL_DEFAULT_PAN_PERCENTAGE,
      [
       1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
       1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0,
      ]
    ),
    createTrack(
      sampleNames.spinz808, false, C.CHANNEL_DEFAULT_VOL_PERCENTAGE, C.CHANNEL_DEFAULT_PAN_PERCENTAGE,
      [
       1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0,
      ]
    ),
    createTrack(
      sampleNames.snarePower, false, C.CHANNEL_DEFAULT_VOL_PERCENTAGE, C.CHANNEL_DEFAULT_PAN_PERCENTAGE,
      [
       0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
       0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
      ]
    ),
    createTrack(
      sampleNames.hitC, false, C.CHANNEL_DEFAULT_VOL_PERCENTAGE, C.CHANNEL_DEFAULT_PAN_PERCENTAGE,
      [
       1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ]
    ),
    createTrack(
      sampleNames.clap, false, 1, C.CHANNEL_DEFAULT_PAN_PERCENTAGE,
      [
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
      ]
    ),
    createTrack(
      sampleNames.crash, false, C.CHANNEL_DEFAULT_VOL_PERCENTAGE, C.CHANNEL_DEFAULT_PAN_PERCENTAGE,
      [
       1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ]
    ),
    createTrack(
      sampleNames.hihatMain, false, C.CHANNEL_DEFAULT_VOL_PERCENTAGE, C.CHANNEL_DEFAULT_PAN_PERCENTAGE,
      [
       0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0,
       0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0,
      ]
    ),
    createTrack(
      sampleNames.hihatSoft, false, C.CHANNEL_DEFAULT_VOL_PERCENTAGE, C.CHANNEL_DEFAULT_PAN_PERCENTAGE,
      [
       1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0,
       1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0,
      ]
    ),
    createTrack(
      sampleNames.openHat, false, C.CHANNEL_DEFAULT_VOL_PERCENTAGE, C.CHANNEL_DEFAULT_PAN_PERCENTAGE,
      [
       0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ]
    ),
    createTrack(
      sampleNames.glassBell, false, C.CHANNEL_DEFAULT_VOL_PERCENTAGE, C.CHANNEL_DEFAULT_PAN_PERCENTAGE,
      [
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
      ]
    ),
    createTrack(
      sampleNames.triangle, false, C.CHANNEL_DEFAULT_VOL_PERCENTAGE, C.CHANNEL_DEFAULT_PAN_PERCENTAGE,
      [
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0,
      ]
    ),
    createTrack(
      sampleNames.djScratch, false, C.CHANNEL_DEFAULT_VOL_PERCENTAGE, C.CHANNEL_DEFAULT_PAN_PERCENTAGE,
      [
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
      ]
    ),
  ];

  return createPreset(C.HIP_HOP, 0.4, 2, 97, tracks);
}

export function createClean() {
  return createPreset(C.CLEAN, C.INITIAL_SWING_AMOUNT, C.INITIAL_BARS, C.INITIAL_BPM, [])
}
