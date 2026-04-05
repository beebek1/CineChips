import {jwtDecode} from 'jwt-decode';
import { getUser } from '../services/api';

const getToken = () => localStorage.getItem('jwtToken');

const isExpired = (token) => {
    const decoded = jwtDecode(token);

    if(!decoded.exp) return true
    if(decoded.exp*1000 < Date.now()) return true
    return false
};

const getUserRole = async() => {
    const token = getToken();

    if(!token || !isExpired){
        localStorage.removeItem('jwtToken')
        return null;
    }
    try{
        const decoded = jwtDecode(token);
        const response = await getUser(decoded.id);
        return role = response?.data?.role;

    }catch(e){
        localStorage.removeItem('jwtToken');
        console.log(e);
        return null
    }
}

export default getUserRole;