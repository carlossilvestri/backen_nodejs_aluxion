import { Router } from "express"
import userRoutes from "../../../user/infrastructure/routes/userRoutes"
import imageRoutes from "../../../image/infrastructure/routes/imageRoutes"
const router = Router()

// Routing
router.use('/auth', userRoutes)
router.use('/image', imageRoutes)



export default router