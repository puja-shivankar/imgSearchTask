import axios from "axios";

const search_img_request= 'search_img_request';
const search_img_success= 'search_img_success';
const search_img_failure= 'search_img_failure';

export const searchImgRequest=()=>({
    type:search_img_request,
});

export const searchImgSuccess=(images)=>({
    type: search_img_success,
    payload: images,
});

export const searchImgFailure=(error)=>({
    type: search_img_failure,
    payload:error,
});

// Action 

export const searchImgs=(query)=>{
    return (dispatch)=>{
        dispatch(searchImgRequest());
        axios.get(`https://api.unsplash.com/search/photos?query=${query}&client_id=PtAoTLMzrHnwlsrJWg36iy5uOb5ayqjJJoGivsdslLw`).then((response)=>{
            dispatch(searchImgSuccess(response.data.results));
        })
        .catch((error)=>{
            dispatch(searchImgFailure(error.message));
        });
    };

};

const initialState={
    loading: false,
    images:[],
    error: '',
};

//reducer for search

const imgSearchReducer=(state=initialState,action)=>{
    switch(action.type){
        case search_img_request:
            return {
                ...state,
                loading: true,
                error:'',
            };
        case search_img_success:
            return {
                ...state,
                loading: false,
                images:action.payload,
                error: '',
            };
        case search_img_failure:
            return{
                ...state,
                loading: false,
                images: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default imgSearchReducer;