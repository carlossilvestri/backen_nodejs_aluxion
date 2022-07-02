import { Router } from "express"
import userRoutes from "../../../user/infrastructure/routes/userRoutes"
import imageRoutes from "../../../image/infrastructure/routes/imageRoutes"
import serve from "../swagger/serve"
const router = Router()

// Routing
router.use('/auth', userRoutes)
router.use('/image', imageRoutes)
router.use('/swagger', serve)



export default router