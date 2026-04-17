import UserIcon from "../icons/user.icon"

const UserCard = ({ profile }: { profile?: { first_name: string, last_name: string } }) => {
    return(
        <div className="flex flex-col">
            <div className="border-black border-2 p-4 rounded-4xl w-fit">
                <UserIcon width="24" height="24" color="#000"/>
            </div>
            <span className="text-md">Selamat datang,</span>
            <h3 className="text-2xl font-bold">{profile?.first_name} {profile?.last_name}</h3>
        </div>
    )
}

export default UserCard