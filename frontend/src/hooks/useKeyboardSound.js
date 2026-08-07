const keySounds = [
    "/sounds/key1.mp3",
    "/sounds/key2.mp3",
    "/sounds/key3.mp3",
].map((src) => new Audio(src));

const useKeyboardSound = () => {
    const playRandomKeyStrokeSound = () => {
        const sound = keySounds[Math.floor(Math.random() * keySounds.length)];
        sound.currentTime = 0;
        sound.play().catch(() => {});
    };

    return { playRandomKeyStrokeSound };
};

export default useKeyboardSound;
