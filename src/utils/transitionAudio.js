import botanica_1 from "../assets/botanica_swells/botanica_1.wav";
import botanica_2 from "../assets/botanica_swells/botanica_2.wav";

function audioData(src, length, impactTime = 0.5) {
  return {
    src: src,
    length: length,
    impactTime: impactTime,
  }
}

const botanica1 = audioData(botanica_1, 6, 0.4);
const botanica2 = audioData(botanica_2, 8, 0.4)

export const transitionAudio = {
  botanica1,
  botanica2,
}