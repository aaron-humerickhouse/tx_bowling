import {
  GET_TOURNAMENTS_FAILURE, GET_TOURNAMENTS_STARTED, GET_TOURNAMENTS_SUCCESS,
  GET_TOURNAMENT_FAILURE, GET_TOURNAMENT_STARTED, GET_TOURNAMENT_SUCCESS
} from '../actions/tournaments';

export default function tournaments(state = {}, action) {
  switch (action.type) {
    case GET_TOURNAMENTS_STARTED:
      return { ...state, loading: true };
    case GET_TOURNAMENTS_SUCCESS:
      return { ...state, ...action.payload, loading: false, error: null };
    case GET_TOURNAMENTS_FAILURE:
      return { ...state, loading: false, error: action.payload.errorMessage };
    case GET_TOURNAMENT_STARTED:
      return { ...state, loading: true };
    case GET_TOURNAMENT_SUCCESS:
      return { ...state, ...action.payload, loading: false, error: null };
    case GET_TOURNAMENT_FAILURE:
      return { ...state, loading: false, error: action.payload.errorMessage };

    default:
      return state;
  }
}
