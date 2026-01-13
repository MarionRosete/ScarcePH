import {  GetDashboardSummary } from "@/api";
import {
  useQuery,
} from '@tanstack/react-query'
import { ClockFadingIcon, HandCoinsIcon, HistoryIcon, LandmarkIcon } from "lucide-react";
import { deltaColor, formatPeso, pendingColor } from "@/utils/dashboard";
import { SummaryCard } from "./component/SummaryCard";
import { BestSelling } from "./component/BestSelling";
import { Link } from "react-router";
import { Trend } from "./component/Trend";

function Dashboard() {
    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["dashboard-summary"],
        queryFn: GetDashboardSummary,
        staleTime: 60_000,
        refetchOnWindowFocus: false,
    })

    if (isError) {
        return (
            <div className="m-6 text-sm text-destructive">
            Failed to load dashboard data
            </div>
        )
    }

    const pending = data?.pending_orders
    const outstanding = data?.outstanding_balance.amount
    const outstandingCount = data?.outstanding_balance.count
    const weekly = data?.orders_this_week
    const revenue = data?.revenue_this_month
    

    return (
        <div>
            <div className="m-6 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                <Link  to="/orders?status=pending" className="block">
                    <SummaryCard
                        trendIcon={<></>}
                        title="Pending Orders"
                        icon={<ClockFadingIcon className="w-4 h-4" />}
                        isLoading={isLoading}
                        value={pending}
                        valueClassName={pendingColor(pending)}
                        subtext={pending === 0 ? "All clear" : "Needs attention"}
                    />
                </Link>
                <Link  to="/orders?status=confirmed" className="block">
                    <SummaryCard
                        trendIcon={<></>}
                        title="Outstanding Balance"
                        icon={<HandCoinsIcon className="w-4 h-4"/>}
                        isLoading={isLoading}
                        value={formatPeso(outstanding)}
                        subtext={`Across ${outstandingCount} orders`}
                    />
                </Link>

                <SummaryCard
                    trendIcon={<Trend delta={weekly?.delta}/>}
                    title="Orders This Week"
                    icon={<HistoryIcon className="w-4 h-4" />}
                    isLoading={isLoading}
                    value={weekly?.count}
                    subtext={
                        <span className={deltaColor(weekly?.delta)}>
                            {weekly?.delta > 0 && "+"}{weekly?.delta||"Even"} vs last week
                        </span>
                    }
                />

                <SummaryCard
                    trendIcon={<Trend delta={revenue?.delta}/>}
                    title="Revenue (Month)"
                    icon={<LandmarkIcon className="w-4 h-4" />}
                    isLoading={isLoading}
                    value={formatPeso(revenue?.amount)}
                    subtext={
                    <span className={deltaColor(revenue?.delta)}>
                        {revenue?.delta > 0 ? "Up +":"Down "}{formatPeso(revenue?.delta)} vs last month
                    </span>
                    }
                />
                <BestSelling/>
            </div>
        </div>
    )
}



export default Dashboard;

