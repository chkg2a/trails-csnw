import React from 'react';

interface TitleTextBoxProps {
  title: string;
  description: string;
}

const TitleTextBox: React.FC<TitleTextBoxProps> = ({ 
  title, 
  description 
}) => {
  return (
    <div className="w-full h-44 flex flex-col justify-center items-center">
      <div className='text-center'>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-lg">{description}</p>
      </div>
    </div>
  );
}

export default TitleTextBox;
