function ProgressBar(duration){

    const bar = document.getElementsByClassName("progress-bar")[0];
    let startTime = null;

    function fill(){
        if (startTime === null) {
            startTime = Date.now();
        }
        const elaspsedTime = Date.now() - startTime;
        const width = Math.min((elaspsedTime / duration) * 100, 100);

        bar.style.width = width+"%";
        if(width < 100){
            setTimeout(fill, 1000 / 60);
            // fill();
        } else {
            return;
        }
    }

    function load(){
        bar.style.backgroundColor = 'red';
        fill();
    }

    return {load: load}
}

const progressbar = ProgressBar(3000);

// .

document.getElementById("load").addEventListener('click', progressbar.load)