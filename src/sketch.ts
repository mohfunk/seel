import p5 from "p5";

const skt = (p: p5) => {
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.frameRate(24);
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
