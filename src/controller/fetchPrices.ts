import axios from 'axios'
import cron from 'node-cron'
import { API_KEY, API_URL } from '../config'
import { sendMessage } from '../utils'

const symboList: any[] = ['ETH', 'BTC', 'BNB', 'USDT']

let previousPrices: Record<string, number> = {}

export const fetchPrices = async () => {
    try {
        const response = await axios.get(API_URL, {
            headers: { 'X-CMC_PRO_API_KEY': API_KEY },
            params: { symbol: symboList.join(',') }
        })
        const data = response.data
        let currentPrices: Record<string, number> = {}
        for (const symbol of symboList) {
            const price = data.data[symbol].quote.USD.price
            currentPrices[symbol] = price
            console.log(`${symbol}: $${price}`)
            let message = `\n ${symbol}: \`$${price.toFixed(2)}\``

        }
        // Check for price increase
        if (Object.keys(previousPrices).length !== 0) {
            let increase_value = 0.0001
            for (const symbol of symboList) {
                const previousPrice = previousPrices[symbol]
                const currentPrice = currentPrices[symbol]
                const increase = currentPrice - previousPrice
                const decrease = previousPrice - currentPrice
                if (increase) {
                    console.log(`${symbol} Price Increased by $${increase}, You can Sell Now!`)
                    sendMessage(`⬆️ ${symbol} Price Increased by $${increase}, You can Sell Now!`)
                } else if (!increase) {
                    console.log(`${symbol} Price Dropped by $${increase} You can Buy Now!`)
                    sendMessage(`🔻${symbol}Price Dropped by $${increase    } You can Buy Now!`)
                }
            }
        }
        previousPrices = currentPrices
    } catch (error) {
        console.log(error)
    }
}

cron.schedule('*/50 * * * * *', () => {
    fetchPrices()
    sendMessage(`🕐 50 Seconds`)
});
