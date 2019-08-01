import React from "react";
import styled from "styled-components/macro";

const isChrome =
  /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

function getUrlParameter(n, location = window.location) {
  const name = n.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp(`[\\?&]${name}=([^&#]*)`);
  const results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

const Warning = styled.div`
  background: var(--darkYellow);
  padding: 15px;
  margin-bottom: 15px;
  color: var(--yellow);
  border: 4px solid var(--darkYellow);
  cursor: pointer;
  font-weight: bold;
  line-height: 24px;

  &:hover {
    opacity: 0.8;
  }
`;

const openStory = () => {
  const { location } = window.top;
  const { origin } = location;
  const path = getUrlParameter("path", location).replace("/story/", "");
  window.open(`${origin}/iframe.html?id=${path}`);
};

// Keep components outside render, creating new instance of
// components in each update will discard(unmount)
// old components and re-creates them inside scroller
export const RenderContainer = ({ children, forwardRef }) => {
  return (
    <>
      {isChrome && inIframe() ? (
        <Warning onClick={openStory}>
          Scroll performance in Iframe is very choppy in Chrome for some reason
          (works well in Firefox though). Click here to open demo in standalone
          tab.
        </Warning>
      ) : null}
      <div ref={forwardRef}>{children}</div>
    </>
  );
};
