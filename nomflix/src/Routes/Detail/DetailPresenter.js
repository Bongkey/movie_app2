import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loader from '../../Components/Loader';
import { Helmet } from 'react-helmet';
import Logo from '../../Components/Logo';
import Trailer from '../../Components/Trailer';
import Credit from '../../Components/Credit';

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
`;

const Cover = styled.div`
  width: 40%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
  margin-right: 20px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const TitleAndLinkContainer = styled.div`
  display: flex;
`;

const Title = styled.h3`
  font-size: 40px;
  margin-right: 20px;
  margin-bottom: 10px;
`;

const IMDBLink = styled.a`
  width: 80px;
  height: 40px;
  display: block;
  background-image: url('https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
`;
const ItemContainer = styled.div`
  margin: 20px 0px;
`;

const Item = styled.span`
  font-size: 22px;
`;

const Divider = styled.span`
  font-size: 15px;
  margin: 0px 10px;
  font-weight: 900;
`;

const Overview = styled.p`
  font-size: 18px;
  opacity: 0.9;
  line-height: 1.8;
  width: 70%;
`;

const LogoContainer = styled.div`
  margin: 20px 0px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 230px;
  padding-bottom: 20%;
  margin-right: 450px;
`;

const VideosContainer = styled.div`
  margin-top: 40px;
  display: flex;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #2f3542;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  &::-webkit-scrollbar-track {
    background-color: grey;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
`;

const ActorsContainer = styled.div`
  margin: 20px 0px;
  width: 100%;
  height: 330px;
  display: grid;
  grid-template-rows: repeat(1, 240px);
  grid-template-columns: repeat(100, 1fr);
  overflow: auto;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #2f3542;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  &::-webkit-scrollbar-track {
    background-color: grey;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
`;

const DetailPresenter = ({ key, result, credits, error, loading }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading... | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}
          | Nomflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require('../../assets/noPosterSmall.png')
          }
        />
        <Data>
          <TitleAndLinkContainer>
            <Title>
              {result.original_title
                ? result.original_title
                : result.original_name}
            </Title>
            <IMDBLink
              href={`https://imdb.com/title/${result.imdb_id}`}
            ></IMDBLink>
          </TitleAndLinkContainer>

          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>·</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time}min
            </Item>
            <Divider>·</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `,
                )}
            </Item>
          </ItemContainer>
          <LogoContainer>
            {result.production_companies &&
              result.production_companies
                .filter((company) => {
                  return company.logo_path !== null;
                })
                .map((company) => <Logo key={company.id} company={company} />)}
          </LogoContainer>
          <Overview>{result.overview}</Overview>
          <ActorsContainer>
            {credits.cast.map((actor) => (
              <Credit actor={actor}></Credit>
            ))}
          </ActorsContainer>
          <VideosContainer>
            {result.videos.results &&
              result.videos.results.map((result, index) => (
                <VideoContainer key={result.id}>
                  <Trailer key={result.id} video={result.key} />
                </VideoContainer>
              ))}
          </VideosContainer>
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default DetailPresenter;
