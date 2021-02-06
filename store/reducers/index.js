function reducer (state = {}, action){
    console.log('reducer chala',action)
    switch(action.type){
        
    case 'fbData':{
        return{...state,data:action.data}
    }
    // case 'docid':{
    //     return{...state,docid:action.data}
    // }
    default : {
        return state
    }
}

}
export default reducer