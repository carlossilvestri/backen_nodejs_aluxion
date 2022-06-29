import { Router } from "express"
import userRoutes from "../../../../user/infrastructure/routes/userRoutes"
const router = Router()

// Routing
router.use('/auth', userRoutes)



export default router