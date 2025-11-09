export const taskDoneAudio = () => {
    const audio = new Audio('/Audios/bonus-points-190035.mp3');
    audio.play();
};

export const acceptAudio = () => {
    const audio = new Audio('/Audios/new-notification-7-210334.mp3');
    audio.play();
};

export const navAudio = () => {
    const audio = new Audio('/Audios/select-sound-121244.mp3');
    audio.play();
}

export const negativeAudio = () => {
    const audio = new Audio('/Audios/negative_beeps-6008.mp3');
    audio.play();
}

export const welcomeAudio = () => {
    const audio = new Audio('/Audios/interface-welcome-131917.mp3');
    audio.volume = 0.5;
    audio.play();
}

export const trainerAcceptAudio = () => {
    const audio = new Audio('/Audios/start-computeraif-14572.mp3');
    audio.play();
}

export const loaderAudio = () => {
    const audio = new Audio('/Audios/game-bonus-144751.mp3');
    audio.volume = 0.5;
    audio.play();
    return audio;
}

export const claimRewardModalAudio = () => {
    const audio = new Audio('/Audios/brass-new-level-151765.mp3');
    audio.play();
}

export const acceptRewardAudio = () => {
    const audio = new Audio('/Audios/level-passed-143039.mp3');
    audio.play();
}

export const radioButtonAudio = () => {
    const audio = new Audio('/Audios/click-for-game-menu-131903.mp3');
    audio.volume = 0.3;
    audio.play();
}

export const whooshAudio = () => {
    const audio = new Audio('/Audios/woosh-230554.mp3');
    audio.play();
}

export const welcomeToPlayModeAudio = () => {
    const audio = new Audio('/Audios/music-for-game-fun-kid-game-163649.mp3');
    audio.play();

    return audio;
};

export const gameplayAudio1 = () => {
    const audio = new Audio('/Audios/game-music-loop-1-143979.mp3');
    audio.loop = true;

    return audio;
};

export const gameplayAudio2 = () => {
    const audio = new Audio('/Audios/game-music-loop-7-145285.mp3');
    audio.loop = true;

    return audio;
};

export const startPlayAudio = () => {
    const audio = new Audio('/Audios/startup-87026.mp3');
    audio.play();
}