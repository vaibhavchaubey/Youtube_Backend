import { Router } from "express";
import {
    changeCurrentPassword,
    getCurrentUser,
    getUserChannelProfile,
    getWatchHistory,
    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

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

/* If you're using multer for file uploads, you might be tempted to include upload.none() middleware when handling routes that don't involve file uploads.  */
router.route("/login").post(upload.none(), loginUser);

// secured routes - specific paths or endpoints in a web application that require authentication and authorization to access
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account").patch(upload.none(), verifyJWT, updateAccountDetails);

router
    .route("/update-avatar")
    .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
router
    .route("/update-coverImg")
    .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);

router.route("/c/:username").get(verifyJWT, getUserChannelProfile);
router.route("/watch-history").get(verifyJWT, getWatchHistory);

export default router;
