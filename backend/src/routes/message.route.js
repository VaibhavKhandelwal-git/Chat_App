import express from "express"

const router = express.Router()

router.use(authMiddleware)

router.get("/contacts",getAllContacts)
router.get("/chats",getAllChats)
router.route("/:id").get(getMessagesByUserId).post(sendMessage)


export default router