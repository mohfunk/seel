import {gp as p} from "../sketch";

export default class Point {
    public x: number;
    public y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    ver() {
        p.vertex(this.x, this.y);
    }
    line(pnt: Point) {
        p.line(this.x, this.y, pnt.x, pnt.y);
    }
    ofline(pnt: Point, n: number) {
        p.line(this.x + n, this.y + n, pnt.x + n, pnt.y + n);
    }
    update(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
