import { useRef } from "react";
import UserIcon from "../icons/user.icon";
import { useNotification } from "../../context/notification-context";
import PenIcon from "../icons/pen.icon";

const MAX_FILE_SIZE_BYTES = 100 * 1024; // 100 KB

interface ProfileImageProps {
  profileImage: string;
  onImageChange: (file: File) => void;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ profileImage, onImageChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { showNotification } = useNotification();

  const hasImage = !profileImage.includes("null");

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE_BYTES) {
      showNotification?.("Ukuran gambar tidak boleh lebih dari 100 KB.");
      e.target.value = "";
      return;
    }

    onImageChange(file);
    e.target.value = "";
  };

  return (
    <div
      className="relative cursor-pointer group w-fit"
      onClick={handleClick}
      role="button"
      aria-label="Upload profile image"
    >
      <div className="border-black border-2 rounded-[50%] overflow-hidden w-20 h-20 flex items-center justify-center">
        {hasImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full object-cover rounded-[50%]"
          />
        ) : (
          <UserIcon width="32" height="32" color="#000" />
        )}
      </div>
      <div className="border-black border p-1 rounded-4xl absolute bottom-px right-0 bg-white">
        <PenIcon width="14" height="14" color="#000" />
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ProfileImage;
