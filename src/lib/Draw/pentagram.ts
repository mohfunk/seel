import Point from "./point";
const step: number = (2 * Math.PI) / 5;
import {gp as p} from "../../skt/sketch";

export default class Pentagram {
    center: Point;
    radius: number;
    points: Point[] = [];

    constructor(radius: number = 50) {
        this.center = new Point(p.width / 2, p.height / 2);
        this.radius = radius;
        for (var i = 0; i < 5; ++i)
            this.points[i] = new Point(this.center.x, this.center.y);
    }
    private dim = () => {
        var i = 0;
        for (var th = 0; th < 2 * Math.PI; th += step, ++i) {
            let x = this.center.x + this.radius * Math.cos(th - Math.PI / 2);
            let y = this.center.y + this.radius * Math.sin(th + Math.PI / 2);
            this.points[i].update(x, y);
        }
    };
    setup = () => this.dim();

    draw() {
        this.dim();
        p.push();
        p.stroke(255);
        p.strokeWeight(5);
        p.strokeJoin(p.MITER);
        p.fill(255, 0, 0);
        this.points[0].line(this.points[2]);
        this.points[2].line(this.points[4]);
        this.points[4].line(this.points[1]);
        this.points[1].line(this.points[3]);
        this.points[3].line(this.points[0]);
        p.pop();
    }
}
