require('dotenv').config();
let getHomePage = (req, res) => {
    return res.render('homepage.ejs')
}
let postWebHook = (req, res) => {
    let body = req.body;

    if (body.object === "page") {
        // Lặp qua tất cả các entry
        body.entry.forEach((entry) => {
            // Lấy tin nhắn từ webhook event
            let webhookEvent = entry.messaging[0];
            console.log("Webhook Event: ", webhookEvent);

            // Ví dụ: Lấy ID người gửi và nội dung tin nhắn
            let senderId = webhookEvent.sender.id;
            if (webhookEvent.message) {
                let messageText = webhookEvent.message.text;
                console.log(`Received message: "${messageText}" from sender: ${senderId}`);
            }
        });

        // Phản hồi 200 OK để xác nhận webhook
        return res.status(200).send("EVENT_RECEIVED");
    } else {
        // Nếu không phải từ đối tượng 'page'
        return res.status(404).send("Not Found");
    }
}
let getWebHook = (req, res) => {
    const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

    // Lấy các tham số từ yêu cầu GET
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    // Kiểm tra chế độ và token
    if (mode && token) {
        if (mode === "subscribe" && token === VERIFY_TOKEN) {
            console.log("WEBHOOK_VERIFIED");
            return res.status(200).send(challenge);
        } else {
            return res.status(403).send("Forbidden");
        }
    }
}
module.exports = {
    getHomePage: getHomePage,
    getWebHook: getWebHook,
    postWebHook: postWebHook,
} 