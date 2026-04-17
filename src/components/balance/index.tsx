import { useState } from "react"
import EyeIcon from "../icons/eye.icon"
import { formatCurrency } from '../../utils'

const BalanceComponent = ({
    balance
}: { balance: number }) => {
    const [showBalance, setShowBalance] = useState(false)
    return(
        <div className="w-full p-4 bg-[#d32217] rounded-md flex flex-col gap-5">
            <h3 className="text-white text-sm">Saldo anda</h3>
            <h2 className="text-white text-2xl font-bold">{showBalance ? formatCurrency(balance) : 'Rp ******'}</h2>
            <span className="text-white text-xs flex gap-2">
                Lihat saldo
                <button className="bg-transparent" onClick={() => setShowBalance((prev) => !prev)}>
                    <EyeIcon color="white" width="16" height="16"/>
                </button>
            </span>
        </div>
    )
}

export default BalanceComponent