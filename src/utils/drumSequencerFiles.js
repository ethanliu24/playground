import spinz808 from "../assets/drum_sequencer_sounds/808_spinz_C.mp3";
import clap from "../assets/drum_sequencer_sounds/clap.mp3";
import crash from "../assets/drum_sequencer_sounds/crash.mp3";
import djScratch from "../assets/drum_sequencer_sounds/dj_scratch.mp3";
import glassBell from "../assets/drum_sequencer_sounds/glass_bell.mp3";
import hihatMain from "../assets/drum_sequencer_sounds/hihat_main.mp3";
import hihatSoft from "../assets/drum_sequencer_sounds/hihat_soft.mp3";
import hitB from "../assets/drum_sequencer_sounds/hit_B.mp3";
import hitC from "../assets/drum_sequencer_sounds/hit_C.mp3";
import kick from "../assets/drum_sequencer_sounds/kick.mp3";
import openHat from "../assets/drum_sequencer_sounds/open_hat.mp3";
import snarePower from "../assets/drum_sequencer_sounds/snare_power.mp3";
import tambourine from "../assets/drum_sequencer_sounds/tamb.mp3";
import triangle from "../assets/drum_sequencer_sounds/triangle.mp3";
import woodblock from "../assets/drum_sequencer_sounds/woodblock.mp3";

const samples = [
  hitC,
  hitB,
  kick,
  spinz808,
  snarePower,
  clap,
  crash,
  hihatMain,
  hihatSoft,
  openHat,
  tambourine,
  glassBell,
  triangle,
  woodblock,
  djScratch,
];

const sampleNames = {
  spinz808: "808_spinz_C.mp3",
  clap: "clap.mp3",
  crash: "crash.mp3",
  djScratch: "dj_scratch.mp3",
  glassBell: "glass_bell.mp3",
  hihatMain: "hihat_main.mp3",
  hihatSoft: "hihat_soft.mp3",
  hitB: "hit_B.mp3",
  hitC: "hit_C.mp3",
  kick: "kick.mp3",
  openHat: "open_hat.mp3",
  snarePower: "snare_power.mp3",
  tambourine: "tamb.mp3",
  triangle: "triangle.mp3",
  woodblock: "woodblock.mp3",
};

export { samples, sampleNames };