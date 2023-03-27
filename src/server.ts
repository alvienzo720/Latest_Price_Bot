import express from 'express'
import { bot } from './bot'

const app = express()

const startBot = async () => {
    console.log('-------------------------------------------')
    console.log(`starting bot  🤖 `)
    console.log('-------------------------------------------')
    bot.launch().then(() => {

    }).catch((error) => {
        console.log(error)
    })
}
startBot()

app.listen(5000, () => {
    console.log('Server listening on port 5000! We are Good to go 👍')
})
