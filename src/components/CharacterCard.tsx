import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

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
    <Link href={`/characters/${characterName.toLowerCase().replace(' ', '-')}`}>
      <div className='border relative w-44 h-50 bg-[var(--primary)] flex items-center justify-center rounded-xl py-4'>
        <div className='absolute top-2 left-2 rounded-full size-6'>
          <Image src={`/images/${(elementType).toLowerCase()}.png`} width={24} height={24} alt={elementType} />
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <Image src={`/images/portrait/${characterAvatar}.png`} width={100} height={100} alt={characterAvatar} />
          <p className="flex justify-center font-semibold">{characterName}</p>
        </div>
      </div>
    </Link>
  )
}

export default CharacterCard
