import { useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react";
import * as Tone from "tone";
import * as Constants from "./constants.js"
import Notebox from "./NoteBox.jsx";
import Knob from "./Knob.jsx";

export default forwardRef(function Track(props, ref) {
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(Constants.CHANNEL_DEFAULT_PAN_PERCENTAGE); // in percentage
  const [pan, setPan] = useState(Constants.CHANNEL_DEFAULT_VOL_PERCENTAGE); // in percentage

  const channelRef = useRef(null);
  const sampleRef = useRef(null);

  const defaultVolRef = useRef(Constants.CHANNEL_DEFAULT_VOL);
  const defaultPanRef = useRef(Constants.CHANNEL_DEFAULT_PAN);

  useEffect(() => {
    channelRef.current = new Tone.Channel({
      volume: defaultVolRef.current,
      pan: defaultPanRef.current,
      mute: false,
    }).toDestination();

    sampleRef.current = new Tone.Player({
      url: props.soundFile,
      fadeOut: Constants.SAMPLE_FADE_OUT,
    }).connect(channelRef.current);

    return () => {
      channelRef.current.dispose();
      sampleRef.current.dispose();
    };
  }, []);

  useImperativeHandle(ref, () => {
    return {
      setMute: (muted) => setMuted(muted),
      setVolume: (percentage) => updateChannelVolume(percentage),
      setPan: (percentage) => updateChannelPan(percentage),
      reset: () => {
        setMuted(false);
        setVolume(Constants.CHANNEL_DEFAULT_VOL_PERCENTAGE);
        setPan(Constants.CHANNEL_DEFAULT_PAN_PERCENTAGE);
      },
      play: (time) => {
        // TODO check if channel cuts itself
        sampleRef.current.stop();
        sampleRef.current.seek(0);
        sampleRef.current.start(time);
      },
    };
  });

  const muteTrack = () => {
    const muted = channelRef.current.mute;
    setMuted(!muted);
    channelRef.current.mute = !muted;
  };

  const updateChannelVolume = (volumePercentage) => {
    // Since volume expects db values, we need to convert db into linear gain and convert it back
    const initialVolumeDb = defaultVolRef.current;
    const initialLinearGain = Math.pow(10, initialVolumeDb / 20);
    const scaledLinearGain = initialLinearGain * volumePercentage;
    const scaledVolumeDb = 20 * Math.log10(scaledLinearGain);

    channelRef.current.volume.value = scaledVolumeDb;
    setVolume(volumePercentage);
  }

  const updateChannelPan = (panPercentage) => {
    const panValue = 2 * panPercentage - 1;
    channelRef.current.pan.value = panValue;
    setPan(panPercentage);
  }

  const parseFileName = () => {
    const fileName = props.soundFile.split("/").pop();
    const sampleName = fileName.split(".")[0];
    return sampleName;
  }

  return (
    <div className="track">
      <div className="track-controls">
        <button className="track-mute-btn" onClick={muteTrack}><div className={`${muted ? "muted" : "unmuted"}`}></div></button>
        <Knob initialAngle={(300 * volume) + 30} maxAngle={330} minAngle={30} updateKnobFunction={updateChannelVolume} />
        <Knob initialAngle={(300 * pan) + 30} maxAngle={330} minAngle={30} updateKnobFunction={updateChannelPan} />
        <div className="sound-file-name">{parseFileName()}</div>
      </div>

      <div className="note-box-container">
        {Array(props.subdivisions).fill().map((_, subdivision) => {
          const patchOne = subdivision % (Constants.DIVISIONS_PER_BEAT * 2) >= Constants.DIVISIONS_PER_BEAT;
          return (
            <Notebox
              key={subdivision}
              track={props.track}
              subdivision={subdivision}
              handleNoteClick={props.handleNoteClick}
              patchOne={patchOne}
              ref={(cell) => props.setGridCellRef(props.track, subdivision, cell)}
            />
          );
        })}
      </div>
    </div>
  );
})
