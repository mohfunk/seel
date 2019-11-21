import p5 from "p5";
import Playback from "./Audio/Playback";

const skt = (p: p5) => {
    let playback = new Playback(p, 0);
    p.preload = () => playback.preload();

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.frameRate(24);
        playback.setup();
        playback.play();
    };
    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
    p.draw = () => {
        p.background(10);
    };
    p.keyPressed = () => {};
};

export default skt;
