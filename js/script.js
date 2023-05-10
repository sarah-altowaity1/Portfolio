particlesJS("particles-js", {"particles":{"number":{"value":80,"density":{"enable":true,"value_area":800}},"color":{"value":"#ffffff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.5,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"repulse"},"onclick":{"enable":true,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});

var glasses1 = document.getElementsByClassName("glasses1");
var glasses2 = document.getElementsByClassName("glasses2");
var CS =  document.getElementsByClassName("CS");
var IM =  document.getElementsByClassName("IM");
for (let i = 0; i < glasses1.length; i++) {
    glasses1[i].addEventListener('mouseover', () => {
        glasses1[i].style.fill ="#FFFF00"
        CS[0].style.visibility = "visible"

    });
    glasses1[i].addEventListener('mouseout', () => {
        glasses1[i].style.fill ="#f5ffff"
        CS[0].style.visibility = "hidden"
    });
    glasses2[i].addEventListener('mouseover', () => {
        glasses2[i].style.fill ="#FFFF00"
        IM[0].style.visibility = "visible"

    });
    glasses2[i].addEventListener('mouseout', () => {
        glasses2[i].style.fill ="#f5ffff"
        // CS[0].style.visibility = "hidden"
        IM[0].style.visibility = "hidden"
    });
    CS[i].addEventListener('mouseover', () => {
        CS[0].style.visibility = "visible"
        glasses1[i].style.fill ="#FFFF00"

    });

    IM[i].addEventListener('mouseover', () => {
        IM[0].style.visibility = "visible"
        glasses2[i].style.fill ="#FFFF00"

    });
    CS[i].addEventListener('mouseout', () => {
        CS[0].style.visibility = "hidden"
        glasses1[i].style.fill ="#f5ffff"

    });
    IM[i].addEventListener('mouseout', () => {
        IM[0].style.visibility = "hidden"
        glasses2[i].style.fill ="#f5ffff"

    });
} 




/* Function that simulates a typewriteer effect bu typing out one characcter at a time 
arguments: el -> DOM element that will display the text, modArr -> array of strings
that will be typed out sequentially, period -> interval of time in msec between the typing of 
each character 
*/
var typeWrite = function(el, modArr, period) {
    this.modArr = modArr;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};
// define a prototype method that does the typing 
typeWrite.prototype.tick = function() {
    // Determine which string from the string array to type next 
    var i = this.loopNum % this.modArr.length;
    var fullTxt = this.modArr[i]; // Stores the full string being typed out 
    // Check if function is in delete mode (in the middle of deleting characters)
    // Subtract characters if func is in deleting mode, add characters otherwise
    if (this.isDeleting) { 
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    
    // Display the updated text in the DOM element
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    // Set a random amount of time to wait before adding a new character 
    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }
    // Use the setTimeout function to call the tick prototyoe method 
    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    // get string elements to be typed by the function typeWrite from the HTML focument 
    var elements = document.getElementsByClassName('typewrite');
    // Iterate through elements displaying them using typeWrite()
    for (var i=0; i<elements.length; i++) {
        var modArr = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (modArr) {
          new typeWrite(elements[i], JSON.parse(modArr), period);
        }
    }
    // Inject CSS to display flashing cursor effect
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #FFA500}";
    document.body.appendChild(css);
};
