window.addEventListener("DOMContentLoaded", (event) => {
  const body = document.querySelector("body");
  const timeline = document.querySelector(".timeline");
  const navHomepage = document.querySelector(".nav-homepage");
  const timelineButton = document.querySelector(".timeline-button");
  const colRight = document.querySelector(".col-right");
  const iframes = document.querySelectorAll(".iframe-resizer");
  const introImage = document.querySelector(".intro .image");
  let lastKnownScrollPosition = 0;
  let ticking = false;

  function setTimelineFixed(scrollPos) {
    if (scrollPos >= colRight.offsetTop && window.innerWidth >= 1024) {
      timeline.classList.add("fixed");
    } else {
      timeline.classList.remove("fixed");
    }
  }

  function setLogoVisibleHomepage(scrollPos) {
    if (navHomepage && scrollPos > introImage.offsetTop) {
      navHomepage.classList.add("logo-visible");
    } else {
      navHomepage.classList.remove("logo-visible");
    }
  }

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
  setLogoVisibleHomepage(window.scrollY);
  window.addEventListener("resize", function (e) {
    [...iframes].map((iframe) => resizeIframe(iframe));
    setTimelineFixed(window.scrollY);
    if (window.innerWidth >= 1024) {
      body.classList.remove("disable-touch-scroll");
      timeline.classList.remove("active");
      timelineButton.classList.remove("active");
    }
  });

  document.addEventListener("scroll", function (e) {
    lastKnownScrollPosition = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(function () {
        setTimelineFixed(lastKnownScrollPosition);
        setLogoVisibleHomepage(lastKnownScrollPosition);

        ticking = false;
      });

      ticking = true;
    }
  });

  const resizeIframe = function (iframe) {
    const iframeWrapper = iframe.querySelector("div");
    const iframeContent = iframeWrapper.querySelector("iframe");
    const defaultHeight = iframeContent.getAttribute("height");
    const defaultWidth = iframeContent.getAttribute("width");
    const isBandcamp = iframeContent.getAttribute("src").search("bandcamp") > 1;
    let height;

    if (
      defaultWidth &&
      defaultHeight &&
      !defaultWidth.match(/\%/) &&
      !isBandcamp
    ) {
      const ratio = parseFloat(defaultWidth) / parseFloat(defaultHeight);
      height = iframeWrapper.clientWidth / ratio;
      iframeContent.style.height = height + "px";
    }
  };
  [...iframes].map((iframe) => resizeIframe(iframe));
});
