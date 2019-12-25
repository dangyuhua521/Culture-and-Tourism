import axios from 'axios';
import store from "../components/store/Store"

// import {baseURL} from "../../config/dev.env"
axios.defaults.timeout = 5000;
axios.defaults.baseURL = process.env.BASE_API;
axios.defaults.baseURLDOWN_API = process.env.DOWN_API;

//http request 拦截器
axios.interceptors.request.use(
    config => {

        // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
        //      config.data = JSON.stringify(config.data);

        config.headers = {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('token') || ''
        }
        return config;
    },
    error => {
        return Promise.reject(err);
    }
);

//http response 拦截器
axios.interceptors.response.use(
    response => {
    	
        return response;
       
    },
    error => {
    	
        return Promise.reject(error)
    }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
    return new Promise((resolve, reject) => {
        if (!params.IsLoading) {
            store.commit("LOADING", true);
        }
        axios.get(url, { params: params })
            .then((response) => {
                resolve(response.data);
                if (response.data.code == 404) {
                    this.$message({
                        type: 'info',
                        message: response.data.message
                    });
                }
                let that=this;
                console.log(this)
                 if(response.data&&response.data.code==401){
                 	localStorage.setItem("userInfo", "");
					localStorage.setItem("token", "");
                 	if(that.$route.meta.token){
//               		this.$router.push(this.$route.path)
						window.location.reload();
                 	}else{                 	
						this.$message({
	                        type: 'info',
	                        message: response.data.message
	                    });	
                 	}					
		    	}
                // if (!params.IsLoading) {
                //     this.$nextTick(()=>{
                //         store.commit("LOADING", false);
                //     })

                // }

            }).catch((err) => {
                // if (!params.IsLoading) {
                //     this.$nextTick(()=>{
                //         store.commit("LOADING", false);
                //     })

                // }
                //              if(err)

                reject(err)




            })
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        if (!data.IsLoading) {
            store.commit("LOADING", true);
        }
        axios.post(url, data)
            .then(response => {
                resolve(response.data);
                if (!data.IsLoading) {
                    store.commit("LOADING", false);
                }
                if(response.data&&response.data.code==401){
                 	this.$parent.$parent.$parent.istoken=false
		    		localStorage.setItem("userInfo", "");
					localStorage.setItem("token", "");
					this.$message({
                        type: 'info',
                        message: response.data.message
                    });
					
		    	}
            }, ).catch(err => {
                if (!data.IsLoading) {
                    store.commit("LOADING", false);
                }
                reject(err)
            })
    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data)
            .then(response => {
                resolve(response.data);
                if(response.data&&response.data.code==401){
                 	this.$parent.$parent.$parent.istoken=false
		    		localStorage.setItem("userInfo", "");
					localStorage.setItem("token", "");
					this.$message({
                        type: 'info',
                        message: response.data.message
                    });
					
		    	}
            }).catch(err => {
                reject(err)
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */