import { BOTKEY } from "../config/config";
import telegraf, { Telegraf } from 'telegraf'
import { fetchPrices } from "../controller";
const bot = new Telegraf(BOTKEY)


bot.start((ctx) => {
    ctx.reply(`Welcome ${ctx.message.from.first_name} lets Get The latest Prices of \n BTC ETH USDC BNB. 😊 `)
})

bot.action('getprices',async (ctx) => {
    try {
        fetchPrices()
        
    } catch (error) {
        console.log(error)
        
    }
})



export {bot}
