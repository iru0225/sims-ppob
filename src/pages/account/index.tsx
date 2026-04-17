import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { accessTokenSelector, isFetchFailedSelector, messageSelector, userAction, userProfileSelector } from "../../store/slice/userSlice"
import InputComponent from "../../components/input"
import ButtonComponent from "../../components/button"
import ProfileImage from "../../components/profile-image"
import CrossIcon from "../../components/icons/cross.icon"
import { useNotification } from "../../context/notification-context"
import CheckIcon from "../../components/icons/check-mark.icon"

const AccountPage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const token = useAppSelector(accessTokenSelector)
    const profile = useAppSelector(userProfileSelector)
    const message = useAppSelector(messageSelector)
    const isFailed = useAppSelector(isFetchFailedSelector)
    const { showNotification } = useNotification()
    const [formValue, setFormValue] = useState({
        email: '',
        firstName: '',
        lastName: ''
    })
    const [isEditMode, setIsEditMode] = useState(false)

    useEffect(() => {
        if (!token) {
            navigate('/login')
            return
        }

        if (!profile) {
            dispatch(userAction.getProfile())
        } else {
            setFormValue({
                email: profile.email,
                firstName: profile.first_name,
                lastName: profile.last_name
            })
        }
    }, [token, profile])

    useEffect(() => {
        if (message) {
            if (!isFailed) {
                showNotification?.(<div className="flex flex-col items-center gap-4 mx-auto">
                    <div className="rounded-4xl bg-green-500 w-fit p-3">
                        <CheckIcon width="24" height="24" color="white"/>
                    </div>
                    <h5>{message}</h5>
                </div>)
            } else {
                showNotification?.(<div className="flex flex-col items-center gap-4 mx-auto">
                    <div className="rounded-4xl bg-red-600 w-fit p-3">
                        <CrossIcon width="24" height="24" color="white"/>
                    </div>
                    <h5>{message}</h5>
                </div>)
            }

            setTimeout(() => {
                dispatch(userAction.resetMessage())
            }, 3500);
        }
    }, [isFailed, message])

    const handleLogout = () => {
        dispatch(userAction.logout())
    }

    return(
        <section
            className="w-[69%] mx-auto mt-8 flex flex-col gap-12 pb-8"
        >
            <div className="flex flex-col justify-center items-center gap-4 mx-auto">
                {
                    profile && (
                        <ProfileImage
                            profileImage={profile.profile_image}
                            onImageChange={(file) => {
                                const formData = new FormData()
                                formData.append('file', file)
                                dispatch(userAction.updateProfileImage(formData))
                            }}
                        />
                    )
                }
                <span className="text-lg font-semibold">{profile?.first_name} {profile?.last_name}</span>
            </div>
            <InputComponent
                label="Email"
                id="email"
                name="email"
                type="email"
                value={formValue.email}
                onChange={(e) => setFormValue({ ...formValue, email: e.target.value })}
                readonly
            />
            <InputComponent
                id="firstName"
                label="Nama Depan"
                name="firstName"
                value={formValue.firstName}
                onChange={(e) => setFormValue({ ...formValue, firstName: e.target.value })}
                readonly={!isEditMode}
            />
            <InputComponent
                id="lastName"
                label="Nama Belakang"
                name="lastName"
                value={formValue.lastName}
                onChange={(e) => setFormValue({ ...formValue, lastName: e.target.value })}
                readonly={!isEditMode}
            />
            {
                !isEditMode ? (
                    <>
                        <ButtonComponent
                            label="Edit Profile"
                            variant="secondary"
                            onClick={() => setIsEditMode(true)}
                        />
                        <ButtonComponent
                            label="Logout"
                            variant="primary"
                            onClick={handleLogout}
                        />
                    </>
                ) : (
                    <ButtonComponent
                        label="Simpan"
                        variant="primary"
                        onClick={() => dispatch(userAction.updateProfile({ first_name: formValue.firstName, last_name: formValue.lastName }))}
                    />
                )
            }
        </section>
    )
}

export default AccountPage;