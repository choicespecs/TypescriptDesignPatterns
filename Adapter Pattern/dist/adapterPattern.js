"use strict";
/*
Example One:
Interface 1: Media Player (play)
Interface 2: Advanced Media Player (playVid, playMusic)
*/
class YouTubePlayer {
    playVid(fileName) {
        console.log(`opened youtube video: ${fileName}`);
    }
    playMusic(fileName) { }
}
class Mp4Player {
    playVid(fileName) { }
    playMusic(fileName) {
        console.log(`Play Music Player`);
    }
}
class MediaAdapter {
    constructor(mediaType) {
        if (mediaType === "youtube") {
            this.advancedMediaPlayer = new YouTubePlayer();
        }
        else if (mediaType === "mp4") {
            this.advancedMediaPlayer = new Mp4Player();
        }
    }
    play(mediaType, fileName) {
        if (mediaType === "youtube") {
            this.advancedMediaPlayer.playVid(fileName);
        }
        else if (mediaType === "mp4") {
            this.advancedMediaPlayer.playMusic(fileName);
        }
    }
}
/*
    we have an adaptee that is meant to interact with the target & subclases
    we use the adapter so we can interface with target that may not match
    perfectly with our class.
 */
class AudioTextReader {
    play(audioType, fileName) {
        if (audioType === "txt") {
            console.log(`Reading txt ${fileName}`);
        }
        else {
            this.mediaAdapter = new MediaAdapter(audioType);
            this.mediaAdapter.play(audioType, fileName);
        }
    }
}
/*
    Adaptee which we want to connect together with the target
    but we do not have any way currently to connect the two together
    without adding additional implementations or code
*/
class BankDetails {
    getBankName() {
        return this.bankName;
    }
    setBankName(bankName) {
        this.bankName = bankName;
    }
    getAccName() {
        return this.accName;
    }
    setAccName(accName) {
        this.accName = accName;
    }
    getAccNumber() {
        return this.accNumber;
    }
    setAccNumber(accNumber) {
        this.accNumber = accNumber;
    }
}
/* Adapter class
 allows adaptee to interact together with the target to
*/
class BankCustomer extends BankDetails {
    getBankDetails() {
        const accNumber = this.getAccNumber();
        const accName = this.getAccName();
        const bankName = this.getBankName();
        console.log(`Account Number: ${accNumber}, Account Name; ${accName}, Bank Name; ${bankName}`);
    }
    getCreditCard() {
        const accNumber = this.getAccNumber();
        return accNumber.toString();
    }
}
