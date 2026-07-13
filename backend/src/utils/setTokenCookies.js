const cookieOptions = {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
};

const setTokenCookies = (res, accessToken, refreshToken) => {
    return res
        .cookie("accessToken", accessToken, {
            ...cookieOptions,
            maxAge: Number(process.env.ACCESS_TOKEN_COOKIE_MAX_AGE),
        })
        .cookie("refreshToken", refreshToken, {
            ...cookieOptions,
            maxAge: Number(process.env.REFRESH_TOKEN_COOKIE_MAX_AGE),
        });
};

export default setTokenCookies;
