function ProgressBar(duration) {
  const parentBar = document.getElementsByClassName("progress-bar")[0];
  const clicksCountSpan = document.getElementById("progress-queue");

  const bar = document.createElement("div");
  bar.style.background = "red";
  bar.style.width = "0";
  bar.style.height = "100%";

  parentBar.appendChild(bar);

  let startTime = null;
  let count = 0, isLoading = false; 
  // Count variable maintian how many times load is clicked.

  function fill() {
    if (startTime === null) {
      startTime = Date.now();
    }
    const elaspsedTime = Date.now() - startTime;
    const width = Math.min((elaspsedTime / duration) * 100, 100);
    bar.style.width = width + "%";

    if (elaspsedTime >= duration) {
      count--;
      clicksCountSpan.innerText = count;

      bar.style.width = 0;
      startTime = null;
      isLoading = false;
      /** Resetting everything as we have completed one cycle here. If user clicks again he have start afresh. */
      console.log("Count---", count);
      if (count <= 0) {
        clicksCountSpan.innerText = "";
        isLoading = false;
        return;
      }
    }

    setTimeout(fill, 1000 / 60);
    // fill();
    /** setTimeout(fill, delay) with any delay could do the work.
     * But if we paint the dom with a speed of 60 frames in 1second(1000ms), to human eye it will look like an animation.
     * */
  }

  function load() {
    count++;
    clicksCountSpan.innerText = count;
    if(!isLoading){
        isLoading = true;
        fill();
    }
  }

  return { load: load };
}

const progressbar = ProgressBar(3000);
/** Our target is to paint the DOM with a speed of 60FPS and at the same time paint 100% of the div within the duration specified. */

document.getElementById("load").addEventListener("click", progressbar.load);


/**
 * Stopping condition for fill() recursion is:
 * We have completed animation cycles == no. of clicks on load btn
 * if(elapsedTime >= duration) : Then one animation cycle is complete and we can decrementing count here.
 */

/**
 * Let say user clicked for 3 times, after 3 animation cycles completeion, we are making isLoading false again. 
 * isLoading true means, animation cycles for previous clicks are not completed yet.
 * isLoading false means, there is nothing in the queue, if user clicks again; it will be pushed in the queue again.
 * So after that user can play again. 
 */

/**
 * Once user clicked, animation started.
 * If user clicked again and previous animation is not completed, then count will be incremented, but fill() won't be invoked for the 2nd click.
 * 
 * After 1st animation cycle ends, for 1st cycle elapsedTime >= duration will be true and but as count is not 0, the recusion won't stop.
 * (elapsedTime : Date.now()-startTime; the same startTime that we are reassign with null after completion of each cycle.)
 * 
 * setTimeout(fill,): will be called until for the 2nd click the div animation is complete.
 */