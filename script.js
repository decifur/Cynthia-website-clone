const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function firstPageAnim(){
  var tl = gsap.timeline();

  tl.to(".boundingelem_down , .boundingelem_top", {
    y: 0,
    duration: 2,
    ease: Expo.easeInOut,
    stagger: .2
  })
}

function circleMouseFollower() {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`;
  });
}
circleMouseFollower();
firstPageAnim();