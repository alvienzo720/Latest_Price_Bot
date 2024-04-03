
import { bot } from "../bot"
import { BotParams } from "../config"
import { normalizeeMessage } from "./normalizeMessage"

const sendMessage = async (message: string, delete_message?: boolean) => {
    try {
        for (const id of BotParams.WHITELISTED_USERS) {
            await bot?.telegram?.sendMessage(id, normalizeeMessage(message), {
                parse_mode: "MarkdownV2",
                disable_web_page_preview: true
            }).then(({ message_id }) => {
                if (delete_message) {
                    setTimeout(
                        () => {
                            bot.telegram.deleteMessage(id, message_id),
                                BotParams.TELEGRAM_DELETE_MESSAGE_INTERVAL!
                        }
                    )
                }
            }).catch((error: any) => {
                console.log("error:", error)
            })
        }
    } catch (error: any) {
        console.log("error:", error)
    }
}

export { sendMessage }
