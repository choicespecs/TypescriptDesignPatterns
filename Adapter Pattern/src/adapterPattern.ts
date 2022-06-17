interface MediaPlayer {
    play(mediaType : string, fileName : string) : void;
}

interface AdvancedMediaPlayer {
    playVid(fileName: string) : void;
    playMusic(fileName: string) : void;
}

class YouTubePlayer implements AdvancedMediaPlayer {
    playVid(fileName : string) {
        console.log(`opened youtube video: ${fileName}`);
    }

    playMusic(fileName: string): void {}
}

class Mp4Player implements AdvancedMediaPlayer {
    playVid(fileName: string): void {}

    playMusic(fileName: string): void {
        console.log(`Play Music Player`);
    }
}

class MediaAdapter implements MediaPlayer {

    private advancedMediaPlayer : AdvancedMediaPlayer;

    constructor(mediaType: string) {
        if (mediaType === "youtube") {
            this.advancedMediaPlayer = new YouTubePlayer();
        } else if (mediaType === "mp4") {
            this.advancedMediaPlayer = new Mp4Player();
        }
    }

    play(mediaType : string, fileName : string) {
        if (mediaType === "youtube") {
            this.advancedMediaPlayer.playVid(fileName);
        } else if (mediaType === "mp4") {
            this.advancedMediaPlayer.playMusic(fileName);
        }
    }
}

class AudioPlayer implements MediaPlayer {
    private mediaAdapter : MediaAdapter;

    play(audioType: string, fileName: string) {
        if (audioType === "mp3") {
            console.log(`Playing mp3 ${fileName}`)
        } else {
            this.mediaAdapter = new MediaAdapter(audioType);
            this.mediaAdapter.play(audioType, fileName);
        }
    }
}