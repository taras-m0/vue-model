import Model from "../../src/Model";
import User from "./User";
import api from '../api'

class Form extends Model {
  user = User

  get id(){
    if( typeof this.user == 'object'){
      return this.user.id
    }else {
      return ''
    }
  }

  set id(id){
    api(id).then(
      (user) => {
        this._loadData({ user: user })
      }).catch(() => {
        this.user = new User()._loadData({id: 0, name: '', family: ''})
    })
  }
}

export default new Form()._loadData({
  user: new User()._loadData({
    id: 0,
    name: '',
    family: ''
  })
})