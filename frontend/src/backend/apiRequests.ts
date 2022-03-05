import { UrlInterface } from "../../../models/Url";

// Error handling here?
const postUrl = async (url: string): Promise<UrlInterface>  => {
    const options = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
    }
    const response = await fetch('/api/url/short', options);
    const data = await response.json()
    return data
}

const fetchStatsForShortId = async (shortId: string): Promise<Map<string, number>> => {
    const response = await fetch(`/api/stats/${shortId}`)
    const data = await response.json()
    return data
}

const deleteUrlWithId = async (shortId: string) => {
    const response = await fetch(`/api/url/short/${shortId}`, { method: "DELETE" })
    const data = await response.json()
    return data
}

export { postUrl, fetchStatsForShortId, deleteUrlWithId }