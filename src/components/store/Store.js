import Vuex from 'vuex'
import Vue from "vue";
Vue.use(Vuex);
var NOTICENUM="NOTICENUM";
var NOTICEFUC="NOTICEFUC";
var ROUTESTATE = "ROUTESTATE"
var LOADING = "LOADING"
 var store =  new Vuex.Store({
    state: {
        noreadtotalnum:0,
        noticefuc:function(){},
        routeState:true,
        loadings: '',
    },
    mutations:{
        NOTICENUM:(state, data)=> {
            state.noreadtotalnum = data;
            console.log(state.noreadtotalnum);
        },
        LOADING:(state, payload)=> {
            state.loadings = payload
        },
        ROUTESTATE:(state, data)=> {
            state.routeState = data;
            console.log(state.routeState);
        },
    },
    actions:{
    	
    }
    // mutations:{
        
    // },
});
export {store as default};