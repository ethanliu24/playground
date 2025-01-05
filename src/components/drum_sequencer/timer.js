// This script has the logics for timing the intervals
import * as Constants from "./msgConstants";

var interval = 25;
var timer = null;

/**
 * This event listener is in a seperate thread than the main thread, and it listens to and sends
 * messages to the main thread.
 */
self.addEventListener("message", (e) => {
  if (e.data === Constants.START) {
    timer = setInterval(() => { postMessage(Constants.TICK); }, interval)
  } else if (e.data === Constants.STOP) {
    clearInterval(timer);
    timer = null;
  } else if (e.data.interval) {
    interval = e.data.interval;
    if (timer) {
      clearInterval(timer);
			timer = setInterval(() => { postMessage(Constants.TICK); }, interval)
    }
  }
});
