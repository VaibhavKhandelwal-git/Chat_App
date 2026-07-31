import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer.jsx";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router";
function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const login = useAuthStore((state) => state.login);
    const isLoggingIn = useAuthStore((state) => state.isLoggingIn);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submit clicked");
        await login(formData);
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center p-4">
            <div className="relative w-full max-w-md">

                {/* Animated border card */}
                <BorderAnimatedContainer>
                    <div className="w-full p-8 flex flex-col gap-6">

                        {/* Header */}
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-white tracking-tight">
                                Welcome Back
                            </h1>
                            <p className="text-sm text-zinc-500 mt-1">
                                Continue your conversations
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                            {/* Email */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-yellow-700/50 transition-colors"
                                />
                            </div>

                            {/* Password */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 pr-10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-yellow-700/50 transition-colors"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                                    >
                                        {showPassword
                                            ? <EyeOff className="size-4" />
                                            : <Eye className="size-4" />
                                        }
                                    </button>
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isLoggingIn}
                                className="w-full mt-2 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 border border-red-700/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoggingIn
                                    ? <><Loader2 className="size-4 animate-spin" /> Logging in...</>
                                    : "Log In"
                                }
                            </button>

                        </form>

                        {/* Footer */}
                        <p className="text-center text-xs text-zinc-600">
                          Don't have an account?{" "}
                          <Link
                            to="/signup"
                            className="text-zinc-400 hover:text-white transition-colors"
                          >
                              Sign up
                          </Link>
                        </p>

                    </div>
                </BorderAnimatedContainer>

            </div>
        </div>
    );
}

export default LoginPage;
