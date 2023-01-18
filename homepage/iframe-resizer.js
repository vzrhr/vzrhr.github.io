window.addEventListener("DOMContentLoaded", (event) => {
  const iframes = document.querySelectorAll(".iframe-resizer");

  window.addEventListener("resize", function (e) {
    [...iframes].map((iframe) => resizeIframe(iframe));
    setTimelineFixed(window.scrollY);
    if (window.innerWidth >= 1024) {
      body.classList.remove("disable-touch-scroll");
      timeline.classList.remove("active");
      timelineButton.classList.remove("active");
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
