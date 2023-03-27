import { bot } from "../bot"
import { TELEGRAM_DELETE_MESSAGE_INTERVAL, WHITELISTED_USERS } from "../config"


const sendMessage = async (message: string, delete_message?: boolean) => {
    try {
        for (const id of WHITELISTED_USERS) {
            await bot?.telegram?.sendMessage(id, normalizeeMessage(message), {
                parse_mode: "MarkdownV2",
                disable_web_page_preview: true
            }).then(({ message_id }) => {
                if (delete_message) {
                    setTimeout(
                        () => {
                            bot.telegram.deleteMessage(id, message_id),
                                TELEGRAM_DELETE_MESSAGE_INTERVAL!
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

export const normalizeeMessage = (message: string) => {
    return message
        .replaceAll("_", "\\_")
        .replaceAll("|", "\\|")
        .replaceAll(".", "\\.")
        .replaceAll("{", "\\{")
        .replaceAll("}", "\\}")
        .replaceAll("=", "\\=")
        .replaceAll("+", "\\+")
        .replaceAll(">", "\\>")
        .replaceAll("<", "\\<")
        .replaceAll("-", "\\-")
        .replaceAll("!", "\\!")

}
