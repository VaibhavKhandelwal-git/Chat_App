import aj from "../utils/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

const arcjetMiddleware = asyncHandler(async (req, res, next) => {
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
        if (decision.reason.isRateLimit()) {
            return res
                .status(429)
                .json(new apiResponse(429, null, "Too many requests. Please try again later."));
        }

        if (decision.reason.isBot()) {
            return res
                .status(403)
                .json(new apiResponse(403, null, "Bot access denied."));
        }

        return res
            .status(403)
            .json(new apiResponse(403, null, "Access denied by security policy."));
    }

    next();
});