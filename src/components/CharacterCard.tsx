import React from 'react'

interface CharacterCardProps {
  elementType: string,
  characterAvatar: string,
  characterName: string
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  elementType,
  characterAvatar,
  characterName }) => {
  return (
    <div className='size-24'>
      <div>
        <div className='rounded-full size-8'>
          <img src={`/images/${elementType}`} alt={elementType} />
        </div>
      </div>
      <div className="flex flex-col">
        <img src={`/images/${characterAvatar}`} alt={characterAvatar} />
        <p>{characterName}</p>
      </div>
    </div>
  )
}

export default CharacterCard
