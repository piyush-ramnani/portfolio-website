# Inspired by a Product designer's website - Cynthia Iaugwu

Website: `https://www.cynthiaugwu.com/`
Huge thanks to Sheriyans Coding School for all the help and making this possible
YT : `https://www.youtube.com/watch?v=InvSEpJUXu4&t=3961s&ab_channel=SheryiansCodingSchool`

## Tech Used

- HTML
- CSS
- JS

### Style pre-sets

Fonts: `rgb(241, 227, 185)`

Font Family import: `@import url("https://fonts.googleapis.com/css2?family=League+Spartan:wght@700&family=Montserrat:wght@400;700&family=Poppins:wght@100;300;600&family=Sixtyfour&display=swap");`

icons: https://remixicon.com/

### Understanding the code

- HTML boiler plate code: `HTML:5`
- CSS boiler plate code:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
}
```

---

`box-model / border-box: ` When box-sizing is set to border-box, the width and height include the content, padding, and border of the element. This means if width is 100 pixels, that 100 pixels will include the content, padding, and border, and the actual content area will be smaller to accommodate the padding and border without changing the width.

```css
#heading h1 {
  line-height: 1;
  font-size: 9vw;
  text-transform: uppercase;
}
```

---

`line-height:` 1 is used to remove extra space at the top of heading. It makes sure that each letter
is on its own line.

`font-size:` 9vw sets the size of the heading based on the viewport's width. So if you resize your browser window, it will adjust accordingly.

```css
#heading #second-heading {
  margin-left: 160px;
}
```

To select a child id of an element id

---

```css
#hero-footer {
  position: absolute;
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px 0 30px;
}
```

This footer has `position:absolute`, so it will be placed `relative` to the nearest positioned
ancestor (which in this case is `<body>`). The `bottom:0` means it's aligned at the bottom of the viewport.

```css
img {
  opacity: 0;
  max-width: 500px;
  max-height: 400px;
  border-radius: 5%;
  z-index: 999;
  position: absolute;
}
```

Keeping the parent `position: relative` & image (child) `position: absolute` allows us to use these properties to place and size the images. The image starts off hidden (`opacity: 0`) and only becomes visible when it’s parent's `hover-state` changes. The `z-index: 999` makes sure the image stays on the top.

---

## Animation problem statements

1. Smooth Scrolling | Locomotive JS : `https://github.com/locomotivemtl/locomotive-scroll`

- Copy the github CSS file in a new CSS file of your project: `locomotive-scroll.css`
- link the css and js files into your HTML document
- Copy the `scroll` JS function from under the `Smooth` heading in a new JS file.
- change the selector to the `#main` in which you have your full website
- Link the JS file into the HTML document
  NOTE: Please make sure you have `absolute` positions with parents having relative `positions` as the scroll function consider the full website as a single div and might push the content at the bottom of the website

2. Mouse Follow pointer effect

- Make a div in HTML and style it as you want the pointer to look.
- Write a function in JS file that has an `window.eventlistener` on `mousemove`.
- Window.eventListener gives a CallBack function with event object as parameter, inside callback function get mouse x & y coordinates in the log.
- We will use `clientX and clientY` co-ordinates to follow the mouse.

2. gsap

```javascript
function heroAnimation() {
  var tl = gsap.timeline();

  //Hero animation
  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1,
    ease: Expo.easeInOut,
  });
}
```

- This is a direct animation using JavaScript's GSAP library.
- This targets navigation bar
- Similarly, we can translate the axis and add the below code for transition effect:

```javascript
    .to(".visual-box-element", {
      y: "0",
      ease: Expo.easeInOut,
      duration: 0.6,
      stagger: 0.3,
    })
```

## Biggest challenge:

To show project images on hover.

- Images were overflowing making it impossible to contain them in the project elements
- Image positioning was not looking great
- Shrinking the image to size 0 did not work as hover was not considering the child elements to be a part of the same div

### Solution:

- This ChatGPT code helped me resolve all of the problems above
- Though overflow of images needed to be hidden so that image did not re-appear outside of their respective divs

```javascript
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
```

## Additional features:

1. floating hero-footer `Skills` section.
2. Small projects section
3. Resume section
4. Live timer in the footer
5. Social links in the footer

## Remaining challenges

1. Adding small projects
