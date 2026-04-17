import { useCallback, useEffect, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { accessTokenSelector, userAction, userProfileSelector } from "../../store/slice/userSlice"
import { useNavigate, useParams } from "react-router"
import { balanceAction, balanceSelector } from "../../store/slice/balanceSlice"
import InputComponent from "../../components/input"
import ButtonComponent from "../../components/button"
import { post } from "../../utils/client-action"
import { useNotification } from "../../context/notification-context"
import CheckIcon from "../../components/icons/check-mark.icon"
import CrossIcon from "../../components/icons/cross.icon"
import BalanceComponent from "../../components/balance"
import UserCard from "../../components/user-card"
import { serviceAction, serviceSelector } from "../../store/slice/serviceSlice"
import { formatCurrency } from "../../utils"
import Notification from "../../components/notification"

const PaymentPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { showNotification } = useNotification()
    const token = useAppSelector(accessTokenSelector)
    const profile = useAppSelector(userProfileSelector)
    const balance = useAppSelector(balanceSelector)
    const services = useAppSelector(serviceSelector)

    const [showPopup, setShowPopup] = useState(false)

    console.log(showPopup);
    

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
        }
    }, [token])

    
    const currentService = useMemo(() => {
        return services.find(data => data.service_code === id)
    }, [services, id])

    // eslint-disable-next-line react-hooks/preserve-manual-memoization
    const handlePayment = useCallback(async () => {
        try {
            const response = await post('/transaction', {
                service_code: currentService?.service_code
            }, token)
            dispatch(balanceAction.getBalance())
            showNotification?.(<div className="flex flex-col items-center gap-4 mx-auto">
                <div className="rounded-4xl bg-green-500 w-fit p-3">
                <CheckIcon width="24" height="24" color="white"/>
                </div>
                <h5>{response.message}</h5>
                <button className="text-sm text-red-700" onClick={() => navigate('/')}>Kembali ke Beranda</button>
            </div>, true)
        } catch (error) {
            const errorData = error as {
                status: number
                message: string
                data: null
            }
            showNotification?.(<div className="flex flex-col items-center gap-4 mx-auto">
                <div className="rounded-4xl bg-red-600 w-fit p-3">
                <CrossIcon width="24" height="24" color="white"/>
                </div>
                <h5>{errorData.message}</h5>
                <button className="text-sm text-red-700" onClick={() => navigate('/')}>Kembali ke Beranda</button>
            </div>, true)
        }
    }, [currentService?.service_code, token, dispatch, showNotification])
    return (
        <>
            {
                showPopup && currentService && (
                    <Notification
                        onClose={(data) => setShowPopup(!data)}
                    >
                        <div className="flex flex-col items-center gap-4 mx-auto w-50">
                            <img src='/images/Logo.png' alt='Logo image' className="w-8 h-8"/>
                            <h5 className="tex-md font-bold text-gray-700 text-center">{`Beli ${currentService.service_name} senilai`}</h5>
                            <h2 className="text-2xl font-bold">{formatCurrency(currentService.service_tariff)} ?</h2>
                            <div className="flex flex-col gap-2">
                                <button className="text-sm text-red-700" onClick={handlePayment}>Ya, lanjutkan</button>
                                <button className="text-sm text-gray-600" onClick={() => setShowPopup(false)}>Batalkan</button>
                            </div>
                        </div>
                    </Notification>
                )
            }
            <section
                className="w-[69%] mx-auto mt-8 flex flex-col gap-12"
            >
                <div className="grid grid-cols-2 gap-4">
                    <UserCard profile={profile} />
                    <BalanceComponent balance={balance} />
                </div>
                <div className="flex flex-col gap-4">
                    <span className="text-md">Pembayaran</span>
                    {
                        currentService && (
                            <div className="flex gap-4 items-center">
                                <img src={currentService.service_icon} alt={currentService.service_name} className="w-12"/>
                                <h3 className="text-2xl font-bold">{currentService.service_name}</h3>
                            </div>
                        )
                    }
                </div>
                <div className="flex-1 flex flex-col gap-4">
                    <InputComponent
                        id="topup"
                        name="topup"
                        placeholder="Masukan nominal top up"
                        value={currentService?.service_tariff?.toString()}
                        readonly
                    />
                    <ButtonComponent
                        label="Bayar"
                        disabled={!currentService || currentService.service_tariff > balance}
                        onClick={() => setShowPopup(true)}
                    />
                </div>
            </section>
        </>
    )
}

export default PaymentPage