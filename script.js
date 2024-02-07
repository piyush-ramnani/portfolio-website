const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

// ----HERO ANIMATION----
function heroAnimation() {
  var tl = gsap.timeline();

  //nav animation
  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1,
    ease: Expo.easeInOut,
  })
    // heading animation
    .to(".visual-box-element", {
      y: "0",
      ease: Expo.easeInOut,
      duration: 0.6,
      delay: -0.3,
      stagger: 0.3,
    })
    //footer animation
    .from("#hero-footer", {
      y: -10,
      opacity: 0,
      duration: 1,
      delay: -0.5,
      ease: Expo.easeInOut,
    });
}

//----HERO FOOTER ANIMATION----
function floatSkills() {
  var tl = gsap.timeline();

  // Loop through each .skill element
  document.querySelectorAll(".skill").forEach(function (skill) {
    var randomY = gsap.utils.random(-5, 8);
    tl.to(skill, {
      y: `${randomY}px`, //up-down movement
      duration: gsap.utils.random(1, 2),
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
    });
  });
}

//----MOUSE FOLLOWER ANIMATION----

var timeout; //Global variable to clear the timer

function mouseFollowPointer(x, y) {
  window.addEventListener("mousemove", function (details) {
    document.querySelector(
      "#follow-circle"
    ).style.transform = `translate(${details.clientX}px,  ${details.clientY}px) scale(${x}, ${y})`;
  });
}

function mousePointerWobble() {
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;

  window.addEventListener("mousemove", (details) => {
    clearTimeout(timeout);
    var dx = details.clientX - xprev;
    var dy = details.clientY - yprev;

    xscale = gsap.utils.clamp(0.8, 1.2, dx);
    yscale = gsap.utils.clamp(0.8, 1.2, dy);

    xprev = details.clientX;
    yprev = details.clientY;

    // console.log(dx + " : " + dy);

    mouseFollowPointer(xscale, yscale);

    //To reset the scale to (1,1) after a short time if no more movement is detected
    timeout = setTimeout(() => {
      document.querySelector(
        "#follow-circle"
      ).style.transform = `translate(${details.clientX}px,  ${details.clientY}px) scale(1,1)`;
    }, 100);
  });
}

//----PROJECTS ANIMATION----

function projectImageAnimation() {
  document.querySelectorAll(".element").forEach((element) => {
    var rotate = 0;
    var rotationDiff = 0;

    element.addEventListener("mouseleave", function (details) {
      gsap.to(element.querySelector("img"), {
        opacity: 0,
        ease: Power1,
      });
      gsap.to(element.querySelector("h2"), {
        opacity: 1,
        ease: Power2,
      });
    });

    element.addEventListener("mousemove", function (event) {
      var rect = element.getBoundingClientRect();
      var mouseX = event.clientX - rect.left;
      var mouseY = event.clientY - rect.top;

      var image = element.querySelector("img");
      var imageWidth = image.offsetWidth;
      var imageHeight = image.offsetHeight;

      var imageX = mouseX - imageWidth / 2;
      var imageY = mouseY - imageHeight / 2;

      rotationDiff = event.clientX - rotate;
      rotate = event.clientX;

      gsap.to(image, {
        opacity: 1,
        ease: Power3,
        top: imageY,
        left: imageX,
        rotate: gsap.utils.clamp(-20, 20, rotationDiff * 0.5),
      });
      gsap.to(element.querySelector("h2"), {
        opacity: 0.5,
        ease: Power2,
      });
    });

    /* 
    ----ORIGINAL CODE----
    element.addEventListener("mousemove", function (details) {
      var borderDiff = details.clientY - element.getBoundingClientRect().top;
      rotationDiff = details.clientX - rotate;
      rotate = details.clientX;
      gsap.to(element.querySelector("img"), {
        opacity: 1,
        ease: Power3,
        top: borderDiff,
        left: details.clientX,
        rotate: gsap.utils.clamp(-20, 20, rotationDiff * 0.5),
      });
      gsap.to(element.querySelector("h2"), {
        opacity: 0.5,
        ease: Power2,
      });
    });
    */
  });
}

//---TIME---
function updateTime() {
  const timeFormat = new Date().toLocaleTimeString().toUpperCase();
  document.querySelector(".time").innerHTML = timeFormat;
}

setInterval(updateTime, 1000);

floatSkills();
updateTime();
projectImageAnimation();
mousePointerWobble();
mouseFollowPointer();
heroAnimation();
