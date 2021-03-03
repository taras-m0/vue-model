const users = [{
  id: 1,
  name: 'Вася',
  family: 'Иванов'
},{
  id: 2,
  name: 'Петя',
  family: 'Петров'
}]

export default function (id){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user =users.find((user) => (user.id == id))
      if(user) {
        resolve(user)
      }else {
        reject(new Error('user not found'))
      }
    }, 2000)
  })
}