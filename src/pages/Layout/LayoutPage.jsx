import React, { useState } from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import axios from "axios";
import { promptText } from '../../../utils/PromptText';
import { useMutation } from '@tanstack/react-query';
import apiFunc from '../../api/apiFunc';

const LayoutPage = () => {
  const [sandpackFiles, setSandpackFiles] = useState(null);
  const [dependencies, setDependencies] = useState(null);
  const [appDescription, setAppDescription] = useState(null);

  const generateCodeByAI = useMutation({
    mutationFn: apiFunc.genrateCode
  })


  const userCodeGenerateRequest = (e) => {
    console.log("Sandpack", e)
    fetchApi(e)
  }




  function cleanCodeJson(rawJson) {
    try {
   
      const withoutBackticks = rawJson.replace(/```/g, "");

      const withoutJsonKeyword = withoutBackticks.replace(/json/g, "");
  
      const data = JSON.parse(withoutJsonKeyword.trim());
  
      // console.log("data", data);
      setSandpackFiles(data.
        files);
      setDependencies(data.
        packageJson.
        dependencies
        );
      setAppDescription(data?.explanation)
    } catch (error) {
      console.error("Error parsing or cleaning the JSON data:", error);
      return null;
    }
  }


  const fetchApi = async (data) => {

    try {

      generateCodeByAI.mutate({
        appDescription: "",
        prompt: promptText(data),
      }, {
        onSuccess: (res) => {
          const appStructure = res?.appStructure;
          console.log("appStructure", appStructure)
          cleanCodeJson(appStructure);
        },
        onError: (error) => {
          console.error("Error generating code:", error);
        }
      })

    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };
  console.log("sanppack",sandpackFiles,dependencies,appDescription)
  return (
    <div className="flex h-screen bg-gray-900 text-white">


      <Sidebar userCodeGenerateRequest={userCodeGenerateRequest} generateCodeByAI={generateCodeByAI} appDescription={appDescription} />


      <div className=" flex flex-col w-[70%]">


        {/* Code Editor */}
        <div className="flex-1 bg-gray-800 p-4">
          <div className="flex justify-between items-center border-b border-gray-700 pb-2">
            <h2 className="text-sm text-gray-400">src  components  Auth.tsx</h2>
            <button className="bg-blue-500 px-4 py-1 text-sm rounded-md">
              Deploy
            </button>
          </div>
          <div className="mt-4 h-5/6 bg-gray-900 p-4 rounded-md">
            <pre className="text-sm text-gray-400">
              {sandpackFiles ? (
                <SandpackProvider
                  className="h-full"
                  template="react"
                  options={{
                    classes: {
                      "sp-wrapper": "custom-wrapper",
                      "sp-layout": "custom-layout",
                      "sp-tab-button": "custom-tab",
                    },
                  }}
                  files={{
                    ...sandpackFiles,
                    "/index.css": `/* Custom Bootstrap overrides or additional styles */`,
                  }}
                  customSetup={{
                    dependencies: {
                      ...dependencies

                    },
                  }}
                >
                  <div className='h-[520px]' style={{
                    '--sp-layout-headerHeight': '50px',
                    '--sp-layout-height': '470px'
                    // Increase the header height
                  }}>
                    <SandpackLayout className="h-[500px]">
                      <SandpackCodeEditor className="flex-1 h-full overflow-auto" />
                      <SandpackPreview className="flex-1 h-full overflow-auto" />
                    </SandpackLayout>
                  </div>
                </SandpackProvider>


              ) : (
                <p>No files loaded yet</p>
              )}
            </pre>
          </div>
        </div>

        {/* Terminal */}
        {/* <div className="h-24 bg-gray-900 p-4 border-t border-gray-700 text-sm">
          <p className="text-green-500">~/project</p>
          <p>npm install</p>
          <p className="text-gray-400">- preloadMetadata: timing idealTree:userRequests</p>
        </div> */}
      </div>
    </div>
  )
}

export default LayoutPage
