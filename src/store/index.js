import {decorate,observable,computed,action} from 'mobx'
class UserStore {
    constructor(){
        this.token  = window.localStorage.getItem('token')
        this.expire  = window.localStorage.getItem('expire')
    }
    token=''
    expire=''
    get isLogin(){
        return this.token && this.expire && (this.expire > Date.now())
    }
    setToken(token,expire){
        window.localStorage.setItem('token',token)
        window.localStorage.setItem('expire',expire)
        Object.assign(this,{
            token,
            expire,
        })
    }
}

decorate(UserStore,{
    token:observable,
    expire:observable,
    isLogin:computed,
    setToken:action,
})

const userStore = new UserStore()
export {userStore}