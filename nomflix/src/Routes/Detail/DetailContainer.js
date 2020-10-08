import React from 'react';
import DetailPresenter from './DetailPresenter';
import { moviesApi, tvApi } from '../../api';

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathName },
    } = props;
    this.state = {
      result: null,
      error: null,
      loading: true,
      isMovie: pathName.includes('/movie/'),
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
    try {
      if (isMovie) {
        result = await moviesApi.movieDetail(parsedId);
      } else {
        result = await tvApi.showDetail(parsedId);
      }
      console.log(result);
    } catch {
      this.setState({ error: "Can't find anything" });
    } finally {
      this.setState({ loading: false, result });
    }
  }
  render() {
    const { result, error, loading } = this.state;
    return <DetailPresenter result={result} error={error} loading={loading} />;
  }
}
