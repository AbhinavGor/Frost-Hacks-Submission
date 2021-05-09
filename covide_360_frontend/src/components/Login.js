
import React from 'react';
import { GoogleLogin } from 'react-google-login'

const clientID= '795034839651-mtpdd4f1lk2e6tdaj736o4rbn2r6cl8a.apps.googleusercontent.com';

function Login(props) {

    function setLoginInfo(val1,val2,val3){
        props.setLoginInfo(val1,val2,val3)
    }

    const onSuccess = (res) =>{
        console.log(res)
        setLoginInfo(true,res.profileObj.name,res.profileObj.imageUrl)
    }
    const onFailure = (res) =>{
        console.log(res)
    }
    return(
        <div>
           <GoogleLogin
           clientId={clientID}
           render={renderProps => (
            <button class="inline-flex text-black bg-white border-0 py-0.5 px-2 mx-2 focus:outline-none hover:bg-indigo-600 rounded text-lg" 
            onClick={renderProps.onClick} disabled={renderProps.disabled}>Login</button>
          )}
           buttonText="Login With Google"
           onSuccess={onSuccess}
           onFailure={onFailure}
           cookiePolicy={'single_host_origin'}
           isSignedIn={false}
           theme='dark'
           scope='https://www.googleapis.com/auth/calendar'
           />
        </div>
    )
}

export default Login