
const postUrl = async (url: string) => {
    const options = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
    }
    const response = await fetch('/api/url/short', options);
    const data = await response.json()
    return data
}

const fetchStatsForShortId = async (shortId: string) => {
    const response = await fetch(`/api/stats/${shortId}`)
    const data = await response.json()
    return data
}

export { postUrl, fetchStatsForShortId }