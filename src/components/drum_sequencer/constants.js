/**
 * These are default settings when initializing the sequencer, the sequencer can change values.
 * For example, the time signiture could be 3/4, each beat could be subdivided to triplets, etc.
 */
export const DIVISIONS_PER_BEAT = 4;
export const BEATS_PER_BAR = 4
export const DIVISIONS_PER_BAR = DIVISIONS_PER_BEAT * BEATS_PER_BAR;
export const INITIAL_BPM = 120;
export const INITIAL_BARS = 4;
export const INITIAL_SUBDIVISIONS = INITIAL_BARS * DIVISIONS_PER_BAR;
export const INITIAL_SWING_AMOUNT = 0;
export const MAX_SWING_AMT_PERCENTAGE = 0.5;
export const MIN_BPM = 40;
export const MAX_BPM = 200;

// For the timer thread
export const START = "start";
export const STOP = "stop";
export const TICK = "tick";
export const SCHEDULE_TIME_AHEAD = 0.01;

// For channels
export const CHANNEL_DEFAULT_VOL = 9; // in db
export const CHANNEL_DEFAULT_VOL_PERCENTAGE = 0.8;
export const CHANNEL_DEFAULT_PAN = 0;
export const CHANNEL_DEFAULT_PAN_PERCENTAGE = 0.5;
export const SAMPLE_FADE_OUT = 0.01; // in s

// Others
export const ROTATION_STYLE_REGEX = /rotate\((-?\d+(\.\d+)?)deg\)/;

export const MS_PER_SECOND = 1000.0;
export const MS_PER_MINUTE = MS_PER_SECOND * 60.0;

export const BEAT_INDICATOR_ON_OPACITY = 1;
export const BEAT_INDICATOR_OFF_OPACITY = 0.2;

// For pattern json
export const PRESET_NAME = "name";
export const PATTERN_SWING = "swing";
export const PATTERN_BARS = "bars";
export const PATTERN_BPM = "bpm";
export const PATTERN_TRACKS = "tracks";
export const FILE_NAME = "file_name";
export const TRACK_MUTED = "muted";
export const TRACK_VOL = "volume";
export const TRACK_PAN = "pan";
export const TRACK_PATTERN = "track_pattern";
export const TRACK_INDEX = "track_index";

// Preset names
export const HIP_HOP = "hip_hop";
export const NEW_JACK_SWING = "new_jack_swing";
export const CLEAN = "clean";
