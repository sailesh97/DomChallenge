function ProgressBar(el, time) {
    this.element = document.querySelector(el);
    this.time = time;
  
    this.queue = 0;
    this.loading = false;
  
    this.init();
    this.bindEvent();
  }
  
  ProgressBar.prototype.init = function() {
    const fragment = document.createDocumentFragment();
    this.button = document.createElement("button");
    this.button.innerText = "Run";
  
    this.bar = document.createElement("div")
    this.bar.classList.add("bar")
  
    this.progress = document.createElement("div");
    this.progress.classList.add("progress")
  
    this.bar.appendChild(this.progress);
    fragment.appendChild(this.bar);
    fragment.appendChild(this.button);
    this.element.appendChild(fragment);
  }
  
  ProgressBar.prototype.bindEvent = function() {
    this.button.addEventListener("click", this.startProgress.bind(this))
  }
  
  ProgressBar.prototype.startProgress = function(e) {
    this.queue++;
    this.updateButton(`Run ${this.queue}`);
  
    if (!this.loading) {
      this.loading = true;
      this.load()
    } else {
      return;
    }
  }
  
  ProgressBar.prototype.load = function() {
    this.progress.animate({
      width: "100%"
    }, this.time);
    
    setTimeout(function() {
      this.queue--;
      this.updateButton(`Run ${this.queue === 0 ? "" : this.queue}`);
      if (this.queue > 0) {
        this.load()
      } else {
        this.loading = false;
        return;
      }
  
    }.bind(this), this.time)
  }
  
  ProgressBar.prototype.updateButton = function(value) {
    this.button.innerText = value;
  }
  
  new ProgressBar("#progressBar", 3000); // Time in milliseconds
  