import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Video = styled.iframe`
  position: absolute;
  width: 400px;
  height: 230px;
`;

const Trailer = ({ key, video }) => (
  <Video src={`https://www.youtube.com/embed/${video}`} allowFullScreen></Video>
);

Trailer.propTypes = {
  video: PropTypes.string.isRequired,
};

export default Trailer;
