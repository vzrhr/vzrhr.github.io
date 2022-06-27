window.addEventListener("load", (event) => {
  const timeline = document.querySelector(".timeline");
  const nav = document.querySelector("nav");
  const main = document.querySelector("main");
  const colRight = document.querySelector(".col-right");
  let lastKnownScrollPosition = 0;
  let ticking = false;
  main.style.paddingTop = nav.offsetHeight;

  setTimelineFixed(window.scrollY);
  function setTimelineFixed(scrollPos) {
    if (scrollPos >= colRight.offsetTop) {
      timeline.classList.add("fixed");
    } else {
      timeline.classList.remove("fixed");
    }
  }

  document.addEventListener("resize", function (e) {
    setTimelineFixed(window.scrollY);
  });

  document.addEventListener("scroll", function (e) {
    lastKnownScrollPosition = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(function () {
        setTimelineFixed(lastKnownScrollPosition);
        ticking = false;
      });

      ticking = true;
    }
  });
});
