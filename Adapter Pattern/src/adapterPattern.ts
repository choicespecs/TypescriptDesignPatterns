/*
Example One:
Interface 1: Media Player (play)
Interface 2: Advanced Media Player (playVid, playMusic)
*/

// two target interfaces which implement different methods for media players
interface MediaPlayer {
  play(mediaType: string, fileName: string): void;
}

interface AdvancedMediaPlayer {
  playVid(fileName: string): void;
  playMusic(fileName: string): void;
}

class YouTubePlayer implements AdvancedMediaPlayer {
  playVid(fileName: string) {
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
  private advancedMediaPlayer: AdvancedMediaPlayer;

  constructor(mediaType: string) {
    if (mediaType === "youtube") {
      this.advancedMediaPlayer = new YouTubePlayer();
    } else if (mediaType === "mp4") {
      this.advancedMediaPlayer = new Mp4Player();
    }
  }

  play(mediaType: string, fileName: string) {
    if (mediaType === "youtube") {
      this.advancedMediaPlayer.playVid(fileName);
    } else if (mediaType === "mp4") {
      this.advancedMediaPlayer.playMusic(fileName);
    }
  }
}

/*
    we have an adaptee that is meant to interact with the target & subclases
    we use the adapter so we can interface with target that may not match
    perfectly with our class. 
 */
class AudioTextReader implements MediaPlayer {
  private mediaAdapter: MediaAdapter;

  play(audioType: string, fileName: string) {
    if (audioType === "txt") {
      console.log(`Reading txt ${fileName}`);
    } else {
      this.mediaAdapter = new MediaAdapter(audioType);
      this.mediaAdapter.play(audioType, fileName);
    }
  }
}

/*
Example Two:
*/

// Target which a client may only see target...
interface CreditCardPayment {
  getBankDetails(): void;
  getCreditCard(): string;
}

/* 
    Adaptee which we want to connect together with the target
    but we do not have any way currently to connect the two together
    without adding additional implementations or code
*/
class BankDetails {
  private bankName: string;
  private accName: string;
  private accNumber: number;

  getBankName() {
    return this.bankName;
  }

  setBankName(bankName: string) {
    this.bankName = bankName;
  }

  getAccName() {
    return this.accName;
  }

  setAccName(accName: string) {
    this.accName = accName;
  }

  getAccNumber() {
    return this.accNumber;
  }

  setAccNumber(accNumber: number) {
    this.accNumber = accNumber;
  }
}

/* Adapter class
 allows adaptee to interact together with the target to
*/
class BankCustomer extends BankDetails implements CreditCardPayment {
  getBankDetails(): void {
    const accNumber = this.getAccNumber();
    const accName = this.getAccName();
    const bankName = this.getBankName();
    console.log(
      `Account Number: ${accNumber}, Account Name; ${accName}, Bank Name; ${bankName}`
    );
  }

  getCreditCard(): string {
    const accNumber = this.getAccNumber();
    return accNumber.toString();
  }
}
