import botanica_1 from "../assets/botanica_swells/botanica_1.wav";

function audioData(src, length, impactTime = 0.5) {
  return {
    src: src,
    length: length,
    impactTime: impactTime,
  }
}

const botanica1 = audioData(botanica_1, 6, 0.4);

export const bgAudio = {
  botanica1,
}