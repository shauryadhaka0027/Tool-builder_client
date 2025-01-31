import React, { useState } from 'react';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../Zustand/useZustand';
import Login from '../Login/Login';

const Homepage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { text, setText } = useStore();
  const [showLoginModal, setShowLoginModal] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  const generatePrompt = () => {
    if (text) {
      const auth = JSON.parse(localStorage.getItem('auth'));
      if (!auth) {
        setShowLoginModal(true); // Show login modal if not logged in
      } else {
        navigate('/home');
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      {/* Header */}
      <header className="w-full p-4 text-center text-gray-400 border-b border-gray-800">
        <span className="bg-gray-800 px-2 py-1 rounded-full text-sm">AI Tool Builder</span>
      </header>

      <div className="gradient-01 z-0 absolute"></div>
      <div className="gradient-02 z-0 absolute"></div>
      
      <main className="flex flex-col items-center text-center mt-40 px-4">
        <h1 className="text-5xl font-bold mb-4">What do you want to build?</h1>
        <p className="text-lg text-gray-400 mb-8">
          Prompt, run, edit, and deploy full-stack web apps.
        </p>

        {/* Show login modal if needed */}
        {showLoginModal && <Login showModal={showLoginModal} setShowModal={setShowLoginModal} />}

        <div className="bg-gray-800 rounded-lg p-4 w-full max-w-xl flex items-start mb-8">
          <textarea
            className="bg-transparent h-28 text-gray-300 w-full outline-none resize-none"
            placeholder="How can Bolt help you today?"
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <div className="flex space-x-4 text-gray-400 relative top-0">
            <button
              onClick={generatePrompt}
              className="hover:text-gray-300 px-6 border-2 w-10 text-2xl rounded-md bg-[#3f86c9] text-[white]"
            >
              <IoIosArrowRoundForward />
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-gray-400">or start a blank app with your favorite stack</p>
        <div className="flex space-x-4 mt-4">
          {/* Icons */}
          <div className="bg-gray-800 w-10 h-10 flex items-center justify-center rounded-full">A</div>
          <div className="bg-gray-800 w-10 h-10 flex items-center justify-center rounded-full">⚡</div>
          <div className="bg-gray-800 w-10 h-10 flex items-center justify-center rounded-full">N</div>
          <div className="bg-gray-800 w-10 h-10 flex items-center justify-center rounded-full">Ⓜ</div>
          <div className="bg-gray-800 w-10 h-10 flex items-center justify-center rounded-full">Ⓥ</div>
        </div>
      </main>
    </div>
  );
};

export default Homepage;
