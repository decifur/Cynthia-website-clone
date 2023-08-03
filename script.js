const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function firstPageAnim() {
  var tl = gsap.timeline();

  tl.to(".boundingelem_down , .boundingelem_top", {
    y: 0,
    duration: 2,
    ease: Expo.easeInOut,
    delay: -0.5,
    stagger: 0.2,
  }).from("#page1footer", {
    opacity: 0,
    duration: 1.2,
    delay: -1,
    ease: Expo.easeInOut,
  });
}

var timeout;

function circleToEclipse() {
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;
  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);

    var xdiff = dets.clientX - xprev;
    var ydiff = dets.clientY - yprev;

    xscale = gsap.utils.clamp(0.8, 1.2, xdiff);
    yscale = gsap.utils.clamp(0.8, 1.2, ydiff);

    xprev = dets.clientX;
    yprev = dets.clientY;

    circleMouseFollower(xscale, yscale);
    timeout = setTimeout(function () {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
    }, 100);
  });
};

function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
  });
}

document.querySelectorAll(".elem").forEach(function(elem){
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function(details){
    var diff = details.clientY - elem.getBoundingClientRect().top;
    diffrot = details.clientX - rotate;
    rotate = details.clientX; 

      gsap.to(elem.querySelector("img"), {
        opacity: 0,
        ease: Power1,
        top: 0,
        left: 0
      });
  });

  elem.addEventListener("mousemove", function(details){
    //console.log(elem.getBoundingClientRect()); // top: 439.38543701171875
    // console.log(details);
    var diff = details.clientY - elem.getBoundingClientRect().top-100;
    diffrot = details.clientX - rotate;
    rotate = details.clientX; 

      gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power3,
        top: diff,
        left: details.clientX - 200,
        rotate: gsap.utils.clamp(-20,20, diffrot * 0.5)
      });
  });
});

circleToEclipse();
circleMouseFollower();
firstPageAnim();
