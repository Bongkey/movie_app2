import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Conatiner = styled.div`
  :not(:last-child) {
    margin-bottom: 50px;
  }
`;

const Title = styled.span`
  font-size: 22px;
  font-weight: 600;
`;

const Grid = styled.div`
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 230px);
  grid-gap: 30px;
`;

const Section = ({ title, children }) => (
  <Conatiner>
    <Title>{title}</Title>
    <Grid>{children}</Grid>
  </Conatiner>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Section;
