
export const getUTCDateWithoutTime = (): string => {
    const today = new Date()
    // Are you kidding me getUTCMonth...
    return `${today.getUTCFullYear()}-${today.getUTCMonth() + 1}-${today.getUTCDate()}`
}