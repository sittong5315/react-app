import { createStore } from 'redux';
var initState = {
    user: {
        name: '11',
        pass: '11',
        type: '2'
    }
}
function reducer(state = initState, action) {
    //action={type:"",payload:""}
    switch (action.type) {
        case "login":
            state.user = action.payload;
            return state;
        case "exit":
            state.user = {
                name: '',
                pass: '',
                type: ''
            };
            return state;
    }
}
let store = createStore(reducer);
export default store;