import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Image = styled.div`
  margin: 0px 10px;
  width: 140px;
  height: 60px;
  background: #fff;
  opacity: 0.5;
  background-image: url(${(props) => props.bgUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 7px;
  transition: opacity 0.3s linear;
`;

const ImageContainer = styled.div`
  margin: 10px 0px;
  position: relative;
  &:hover {
    ${Image} {
      opacity: 1;
    }
  }
`;

const Logo = ({ company }) => (
  <ImageContainer>
    <Image
      bgUrl={`https://image.tmdb.org/t/p/w300/${company.logo_path}`}
    ></Image>
  </ImageContainer>
);

Logo.protoTypes = {
  company: PropTypes.object.isRequired,
};

export default Logo;
