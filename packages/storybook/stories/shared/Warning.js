import React from "react";
import styled from "styled-components/macro";
import { getUrlParameter, inIframe, isChrome } from "../utils/helpers";

const Banner = styled.div`
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

export const Warning = () => {
  return isChrome && inIframe() ? (
    <Banner onClick={openStory}>
      Scroll performance in Iframe is very choppy in Chrome for some reason
      (works well in Firefox though). Click here to open demo in standalone tab.
    </Banner>
  ) : null;
};
