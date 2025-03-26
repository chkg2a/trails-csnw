import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLoadingStore } from '@/store/useLoadingStore'
import "@/css/CharacterCard.css"

interface CharacterCardProps {
  elementType?: string,
  characterAvatar?: string,
  characterName?: string,
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  elementType,
  characterAvatar,
  characterName,
}) => {

  const { isLoading } = useLoadingStore();
  return (
    <Link href={`/characters/${characterName?.toLowerCase().replace(' ', '-')}`}>
      <div className='character-card'>
        {/* Element Type Icon */}
        <div className='element-icon'>
          {!isLoading && elementType && (
            <Image src={`/images/${elementType.toLowerCase()}.png`} width={24} height={24} alt={elementType} />
          )}
        </div>

        {/* Character Image & Name */}
        <div className="character-content">
          <Image src={`/images/portrait/${characterAvatar}.png`} width={100} height={100} alt={characterAvatar} />
          <p className="character-name">{characterName}</p>
        </div>
      </div>
    </Link>
  )
}

export default CharacterCard
