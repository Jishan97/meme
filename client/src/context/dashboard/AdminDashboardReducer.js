import {
  GET_ALL_MEME_TAGS,
  UPLOAD_MEME_TAG,
  GET_ALL_TRENDING_MEME_TOPICS,
  UPLOAD_TRENDING_MEME_TOPIC,
  GET_MEME_OF_THE_DAY,
  UPLOAD_MEME_OF_THE_DAY,
  UPLOAD_TROPHY_SEGMENT,
  SET_LOADING,
  SET_ERROR,
  CLEAR_ERROR,
  GET_MEME_COUNT,
  UPDATE_MEME_COUNT,
  GET_TROPHY_SEGMENT,
  GET_UPCOMING_EVENT,
  GET_TOTAL_USER,
  GET_USER_JOINED_TODAY,
  GET_ALL_MEMES,
  GET_USER_BY_USER_STATUS,
  GET_USER_BY_USER_TAG,
  APPROVE_MEME,
  DISSAPPROVE_MEME,
  UPDATE_USER_TAG,
  SET_GOOGLE_ADS,
} from "./type";

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_MEME_TAGS:
      return {
        ...state,
        memeTags: action.payload,
        isAuthenticated: true,
        serviceLoading: false
      };

    case UPLOAD_MEME_TAG:
      return {
        ...state,
        isAuthenticated: true,
        serviceLoading: false
      };

    case GET_ALL_TRENDING_MEME_TOPICS:
      return {
        ...state,
        trendingMemesTopic: action.payload,
        isAuthenticated: true,
        serviceLoading: false
      };
    case GET_MEME_OF_THE_DAY:
      return {
        ...state
      };
    case GET_MEME_COUNT:
      return {
        ...state,
        memeCount: action.payload,
        isAuthenticated: true,
        serviceLoading: false
      };
    case UPDATE_MEME_COUNT:
      return {
        ...state,
        isAuthenticated: true,
        serviceLoading: false
      };
    case GET_TROPHY_SEGMENT:
      return {
        ...state,
        trophySegment: action.payload,
        isAuthenticated: true,
        serviceLoading: false
      };
    case GET_UPCOMING_EVENT:
      return {
        ...state,
        upcomingEvents: action.payload,
        isAuthenticated: true,
        serviceLoading: false
      };
    case GET_TOTAL_USER:
      return {
        ...state,
        totalUser: action.payload,
        isAuthenticated: true,
        serviceLoading: false
      };
    case GET_USER_JOINED_TODAY:
      return {
        ...state,
        userJoinedToday: action.payload,
        isAuthenticated: true,
        serviceLoading: false
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        serviceLoading: false
      };
    case SET_LOADING:
      return {
        ...state,
        serviceLoading: true
      };

    case GET_ALL_MEMES:
      return{
        ...state,
        allMemes:action.payload,
        serviceLoading: false
      }
    case APPROVE_MEME:
      return{
        ...state,
        serviceLoading: false
      }
    case DISSAPPROVE_MEME:
      return{
        ...state,
        serviceLoading: false
      }
    case GET_USER_BY_USER_TAG:
      return{
        ...state,
        UserByTag:action.payload,
        serviceLoading: false
      }
      case GET_USER_BY_USER_STATUS:
          return{
            ...state,
            UserByStatus:action.payload,
            serviceLoading: false
          }
    default:
      return state;
  }
};
