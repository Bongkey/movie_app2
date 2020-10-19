import React from 'react';
import DetailPresenter from './DetailPresenter';
import { moviesApi, tvApi } from '../../api';

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props;
    this.state = {
      result: null,
      credits: null,
      error: null,
      loading: true,
      isMovie: pathname.includes('/movie/'),
    };
  }

  async componentDidMount() {
    // find a id & path from router
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;
    const { isMovie } = this.state;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push('/');
    }

    //Search Movie or TV
    let result = null;
    let credits = null;
    try {
      if (isMovie) {
        ({ data: result } = await moviesApi.movieDetail(parsedId));
        ({ data: credits } = await moviesApi.movieCredit(parsedId));
      } else {
        ({ data: result } = await tvApi.showDetail(parsedId));
        ({ data: credits } = await tvApi.showCredit(parsedId));
      }
    } catch {
      this.setState({ error: '결과를 찾을 수 없습니다.' });
    } finally {
      this.setState({ loading: false, result, credits });
    }
  }
  render() {
    const { result, credits, error, loading } = this.state;
    return (
      <DetailPresenter
        result={result}
        credits={credits}
        error={error}
        loading={loading}
      />
    );
  }
}
