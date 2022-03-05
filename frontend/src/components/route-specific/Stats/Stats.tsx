import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchStatsForShortId } from "../../../backend/apiRequests"

type StatsPageParams = {
    shortId: string
}

interface StatObject {
    [key: string]: number
}


/**
 * 
 * @returns 
 */
const Stats: React.FC = () => {
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

    const handleDelete = (shortId: string) => {
        console.log("Delete")
    }

    if (!params.shortId) {
        return <div>Could not resolve short id from URL.</div>
    }

    return (
        <div className="stats-page">
            <h1>Statistics page</h1>
            <button className="delete-button" onClick={() => handleDelete(params.shortId!)}>Delete this short url</button>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Clicks</th>
                    </tr>
                </thead>
                <tbody>
                    {stats?.map((item) => {
                        return Object.entries(item).map(([key, value]) => {
                            return (
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td>{value}</td>
                                </tr>
                            )
                        })
                    })}
                </tbody>
            </table>
        </div>
    )
}

export { Stats }
