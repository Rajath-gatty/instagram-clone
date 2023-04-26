import { safeUser } from "../types";
import { createContext, useReducer, ReactNode, useContext, useCallback } from "react";


const initialState: any = {
        posts: [],
        id: '',
        name: '',
        email: '',
        totalPosts: 0,
        emailVerified: null,
        image: '',
        hashedPassword: null,
        followersCount: 0,
        followingCount: 0,
        followers: [],
        following: [],
        createdAt: '',
        updatedAt: '',
        savedPosts: [],
        likedPosts: []
}

const reducer = (state: any,action: any) => {
    if(action.type==="SET_USER") {
        return action.payload
    }
    else if(action.type==="SET_LIKED_POST") {
        const newState = {...state};
        const updatedLike = [...newState.likedPosts,action.payload]
        const updatedState = {...newState,likedPosts:updatedLike}
        console.log(updatedState)
        return updatedState;
    } 
    else if(action.type==="UNLIKE_POST") {
        const newState = {...state};
        const updatedLikedPosts = newState.likedPosts.filter((id: string) => id !== action.payload);
        const updatedState = {...newState,likedPosts:updatedLikedPosts}
        console.log(updatedState)
        return updatedState;
    } 
}

export const userContext = createContext<{
    state: any,
    setCurrentUser: (user:safeUser) => void,
    setLikedPost: (postId: string) => void
    unlikePost: (postId: string) => void
  }>({
    state: initialState, 
    setCurrentUser: () => null,
    setLikedPost: () => null,
    unlikePost: () => null
    });

export const UserProvider = ({children}:{children:ReactNode}) => {
    const [state,dispatch] = useReducer(reducer,initialState);

    const setCurrentUser = useCallback((user:safeUser) => {
        dispatch({type:"SET_USER",payload:user})
    },[])

    const setLikedPost = useCallback((postId: string) => {
        dispatch({type:"SET_LIKED_POST",payload:postId})
    },[])

    const unlikePost = useCallback((postId: string) => {
        dispatch({type:"UNLIKE_POST",payload:postId})
    },[])

    return (
        <userContext.Provider value={{state,setCurrentUser,setLikedPost,unlikePost}}>
            {children}
        </userContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(userContext)
}



