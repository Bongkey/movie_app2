import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
const ActorImg = styled.div`
  width: 160px;
  height: 240px;
  background: #fff;
  opacity: 0.8;
  border-radius: 5px;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  transition: opacity 0.3s linear;
`;

const ActorName = styled.span`
  font-size: 18px;
  display: block;
  width: 160px;
  text-align: center;
  background: #000;
  transition: opacity 0.3s linear;
  opacity: 0;
`;

const CharacterName = styled.span`
  font-size: 18px;
  display: block;
  width: 160px;
  text-align: center;
  background: #535c68;
  transition: opacity 0.3s linear;
  opacity: 0;
`;

const Actor = styled.div`
  margin: 0px 10px;
  &:hover {
    ${ActorImg} {
      opacity: 1;
    }
    ${ActorName} {
      opacity: 1;
    }
    ${CharacterName} {
      opacity: 1;
    }
  }
`;

const Credit = ({ key, actor }) => (
  <Container>
    <Actor>
      <ActorImg
        bgImage={
          actor.profile_path
            ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
            : require('../assets/noPosterSmall.png')
        }
      />
      <ActorName>
        {actor.name}
        {console.log(actor)}
      </ActorName>
      <CharacterName>{actor.character}</CharacterName>
    </Actor>
  </Container>
);

export default Credit;
