import React, { useEffect, useState } from "react";
import { OrbitProgress } from "react-loading-indicators";

const Sidebar = ({ userCodeGenerateRequest, generateCodeByAI, appDescription }) => {
  const [inputValue, setInputValue] = useState("");
  const [inputData, setInputData] = useState([]);

  const OnSubmitData = () => {
    console.log("input", inputValue.trim());
    userCodeGenerateRequest(inputValue.trim());
    setInputValue("");
  };

  useEffect(() => {
    setInputData([...inputData, appDescription]);
  }, [appDescription]);

  console.log("sett", inputData);

  return (
    <div className="flex h-screen flex-col bg-gray-900 text-white w-[30%] ">
      {/* Sidebar Content */}
      <aside className="w-full bg-gray-900 p-6 flex-grow">
        <div className="bg-gray-700 p-4 rounded-md">
          <h1 className="text-2xl font-bold text-center text-blue-400 mb-4">AI Tool Builder</h1>
        </div>
        <div className="mb-6 relative">
          {/* {generateCodeByAI?.status === "pending" ? (
            <span className="h-8">
              <OrbitProgress color="#32cd32" size="small" text="" textColor="" />
            </span>
          ) : (
            <>
              {inputData?.map((ele, index) => (
                <p key={index} className="mt-2 text-sm text-gray-400">{ele}</p>
              ))}
            </>
          )} */}
          <div className="w-auto py-2 mt-2 h-[400px] overflow-y-auto">
            {inputData?.map((ele, index) => (
              <p key={index} className="mt-2 text-sm text-gray-400 bg-gray-700 p-2">
                {ele}
              </p>
            ))}
          </div>

          {generateCodeByAI?.status === "pending" && (
            <div className="absolute top-1 right-0 flex justify-between gap-72 "
              role="status ">
              <span className="text-white flex justify-between">Loading...</span>
              <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>

            </div>

          )}
        </div>
      </aside>

      {/* Input at the Bottom */}
      <div className="p-4 mb-4 flex w-full relative">
        <div className="bg-gray-800 relative w-full max-w-md rounded-lg p-4 shadow-lg flex-col">
          <input
            type="text"
            value={inputValue}
            placeholder="How can AI help you today?"
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 bg-gray-700 text-white w-full text-sm p-2 h-20 rounded-md outline-none placeholder-gray-400"
          />
          <button onClick={OnSubmitData} className="bg-blue-500 absolute top-9 right-5 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
