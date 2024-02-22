import React from 'react'
import { IFolderProps } from '../entities/inerfaces'

const Folder: React.FC<IFolderProps> = ({ name, onClick, onDelete }) => {
  return (
    <div
      onClick={onClick}
      title="folder"
      className="min-w-[150px] relative flex items-center p-4 bg-blue-100 rounded-lg shadow space-x-2"
    >
      <svg
        className=" w-6 h-6 text-blue-500"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M3 7v13a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H9l-2-2H5a2 2 0 00-2 2z"></path>
      </svg>
      <span className="text-blue-700 font-medium">{name}</span>
      <button
        onClick={onDelete}
        className="absolute top-0 right-0 mt-2 mr-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-700 focus:outline-none"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  )
}

export default Folder
