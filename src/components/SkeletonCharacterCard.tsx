import React from "react";
import "@/css/SkeletonCharacterCard.css"; // Import CSS

const SkeletonCharacterCard = () => {
  return (
    <div className="skeleton-character-card">
      {/* Element Type Icon */}
      <div className="skeleton-element-icon"></div>

      {/* Character Image & Name */}
      <div className="skeleton-character-content">
        <div className="skeleton-character-image"></div>
        <div className="skeleton-character-name"></div>
      </div>
    </div>
  );
};

export default SkeletonCharacterCard;
