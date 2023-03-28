import axios from 'axios'
import cron from 'node-cron'
import { API_KEY, API_URL } from '../config'
import { sendMessage } from '../utils'

const symboList = ['ETH', 'BTC', 'BNB', 'USDT']
export const fetchPrices = async () => {
    try {
        const response = await axios.get(API_URL, {
            headers: { 'X-CMC_PRO_API_KEY': API_KEY },
            params: { symbol: symboList.join(',') }

        })
        const data = response.data
        for (const symbol of symboList) {
            // console.log(data.data[symbol])
            const price = data.data[symbol].quote.USD.price
            console.log(`${symbol}: $${price}`)
            let message = `\n ${symbol}: \`$${price.toFixed(2)}\``
            sendMessage(message)
        }
    } catch (error) {
        console.log(error)
    }
}
cron.schedule('*/20 * * * * *', () => {
    fetchPrices()
    sendMessage(`🕐 20 Seconds`)
});
fetchPrices()
