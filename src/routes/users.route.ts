import { Router } from "express";
import { signin, signup } from "../controllers/users.controller";
import verifyAuthToken from "../middlewares/auth.middleware";
import respond from "../utils/respond.util";
import User from "../models/user.model";

const router = Router();


router.post("/signup", signup);
router.post("/signin", signin);

router.get("/", async (req, res) => {
  const users = await User.find();

  respond({ res, message: 'Fetched all users', data: users })
});

//@authenticated area
router.use(verifyAuthToken);
router.get('/profile', (req: any, res) => {
  respond({ res, data: req.user.toJSON() })
})

export default router;