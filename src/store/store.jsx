import { create } from 'zustand'
import axios from 'axios'




const userStore = (set) => ({
  user:null,
  userLogin: () => {
    axios.get('https://dhz-image.onrender.com/users/userinfo', {withCredentials:true })
     .then(res => set(state=>({user:res.data.user})) ).catch(err => console.log(err))
    }
})


const useUserStore = create(userStore)

export default useUserStore