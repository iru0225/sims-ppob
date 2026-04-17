import { useCallback, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { accessTokenSelector, userAction, userProfileSelector } from "../../store/slice/userSlice"
import { useNavigate } from "react-router"
import { balanceAction, balanceSelector } from "../../store/slice/balanceSlice"
import InputComponent from "../../components/input"
import ButtonComponent from "../../components/button"
import { post } from "../../utils/client-action"
import { useNotification } from "../../context/notification-context"
import CheckIcon from "../../components/icons/check-mark.icon"
import CrossIcon from "../../components/icons/cross.icon"
import BalanceComponent from "../../components/balance"
import UserCard from "../../components/user-card"

const TopupPage = () => {
    const buttonClass = 'cursor-pointer px-4 py-2 bg-white rounded-md border border-gray-500'
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { showNotification } = useNotification()
    const token = useAppSelector(accessTokenSelector)
    const profile = useAppSelector(userProfileSelector)
    const balance = useAppSelector(balanceSelector)

    const [topupAmount, setTopupAmount] = useState('')

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
        }
    }, [token])

    const handleTopupChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const regex = /^[0-9\b]+$/
        if (event.currentTarget.value === '' || regex.test(event.currentTarget.value)) {
            setTopupAmount(event.currentTarget.value)
        }
    }, [])

    const handleTopupSubmit = useCallback(async () => {
        try {
            const response =await post('/topup', {
                top_up_amount: Number(topupAmount)
            }, token)
            dispatch(balanceAction.setBallance(response.data.balance))
            showNotification?.(<div className="flex flex-col items-center gap-4 mx-auto">
                <div className="rounded-4xl bg-green-500 w-fit p-3">
                <CheckIcon width="24" height="24" color="white"/>
                </div>
                <h5>{response.message}</h5>
            </div>)
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
            </div>)
        }
    }, [topupAmount])

    return (
        <section
            className="w-[69%] mx-auto mt-8 flex flex-col gap-12"
        >
            <div className="grid grid-cols-2 gap-4">
                <UserCard profile={profile} />
                <BalanceComponent balance={balance} />
            </div>
            <div className="flex flex-col gap-4">
                <span className="text-md">Silahkan masukan</span>
                <h3 className="text-2xl font-bold">Nominal Top Up</h3>
            </div>
            <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-4">
                    <InputComponent
                        id="topup"
                        name="topup"
                        placeholder="Masukan nominal top up"
                        value={topupAmount}
                        onChange={handleTopupChange}
                    />
                    <ButtonComponent
                        label="Top Up"
                        disabled={!topupAmount}
                        onClick={handleTopupSubmit}
                    />
                </div>
                <div className="grid grid-cols-3 gap-1">
                    <button className={buttonClass} onClick={() => setTopupAmount('10000')}>Rp. 10.000</button>
                    <button className={buttonClass} onClick={() => setTopupAmount('20000')}>Rp. 20.000</button>
                    <button className={buttonClass} onClick={() => setTopupAmount('50000')}>Rp. 50.000</button>
                    <button className={buttonClass} onClick={() => setTopupAmount('100000')}>Rp. 100.000</button>
                    <button className={buttonClass} onClick={() => setTopupAmount('250000')}>Rp. 250.000</button>
                    <button className={buttonClass} onClick={() => setTopupAmount('500000')}>Rp. 500.000</button>
                </div>
            </div>
        </section>
    )
}

export default TopupPage