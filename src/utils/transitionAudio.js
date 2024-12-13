import botanica_1 from "../assets/botanica_swells/botanica_1.wav";

function audioData(src, impactTime = 0.5) {
  return {
    src: src,
    impactTime: impactTime,
  }
}

const botanica1 = audioData(botanica_1, 0.3);

export const bgAudio = {
  botanica1,
}