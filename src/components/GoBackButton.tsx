import React from 'react';
import { iGoBackButton } from '../entities/inerfaces';

const GoBackButton: React.FC<iGoBackButton> = ({onClick}: iGoBackButton) => {

  return (
    <button
      onClick={onClick}
      className="px-4 my-3 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300"
    >
      Go Back
    </button>
  );
};

export default GoBackButton;
