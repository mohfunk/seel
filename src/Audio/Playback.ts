import p5 from "p5";
import "p5/lib/addons/p5.sound";
import {files} from "../Assets/path.json";
export interface soundTrack {
    name: string;
    artist: string;
    album: string;
    path: string;
}

export default class Playback {
    p: p5;
    current: p5.SoundFile;
    songIndex: number;
    duration: number = 0;
    songs: p5.SoundFile[];
    urls: string[] = [];

    constructor(p: p5, loadIndex: number = 0) {
        this.p = p;
        this.songIndex = loadIndex;
        files.forEach((file) => this.urls.push(file.path));
        this.songs = new Array<p5.SoundFile>(files.length);
        this.current = this.songs[loadIndex];
    }

    setup = () => {
        var button = this.p.createButton("play");
        button.position(19, 19);
        button.mousePressed(this.tog);
    };

    play = () => this.current.play();

    preload = () => {
        this.songs[this.songIndex] = (this.p as any).loadSound(
            this.urls[this.songIndex]
        );
        this.current = this.songs[this.songIndex];
        this.duration = this.current.duration();
    };
    pause = () =>
        this.current.isPlaying() ? this.current.pause() : this.current.play();

    replay = () => {
        this.current.stop();
        this.current.play();
    };
    forward = () => {
        let posn: number = this.current.currentTime();
        let dur: number = this.current.duration();
        this.current.jump(posn + 10, dur - (posn + 10));
    };
    backward = () => {
        let posn: number = this.current.currentTime();
        let dur: number = this.current.duration();
        this.current.jump(posn - 10, dur - (posn - 10));
    };
    mute = () => {
        let vol: number = (this.p as any).getMasterVolume();
        if (vol != 0) (this.p as any).masterVolume(0);
        if (vol != 1) (this.p as any).masterVolume(1);
    };
    next = () => this.changeSong(1);
    prev = () => this.changeSong(-1);

    changeSong = (d: number) => {
        this.current.stop();
        this.current = this.songs[this.songIndex + d];
        this.duration = this.current.duration();
        this.songIndex = this.songIndex + d;
        this.play();
    };
    mov = () => {};
    tog = () => (this.current.isPlaying() ? this.pause() : this.play());
}
