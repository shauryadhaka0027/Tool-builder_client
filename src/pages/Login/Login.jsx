import React, { useEffect, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useMutation } from '@tanstack/react-query';
import apiFunc from '../../api/apiFunc';
import { useNavigate } from 'react-router-dom';

const Login = ({ showModal, setShowModal }) => {
  const [credential, setCredential] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const [expirationTime, setExpirationTime] = useState(null);
  const navigate=useNavigate()
  const auth = useMutation({
    mutationFn: apiFunc.auth,
  });

  useEffect(() => {
    if (credential) {
      try {
        const decoded = jwtDecode(credential);
        setDecodedToken(decoded);
        console.log('Decoded Token:', decoded);

        auth.mutate(
          { name: decoded.name, email: decoded.email, picture: decoded.picture },
          {
            onSuccess: (res) => {
              console.log('Login successful!');
              localStorage.setItem('auth', JSON.stringify(res?.data));
              navigate("/")

            },
            onError: (error) => {
              console.error('Error logging in:', error);
            },
          }
        );

    
        const expirationDate = new Date(decoded.exp * 1000); 
        setExpirationTime(expirationDate);

       
        const currentTime = new Date().getTime() / 1000; 
        const timeLeft = decoded.exp - currentTime;
        console.log(`Time left: ${timeLeft} seconds`);

        if (timeLeft > 0) {
          console.log('Token is valid.');
        } else {
          console.log('Token has expired.');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, [credential]);

  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center ${showModal ? 'block' : 'hidden'}`}
    >
      <div className="bg-gray-800  p-6 rounded-lg shadow-lg w-96 relative">
        <button
          className="absolute right-2 top-0  "
          onClick={() => setShowModal(false)}
        >
          X
        </button>
        <h1 className="text-xl font-bold mb-4 text-center">Login with Google</h1>

        <div className='flex justify-center items-center'>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log('Raw Credential JWT:', credentialResponse.credential);
            setCredential(credentialResponse.credential);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      
        </div>
      </div>
    </div>
  );
};

export default Login;
