class O extends piece {
    constructor (x, y, group) {
        super(x, y, group, "#f0f000");
    }

    setBlockCoords (x, y) {
        return [
            [x,y, true],[x+1,y, true],
            [x,y+10, true],[x+1,y+10, true]
        ];
    }
}

class T extends piece {
    constructor (x, y, group) {
        super(x, y, group, "#a000f0");
    }
}

class L extends piece {
    constructor (x, y, group) {
        super(x, y, group, "#f0a000");
    }

    setBlockCoords (x, y) {
        return [
            [x,y-10, false],[x+1,y-10, false],[x+2,y-10, false],
            [x,y, true],[x+1,y, true],[x+2,y, true],
            [x,y+10, true],[x+1,y+10, false],[x+2,y+10, false]
        ];
    }
}

class J extends piece {
    constructor (x, y, group) {
        super(x, y, group, "#0000f0");
    }

    setBlockCoords (x, y) {
        return [
            [x,y-10, false],[x+1,y-10, false],[x+2,y-10, false],
            [x,y, true],[x+1,y, true],[x+2,y, true],
            [x,y+10, false],[x+1,y+10, false],[x+2,y+10, true]
        ];
    }
}

class S extends piece {
    constructor (x, y, group) {
        super(x, y, group, "#00f000");
    }

    setBlockCoords (x, y) {
        return [
            [x,y-10, false],[x+1,y-10, false],[x+2,y-10, false],
            [x,y, false],[x+1,y, true],[x+2,y, true],
            [x,y+10, true],[x+1,y+10, true],[x+2,y+10, false]
        ];
    }

    canRotate (result, originalX) {
        let rotate = true;
        for (let i = 0; i < this.coords.length; i++) {
            if (result[i]) {
                let overflown = false;
                const rotated = this.getCurrentBox(this.coords[i][0], this.coords[i][1]);
                let sumCoords = this.coords[i][0] + this.coords[i][1];

                if ((originalX[i] == 0 && this.coords[i][0] == -1) || (originalX[i] == 9 && this.coords[i][0] == 10) 
                || (originalX[i] == 0 && this.coords[i][0] == 1)|| (originalX[i] == 8 && this.coords[i][0] == 10)) {
                    overflown = true;
                }

                if ((this.isSolid([rotated, sumCoords]) && this.isSolid([rotated, sumCoords], this.group)) || overflown) {
                    rotate = false;
                }
            }
        }

        return rotate;
    }
}

class Z extends piece {
    constructor (x, y, group) {
        super(x, y, group, "#f00000");
    }

    setBlockCoords (x, y) {
        return [
            [x,y-10, false],[x+1,y-10, false],[x+2,y-10, false],
            [x,y, true],[x+1,y, true],[x+2,y, false],
            [x,y+10, false],[x+1,y+10, true],[x+2,y+10, true]
        ];
    }

    canRotate (result, originalX) {
        let rotate = true;
        for (let i = 0; i < this.coords.length; i++) {
            if (result[i]) {
                let overflown = false;
                const rotated = this.getCurrentBox(this.coords[i][0], this.coords[i][1]);
                let sumCoords = this.coords[i][0] + this.coords[i][1];
                
                if ((originalX[i] == 0 && this.coords[i][0] == -1) || (originalX[i] == 9 && this.coords[i][0] == 10) 
                || (originalX[i] == 0 && this.coords[i][0] == 1)|| (originalX[i] == 8 && this.coords[i][0] == 10)) {
                    overflown = true;
                }

                if ((this.isSolid([rotated, sumCoords]) && this.isSolid([rotated, sumCoords], this.group)) || overflown) {
                    rotate = false;
                }
            }
        }

        return rotate;
    }
}

class I extends piece {
    constructor (x, y, group) {
        super(x, y, group, "#00f0f0");
    }

    setBlockCoords (x, y) {
        return [
            [x,y-10, false],[x+1,y-10, false],[x+2,y-10, false], [x+3,y-10, false],
            [x,y, true],[x+1,y, true],[x+2,y, true], [x+3,y, true],
            [x,y+10, false],[x+1,y+10, false],[x+2,y+10, false], [x+3,y+10, false],
            [x,y+20, false],[x+1,y+20, false],[x+2,y+20, false], [x+3,y+20, false]
        ];
    }

    canRotate (result, originalX) {
        let rotate = true;
        for (let i = 0; i < this.coords.length; i++) {
            if (result[i]) {
                let overflown = false;
                const rotated = this.getCurrentBox(this.coords[i][0], this.coords[i][1]);
                let sumCoords = this.coords[i][0] + this.coords[i][1];
                
                if ((originalX[i] == 0 && this.coords[i][0] == -1) || (originalX[i] == 9 && this.coords[i][0] == 10) 
                || (originalX[i] == 1 && this.coords[i][0] == 0) || (originalX[i] == 8 && this.coords[i][0] == 8)) {
                    overflown = true;
                }

                if ((this.isSolid([rotated, sumCoords]) && this.isSolid([rotated, sumCoords], this.group)) || overflown) {
                    rotate = false;
                }
            }
        }

        return rotate;
    }
}
