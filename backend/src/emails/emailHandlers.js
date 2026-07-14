import { resendClient, sender } from "../utils/resend.js";
import { createWelcomeEmailTemplate } from "./emailTemplate.js";
import apiError from "../utils/api.Error.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
    const { data, error } = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: "Welcome to Chatify!",
        html: createWelcomeEmailTemplate(name, clientURL),
    });

    if (error) {
        console.error("Error sending welcome email:", error);
        throw new apiError(500, "Failed to send welcome email");
    }

    console.log("Welcome email sent successfully", data);
};
