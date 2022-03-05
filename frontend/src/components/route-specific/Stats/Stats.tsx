import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchStatsForShortId } from "../../../backend/apiRequests"

type StatsPageParams = {
    shortId: string
}

interface StatObject {
    [key: string]: number
}

const  Stats: React.FC = () => {
    const params = useParams<StatsPageParams>()
    const [stats, setStats] = useState<StatObject[] | null>(null)
    useEffect(() => {
        async function fetchStatsData() {
            if (params.shortId) {
                let response: Map<string, number> = await fetchStatsForShortId(params.shortId)
                const mappedKeyValuePairs = Object.entries(response).map(([key, val]) => ({ [key]: val }))
                setStats(mappedKeyValuePairs)
            }
        }
        fetchStatsData()
    }, [params.shortId])
    return (
        <div>Hello</div>
    )
}

export { Stats }
