import { getUser } from '../services/api';

const getUserByEmail = () => {

    const clicked = async() => {
        const response = await getUser( { email : "bcoderunner@gmail.com"});

        console.log(response);
    }
  return (
    <div>
      <button className='bg-[#ecb403] w-12 ml-40 text-white cursor-pointer hover-bg-black-99' onClick={clicked}>Get user</button>
    </div>
  )
}

export default getUserByEmail
