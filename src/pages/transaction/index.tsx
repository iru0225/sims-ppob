import { useEffect, useMemo } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { accessTokenSelector, userAction, userProfileSelector } from "../../store/slice/userSlice"
import { useNavigate } from "react-router"
import { balanceAction, balanceSelector } from "../../store/slice/balanceSlice"
import BalanceComponent from "../../components/balance"
import UserCard from "../../components/user-card"
import { transactionActions, transactionsSelector } from "../../store/slice/transactionSlice"
import { dateFormat, formatCurrency } from "../../utils"
import clsx from "clsx"

const TransactionPage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const token = useAppSelector(accessTokenSelector)
    const profile = useAppSelector(userProfileSelector)
    const balance = useAppSelector(balanceSelector)
    const transactions = useAppSelector(transactionsSelector)

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

            if (!transactions.length) {
                dispatch(transactionActions.getTransactionHistory(0))
            }
        }
    }, [token])

    const showMore = useMemo(() => {
        return !(transactions.length % 5)
    }, [transactions.length])

    return (
        <section
            className="w-[69%] mx-auto mt-8 flex flex-col gap-12 pb-8"
        >
            <div className="grid grid-cols-2 gap-4">
                <UserCard profile={profile} />
                <BalanceComponent balance={balance} />
            </div>
            <div className="flex flex-col gap-4">
                <span className="text-md">Semua Transaksi</span>    
                {
                    transactions.map(data => (
                        <div key={data.invoice_number} className="border border-gray-500 bg-white flex flex-col gap-2 rounded-md px-4 py-2">
                            <div className="flex justify-between">
                                <span
                                    className={
                                        clsx(
                                            'text-md font-bold',
                                            data.transaction_type === 'PAYMENT' ? 'text-red-700' : 'text-green-700'
                                        )
                                    }
                                >
                                    {data.transaction_type === 'PAYMENT' ? '- ' : '+ '}
                                    {formatCurrency(data.total_amount)}
                                </span>
                                <span>
                                    {data.transaction_type === 'PAYMENT' ? 'Pembayaran ' : ''}
                                    {data.transaction_type === 'TOPUP' ? data.description.replace('Balance', 'Saldo') : data.description}
                                </span>
                            </div>
                            {
                                data.created_on && (
                                    <span className="text-sm text-gray-600">
                                        {dateFormat(data.created_on)}
                                    </span>
                                )
                            }
                        </div>
                    ))
                }
                {
                    showMore && (
                        <button className="text-md text-red-700" onClick={() => dispatch(transactionActions.getTransactionHistory(transactions.length))}>Show more</button>
                    )
                }
            </div>
            
        </section>
    )
}

export default TransactionPage