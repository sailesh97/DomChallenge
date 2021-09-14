class ProgressBar {
	constructor(progressBarEl,btnEl,duration){
 		this.progressBarEl = document.querySelector(progressBarEl);
    this.btnEl = document.querySelector(btnEl);
    this.duration = duration;
    this.queue = [];
    this.interval = null;
    this.monitorQueue();
    this.bindEvents();
  }
 
 
  monitorQueue(){
		setInterval(()=>{
      if(this.queue.length && !this.interval){
      	this.showProgress();
        this.queue.pop();
        this.btnEl.textContent = `Run. (Items in Queue:${this.queue.length})`;
      }
    }, 0)
	}
  
  addToQueue(){
		this.queue.push(this.queue.length+1);
     this.btnEl.textContent = `Run. (Items in Queue:${this.queue.length})`;
	}
  
  showProgress(){
    const X = this.progressBarEl.offsetWidth;
		const FPS = 30;
		let distanceCovered = 0;
    this.interval = setInterval(()=>{
      if(distanceCovered + (X/(this.duration*FPS)) >= X){
        clearInterval(this.interval);
        this.interval = null;
      }
      distanceCovered += (X/(this.duration*FPS))
      this.progressBarEl.style.backgroundSize = `${(distanceCovered/X)*100}% 100%`
    }, 1000/FPS)

  }

  
	bindEvents(){
		this.btnEl.addEventListener("click",(e)=>this.addToQueue())
	}
}
new ProgressBar("#progress-bar","#run-btn",3) // duration in seconds