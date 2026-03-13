import { useState } from "react";

export interface UserProfileProps {
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  onEditProfile: () => void;
}

export const UserProfile = ({
  name,
  email,
  role,
  avatarUrl,
  onEditProfile,
}: UserProfileProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      className="user-profile p-4 border rounded-lg shadow-sm"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center gap-4">
        {avatarUrl && (
          <img src={avatarUrl} alt={name} className="w-12 h-12 rounded-full" />
        )}
        <div>
          <h2 className="text-xl font-bold">{name}</h2>
          <p className="text-gray-600">{email}</p>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {role}
          </span>
        </div>
      </div>

      {isHovered && (
        <button
          onClick={onEditProfile}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Editar Perfil
        </button>
      )}
    </div>
  );
};
