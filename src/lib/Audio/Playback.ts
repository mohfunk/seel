import p5 from "p5";
import "p5/lib/addons/p5.sound";
import {files} from "../../Assets/path.json";
import {gp as p} from "../../skt/sketch";

/**
 * soundtrack file path
 * @export
 * @interface soundTrack
 */
export interface soundTrack {
    name: string;
    artist: string;
    album: string;
    path: string;
}

/**
 * Audio Playback
 * @export
 * @class Playback
 */
export default class Playback {
    current: p5.SoundFile;
    songIndex: number;
    duration: number = 0;
    songs: p5.SoundFile[];
    urls: string[] = [];

    constructor(loadIndex: number = 0) {
        this.songIndex = loadIndex;
        files.forEach((file) => this.urls.push(file.path));
        this.songs = new Array<p5.SoundFile>(files.length);
        this.current = this.songs[loadIndex];
    }
    /**
     * p5 setup callback
     * @memberof Playback
     */
    public setup = () => {
        var button = p.createButton("play");
        button.position(19, 19);
        button.mousePressed(this.tog);
    };

    /**
     * p5 preload callback
     * @memberof Playback
     */
    public preload = () => {
        this.songs[this.songIndex] = (p as any).loadSound(
            this.urls[this.songIndex]
        );
        this.current = this.songs[this.songIndex];
        this.duration = this.current.duration();
    };

    /**
     * Play the current soundtrack
     * @memberof Playback
     */
    public play = () => this.current.play();

    /**
     * Pause the current soundTrack
     *
     * @memberof Playback
     */
    public pause = () =>
        this.current.isPlaying() ? this.current.pause() : this.current.play();

    /**
     * Replay from start
     *
     * @memberof Playback
     */
    public replay = () => {
        this.current.stop();
        this.current.play();
    };
    /**
     * Seek forward
     *
     * @memberof Playback
     */
    public forward = () => {
        let posn: number = this.current.currentTime();
        let dur: number = this.current.duration();
        this.current.jump(posn + 10, dur - (posn + 10));
    };
    /**
     * Seek backwards
     *
     * @memberof Playback
     */
    public backward = () => {
        let posn: number = this.current.currentTime();
        let dur: number = this.current.duration();
        this.current.jump(posn - 10, dur - (posn - 10));
    };
    /**
     * Mute
     *
     * @memberof Playback
     */
    public mute = () => {
        let vol: number = (p as any).getMasterVolume();
        if (vol != 0) (p as any).masterVolume(0);
        if (vol != 1) (p as any).masterVolume(1);
    };
    /**
     * next soundtrack
     *
     * @memberof Playback
     */
    public next = () => this.changeSong(1);
    /**
     * prec soundtrack
     *
     * @memberof Playback
     */
    public prev = () => this.changeSong(-1);

    private changeSong = (d: number) => {
        this.current.stop();
        this.current = this.songs[this.songIndex + d];
        this.duration = this.current.duration();
        this.songIndex = this.songIndex + d;
        this.play();
    };
    mov = () => {};
    public tog = () => (this.current.isPlaying() ? this.pause() : this.play());
    public keyPress = (kc: number) => {
        if (kc === 37) this.backward();
        if (kc === 39) this.forward();
        if (kc === 77) this.mute();
        if (kc === 80) this.pause();
        if (kc === 82) this.replay();
        if (kc === 90) this.tog();
        if (kc === 188) this.prev();
        if (kc === 190) this.next();
    };
}
