import {decorate,observable,computed,action} from 'mobx'
class UserStore {
    token=''
    expire=''
    get isLogin(){
        return this.token && this.expire && (this.expire > Date.now())
    }
    setToken(token,expire){
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