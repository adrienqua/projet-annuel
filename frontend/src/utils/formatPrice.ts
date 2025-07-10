export const formatPrice = (price: number | string): string => {
    const priceNumber = typeof price === 'string' ? parseFloat(price) : price
    return priceNumber.toFixed(2).replace('.', ',') + ' €'
}