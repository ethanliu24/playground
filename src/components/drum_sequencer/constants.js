/**
 * These are default settings when initializing the sequencer, the sequencer can change values.
 * For example, the time signiture could be 3/4, each beat could be subdivided to triplets, etc.
 */
export const DIVISIONS_PER_BEAT = 4;
export const BEATS_PER_BAR = 4
export const DIVISIONS_PER_BAR = DIVISIONS_PER_BEAT * BEATS_PER_BAR;
export const INITIAL_BPM = 97;
export const INITIAL_BARS = 4;
export const INITIAL_SUBDIVISIONS = INITIAL_BARS * DIVISIONS_PER_BAR;

// For the timer thread
export const START = "start";
export const STOP = "stop";
export const TICK = "tick";
export const SCHEDULE_TIME_AHEAD = 0.01;

// For channels
export const CHANNEL_DEFAULT_VOL = 9; // in db
export const CHANNEL_DEFAULT_PAN = 0;
export const SAMPLE_FADE_OUT = 0.01; // in s
