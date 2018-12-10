import * as actions from '../actions/AppActions';
import { put, call, all } from 'redux-saga/effects';
import { axiosTMDB3 } from '../../shared/AxiosMovieAPI';

export function* fetchConfigInitSaga(action) {
  yield put(actions.fetchConfigInitStart());
  try {
    const {imgConfig, movieGenres, tvGenres} = yield all({
      // Image Config data
      imgConfig: call(axiosTMDB3, '/configuration?api_key=' + process.env.REACT_APP_TMDB_KEY),

      // Movie Genre ID data
      movieGenres: call(axiosTMDB3, '/genre/movie/list?api_key=' + process.env.REACT_APP_TMDB_KEY),
      
      // TV Genre ID data
      tvGenres: call(axiosTMDB3, '/genre/tv/list?api_key=' + process.env.REACT_APP_TMDB_KEY)
    });

    yield put(actions.fetchConfigInitSuccess([
      imgConfig.data.images, 
      movieGenres.data.genres, 
      tvGenres.data.genres
    ]));
  } catch(error) {
    yield put(actions.fetchConfigInitFail(error));
  }
}