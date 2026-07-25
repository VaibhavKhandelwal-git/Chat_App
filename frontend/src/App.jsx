import { Routes, Route } from "react-router";

import ChatPage from "./pages/chatPage";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";

function App() {
    return (
        <div className="min-h-screen bg-[#0c0608] relative overflow-hidden">

            {/* Dot grid — barely perceptible, only visible on close inspection */}
            <div className="absolute inset-0 bg-[radial-gradient(#7f1d1d0d_1px,transparent_1px)] bg-[size:22px_22px]" />

            {/* Vignette — deepens edges, frames the composition */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_85%_at_50%_50%,transparent_45%,#0c060870)]" />

            {/* Crimson — primary ambient, top-left, softened and enlarged */}
            <div className="absolute -top-64 -left-64 h-[60rem] w-[60rem] rounded-full bg-red-900/38 blur-[260px]" />

            {/* Gold — warmth only, barely visible */}
            <div className="absolute -top-16 -left-8 h-[26rem] w-[26rem] rounded-full bg-yellow-600/10 blur-[140px]" />

            {/* Purple — depth shadow, bottom-right, blended softly */}
            <div className="absolute -bottom-56 -right-56 h-[52rem] w-[52rem] rounded-full bg-purple-950/45 blur-[240px]" />

            {/* Gold — second warmth accent, bottom-right, barely there */}
            <div className="absolute -bottom-8 -right-8 h-[22rem] w-[22rem] rounded-full bg-yellow-600/9 blur-[130px]" />

            {/* Central crimson — ties the composition together */}
            <div className="absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-950/28 blur-[200px]" />

            <div className="relative z-10 min-h-screen">
                <Routes>
                    <Route path="/" element={<ChatPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                </Routes>
            </div>

        </div>
    );
}

export default App;
