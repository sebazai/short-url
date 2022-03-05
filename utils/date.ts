
export const getUTCDateWithoutTime = (): string => {
    const today = new Date()
    // Are you kidding me getUTCMonth...
    return `${today.getUTCFullYear()}-${("0" + (today.getUTCMonth() + 1)).slice(-2)}-${("0" + today.getUTCDate()).slice(-2)}`
}