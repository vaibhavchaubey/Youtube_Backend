import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const healthcheck = asyncHandler(async (req, res) => {
    res.status(200).json(
        ApiResponse(200, { message: "Everything is OK" }, "OK")
    );
});

export { healthcheck };
