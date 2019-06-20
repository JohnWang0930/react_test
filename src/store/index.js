import {decorate,observable,computed,action} from 'mobx'
class UserStore {
    constructor(){
        const token  = window.localStorage.getItem('token')
        const expire  = window.localStorage.getItem('expire')
        this.setToken(token,expire)
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