import { useMemo } from "react"
import UserIcon from "../icons/user.icon"

const UserCard = ({ profile }: { profile?: { first_name: string, last_name: string, profile_image: string } }) => {
    const hasImage = useMemo(() => !profile?.profile_image.includes("null"), [profile?.profile_image])
    return(
        <div className="flex flex-col">
            <div className="border-black border-2 rounded-[50%] overflow-hidden w-20 h-20 flex items-center justify-center">
                {hasImage ? (
                <img
                    src={profile?.profile_image}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-[50%]"
                />
                ) : (
                <UserIcon width="32" height="32" color="#000" />
                )}
            </div>
            <span className="text-md">Selamat datang,</span>
            <h3 className="text-2xl font-bold">{profile?.first_name} {profile?.last_name}</h3>
        </div>
    )
}

export default UserCard