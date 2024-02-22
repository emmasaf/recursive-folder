import React from 'react';
import { IFileFolder } from '../entities/inerfaces';

const FileFolderCreator: React.FC<IFileFolder> = ({name,setName,handleCreateFile,handleCreateFolder}:IFileFolder) => {


  return (
    <div className="flex flex-col space-y-4 items-center p-4 bg-gray-50 rounded-lg shadow">
      <input
        type="text"
        value={name}
        onChange={(e) => {
          let value:string = e.target.value
          setName(value)
        }}
        className="form-input mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-base shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Enter name"
      />
      <div className="flex space-x-2">
        <button
          onClick={handleCreateFolder}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
        >
          Create Folder
        </button>
        <button
          onClick={handleCreateFile}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
        >
          Create File
        </button>
      </div>
    </div>
  );
};

export default FileFolderCreator;
