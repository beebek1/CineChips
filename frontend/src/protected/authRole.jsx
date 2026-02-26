import { jwtDecode } from 'jwt-decode';

const getToken = () => localStorage.getItem('jwtToken');

const isExpired = (token) => {
    const decoded = jwtDecode(token);

    if(!decoded.exp) return true
    if(decoded.exp*1000 > Date.now()) return true

    return false
};

const getUserRole = () => {
    const token = getToken();

    if(!token || !isExpired){
        localStorage.removeItem('jwtToken')
        return null;
    }
    try{
        const decoded = jwtDecode(token);
        return decoded.role;
    }catch(e){
        localStorage.removeItem('jwtToken');
        console.log(e);
        return null
    }

}

export default getUserRole;