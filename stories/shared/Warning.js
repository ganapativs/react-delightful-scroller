import React, { useState } from 'react';
import styled from 'styled-components';
import { getUrlParameter, inIframe, isChrome } from '../utils/helpers';

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
  const path = getUrlParameter('path', location).replace('/story/', '');
  window.open(`${origin}/iframe.html?id=${path}`);
};

const isInChromeIframe = isChrome && inIframe();

export const Warning = ({ children }) => {
  const [hideBanner, setHideBanner] = useState(false);

  return isInChromeIframe && !hideBanner ? (
    <>
      <Banner onClick={openStory}>
        <b>
          Scroll performance in iframe is very choppy in Chrome for some reason
          🙆‍♂️
        </b>
        <br />
        <small>(works well in other browser implementations though 🤔)</small>
        <br />
        <br />
        Click this box to open the story in new tab for better performance 🙏
      </Banner>
      <p style={{ textAlign: 'right' }}>
        <a
          style={{ cursor: 'pointer', color: 'var(--darkYellow)' }}
          onClick={() => setHideBanner(true)}>
          Show in iframe anyway
        </a>
      </p>
    </>
  ) : (
    children
  );
};
