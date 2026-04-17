import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { accessTokenSelector, userAction, userProfileSelector } from "../../store/slice/userSlice"
import { Link, useNavigate } from "react-router"
import { balanceAction, balanceSelector } from "../../store/slice/balanceSlice"
import { serviceAction, serviceSelector } from "../../store/slice/serviceSlice"
import { bannerAction, bannerSelector } from "../../store/slice/bannerSlice"
import BalanceComponent from "../../components/balance"
import UserCard from "../../components/user-card"

const HomePage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const token = useAppSelector(accessTokenSelector)
    const profile = useAppSelector(userProfileSelector)
    const balance = useAppSelector(balanceSelector)
    const services = useAppSelector(serviceSelector)
    const banners = useAppSelector(bannerSelector)


    useEffect(() => {
        if (!token) {
            navigate('/login')
        } else {
            if (!profile) {
                dispatch(userAction.getProfile())
            }

            if (!balance) {
                dispatch(balanceAction.getBalance())
            }

            if (!services.length) {
                dispatch(serviceAction.getServices())
            }

            if (!banners.length) {
                dispatch(bannerAction.getBanner())
            }
        }
    }, [token])

    return (
        <section
            className="w-[69%] mx-auto mt-8 flex flex-col gap-12"
        >
            <div className="grid grid-cols-2 gap-4">
                <UserCard profile={profile} />
                <BalanceComponent balance={balance} />
            </div>
            <div className="flex gap-4 justify-between">
                {services.map((service) => (
                    <Link key={service.service_code} to={`/payments/${service.service_code}`} className="flex flex-col items-center max-w-12.5 max-h-12.5 cursor-pointer">
                        <img src={service.service_icon} alt={service.service_name}/>
                        <h4 className="text-xs font-bold">{service.service_name.includes('TV') ? service.service_name : service.service_name.replace(' Berlangganan', '')}</h4>
                    </Link>
                ))}
            </div>
            <div className="flex flex-col gap-2 mt-8">
                <h4 className="text-xs font-bold">Temukan promo menarik</h4>
                <div className="flex gap-4 max-w-full overflow-x-auto overflow-hidden">
                    {banners.map((banner) => (
                        <img src={banner.banner_image} alt={banner.banner_name} className="w-75"/>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HomePage