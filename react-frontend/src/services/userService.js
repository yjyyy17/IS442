import axios from 'axios';

const User_API_BASE_URL = "http://localhost:8080/api/user";

class userService {
    getUsers(){
// fetch(User_API_BASE_URL).then(response => response.json());
        
            return axios.get(User_API_BASE_URL)
    }
    
  
}

export default new userService()