import React, { useEffect } from "react";
import styled from "styled-components/macro";
import { getUrlParameter, inIframe, isChrome } from "../utils/helpers";

const Banner = styled.div`
  background: var(--darkYellow);
  padding: 15px;
  margin-bottom: 15px;
  color: var(--yellow);
  border: 4px solid var(--darkYellow);
  cursor: pointer;
  font-weight: thin;
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

const isInChromeIframe = isChrome && inIframe();

export const Warning = ({ children }) => {
  useEffect(() => {
    if (isInChromeIframe) {
      setTimeout(() => {
        openStory();
      }, 1000);
    }
  }, []);

  return isInChromeIframe ? (
    <Banner onClick={openStory}>
      <b>
        Scroll performance in iframe is very choppy in Chrome for some reason
      </b>
      (works well other browser implementations though). Opening the story in
      new tab for better performance.
      <br />
      <br />
      <small>Click this box to open the story again.</small>
    </Banner>
  ) : (
    children
  );
};
