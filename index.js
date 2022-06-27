window.addEventListener("load", (event) => {
  const body = document.querySelector("body");
  const timeline = document.querySelector(".timeline");
  const timelineButton = document.querySelector(".timeline-button");
  const colRight = document.querySelector(".col-right");
  let lastKnownScrollPosition = 0;
  let ticking = false;

  function setTimelineFixed(scrollPos) {
    if (scrollPos >= colRight.offsetTop && window.innerWidth >= 1024) {
      timeline.classList.add("fixed");
    } else {
      timeline.classList.remove("fixed");
    }
  }

  body.addEventListener(
    "touchmove",
    function (event) {
      if (timeline.classList.contains("active")) {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    false
  );

  timelineButton.addEventListener("click", function (e) {
    if (timeline.classList.contains("active")) {
      body.classList.remove("disable-touch-scroll");
      timeline.classList.remove("active");
      timelineButton.classList.remove("active");
    } else {
      body.classList.add("disable-touch-scroll");
      timeline.classList.add("active");
      timelineButton.classList.add("active");
    }
  });

  setTimelineFixed(window.scrollY);
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
