function Star(el, count, callback) {
    this.element = document.querySelector(el);
    this.count = count;
    this.callback = callback;
    this.active = -1;
    this.init();
    this.bindEvents();
  }
  
  Star.prototype.init = function() {
    const fragment = document.createDocumentFragment();
    for (let i = 1; i <= this.count; i++) {
      const iElem = document.createElement("i");
      iElem.classList.add("fa");
      iElem.classList.add("fa-star-o");
      iElem.dataset.ratingVal = i;
      fragment.appendChild(iElem);
    }
    this.element.appendChild(fragment);
  }
  
  Star.prototype.onMouseOver = function(e) {
    const ratingVal = e.target.dataset.ratingVal;
    if (!ratingVal) {
      return;
    }
    this.fill(ratingVal);
  }
  
  Star.prototype.fill = function(ratingVal) {
    for (let i = 0; i < this.count; i++) {
      if (i < ratingVal) {
        this.element.children[i].classList.add("fa-star");
      } else {
        this.element.children[i].classList.remove("fa-star");
      }
    }
  }
  
  Star.prototype.onMouseLeave = function(e) {
    this.fill(this.active);
  }
  
  Star.prototype.onClick = function(e) {
    this.active = e.target.dataset.ratingVal;
    this.fill(this.active);
    this.callback(this.active);
  }
  
  Star.prototype.bindEvents = function() {
    this.element.addEventListener("mouseover", this.onMouseOver.bind(this));
    this.element.addEventListener("click", this.onClick.bind(this));
    this.element.addEventListener("mouseleave", this.onMouseLeave.bind(this));
  }
  
  
  
  function getStar(value) {
    document.getElementById('display-star-value').innerHTML = value;
  }
  new Star("#star", 5, getStar);
  