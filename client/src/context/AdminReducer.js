import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    CLEAR_ERRORS,
    AUTH_ERROR,
    GET_USERS,
    GET_USERS_FAILED,
    GET_USER,
    GET_USER_FAILED,
    GET_USER_MEME,
    SET_LOADING,
    BLOCK_USER,
    UNBLOCK_USER,
    DELETE_USER,
    MEME_STAR
  
  } from './types'

  export default (state, action) =>{
      switch(action.type){

        case LOGIN_SUCCESS:
                localStorage.setItem('token',action.payload.token)
                return {
                   ...state,
                   ...action.payload,
                   isAuthenticated:true,
                   loading:false  
               }; 

        case LOGIN_FAIL:
                localStorage.removeItem('token');
                return {
                    ...state,
                    token:null,
                    isAuthenticated:false,
                    loading:false,
                    user:null,
                    error:action.payload
                }
        case GET_USERS:
            return {
                ...state,
                isAuthenticated:true,
                users:action.payload,
                serviceLoading:false
            }
         case GET_USER:
             return {
                    ...state,
                    isAuthenticated:true,
                    user:action.payload,
                    serviceLoading:false
                    }

      case GET_USER_MEME:
             return {
                    ...state,
                    isAuthenticated:true,
                    user_Memes:action.payload,
                    serviceLoading:false
                    }
     case UNBLOCK_USER:
             return {
                    ...state,
                    isAuthenticated:true,
                    serviceLoading:false
                    }
     case BLOCK_USER:
             return {
                    ...state,
                    isAuthenticated:true,
                    serviceLoading:false
                    }
    case DELETE_USER:
             return {
                    ...state,
                    isAuthenticated:true,
                    serviceLoading:false
                    }
        
           
    case SET_LOADING:
            return {
                ...state,
                serviceLoading:true
            }
   case MEME_STAR:
            return {
                ...state,
                meme_star:action.payload,
                serviceLoading:true
            }
        
     case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token:null,
                isAuthenticated:false,
                loading:false,
                user:null,
                error:action.payload
            }  
            
          default:
              return state
      }
  }