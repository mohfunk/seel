import p5 from "p5";
import Playback from "../lib/Audio/Playback";
import Pentagram from "../lib/Draw/pentagram";
export let gp: p5;
const skt = (p: p5) => {
    gp = p;
    let playback = new Playback();
    let pentagram: Pentagram;
    p.preload = () => playback.preload();

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.frameRate(24);
        playback.setup();
        pentagram = new Pentagram();
        pentagram.setup();
    };
    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
    p.draw = () => {
        p.background(10);
        pentagram.draw();
    };
    p.keyPressed = () => {
        playback.keyPress(p.keyCode);
    };
};

export default skt;
