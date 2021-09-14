const runBtnDom = document.getElementById("run-btn");
const progressBarDom = document.getElementById("progress-bar");
const runCountDom = document.getElementById("run-count");
const fillDom = document.getElementById("fill");
let runCount = 0;
let animationDuration = 3000;

runBtnDom.addEventListener("click", async () => {
  ++runCount;
  updateRunCountText();

  if (runCount > 1) {
    await delay();
    setAnimation();
  } else {
    setAnimation();
  }
});



function delay() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, (animationDuration * (runCount - 1)));
  });
}

function setAnimation() {
  fillAnimation();
}

function updateRunCountText() {
  runCountDom.innerText = runCount || "";
}

function fillAnimation() {
  /* using requestAnimationFrame for smooth transition */
  let startTime = null;
  let requestId
  const loop = (currentTime) => {
    if (!startTime) {
      startTime = currentTime;
    }
    const time = currentTime - startTime;

    const percent = Math.min(time / animationDuration, 1);
    fillDom.style.width = (percent * 100) + "%";

    if (time < animationDuration) {
      requestId = window.requestAnimationFrame(loop);
    } else {
      window.cancelAnimationFrame(requestId);
      --runCount;
      updateRunCountText();
      fillDom.style.width = 0 + "%";
    }
  };
  requestId = window.requestAnimationFrame(loop);
};
