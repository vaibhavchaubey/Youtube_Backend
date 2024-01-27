import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            // The name "avatar" should match the name attribute in the form (frontend) that submits the file.
            name: "avatar",
            maxCount: 1,
        },
        {
            // The name "coverImage" should match the name attribute in the form (frontend) that submits the file.
            name: "coverImage",
            maxCount: 1,
        },
    ]),
    registerUser
);

export default router;
