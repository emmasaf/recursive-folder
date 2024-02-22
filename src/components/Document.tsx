import React from 'react'
import { IDocumentProps } from '../entities/inerfaces'

const Document: React.FC<IDocumentProps> = ({ name, onDelete,onClick }) => {
  return (
    <div
      title="file"
      className="min-w-[150px] relative flex items-center p-4 bg-green-100 rounded-lg shadow space-x-2"
      onClick={onClick}
   >
      <svg
        className="w-6 h-6 text-green-500"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M12 4v7c0 .55-.45 1-1 1H4v7a2 2 0 002 2h12a2 2 0 002-2V8l-6-4z"></path>
        <path d="M4 13h7v7H4z"></path>
      </svg>
      <span className="text-green-700 font-medium">{name}</span>
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

export default Document
