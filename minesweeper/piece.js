class piece {
    constructor (x, y, group, color) {
        this.coords = this.setBlockCoords(x, y);
        this.group = group;
        this.color = color;
        this.gameState = "gaming";
        this.set = false;

        for (let i = 0; i < this.coords.length; i++) {
            if (this.isSolid([this.getCurrentBox(this.coords[i][0], this.coords[i][1]), this.coords[i][0]+this.coords[i][1]])
                && this.coords[i][2]) {
                this.gameState = "end";
            } 
        }
        
        if (this.gameState == "gaming") {
            for (let i = 0; i < this.coords.length; i++) {
                if (this.coords[i][2]) {
                    this.getCurrentBox(this.coords[i][0], this.coords[i][1]).style = "background-color:" + this.color + ";";
                    this.getCurrentBox(this.coords[i][0], this.coords[i][1]).dataset.color = this.color;
                    this.getCurrentBox(this.coords[i][0], this.coords[i][1]).dataset.group = group;
                }
            }
        }
    }

    moveDownInterval (time) {
        const interval = setInterval(() => {
            let canMove = true;
            for (let i = this.coords.length-1; i >= 0; i--) {
                if (this.coords[i][2]) {
                    const adjacent = this.getAdjacentBox(this.coords[i][0], this.coords[i][1]);
                
                    if (this.isSolid(adjacent) && this.isSolid(adjacent, this.group)) {
                        canMove = false;
                    }
                }
            }

            if (canMove) {
                for (let i = this.coords.length-1; i >= 0; i--) {
                    if (this.coords[i][2]) {
                        const adjacent = this.getAdjacentBox(this.coords[i][0], this.coords[i][1]);
                        this.setNewBlock(i, adjacent[0], [1, 10]);
                    } else {
                        this.coords[i][1] += 10;
                    }
                }
            } else {
                clearInterval(interval);
                lineMade();
                this.set = true;
                needOtherBlock = true;
            }
        }, time);
    }

    moveDown () {
        let canMove = true;
        for (let i = this.coords.length-1; i >= 0; i--) {
            if (this.coords[i][2]) {
                const adjacent = this.getAdjacentBox(this.coords[i][0], this.coords[i][1]);
                
                if (this.isSolid(adjacent) && this.isSolid(adjacent, this.group)) {
                    canMove = false;
                }
            }
        }

        if (canMove) {
            for (let i = this.coords.length-1; i >= 0; i--) {
                if (this.coords[i][2]) {
                    const adjacent = this.getAdjacentBox(this.coords[i][0], this.coords[i][1]);
                    this.setNewBlock(i, adjacent[0], [1, 10]);
                } else {
                    this.coords[i][1] += 10;
                }
            }
        }
    }

    moveLeft () {
        let canMove = true;
        for (let i = 0; i < this.coords.length; i++) {
            if (this.coords[i][2]) {
                const adjacent = this.getAdjacentBox(this.coords[i][0], this.coords[i][1], "left");
                let index = adjacent[1] % 10;

                if ((this.isSolid(adjacent) && this.isSolid(adjacent, this.group)) || index == "9") {
                    canMove = false;
                }
            }
        }

        if (canMove) {
            for (let i = 0; i < this.coords.length; i++) {
                if (this.coords[i][2]) {
                    const adjacent = this.getAdjacentBox(this.coords[i][0], this.coords[i][1], "left");
                    this.setNewBlock(i, adjacent[0], [0, -1]);
                } else {
                    this.coords[i][0] -= 1;
                }
            }
        }
    }

    moveRight () {
        let canMove = true;
        for (let i = this.coords.length-1; i >= 0; i--) {
            if (this.coords[i][2]) {
                const adjacent = this.getAdjacentBox(this.coords[i][0], this.coords[i][1], "right");
                let index = adjacent[1] % 10;

                if ((this.isSolid(adjacent) && this.isSolid(adjacent, this.group)) || index == "0") {
                    canMove = false;
                }
            }
        }

        if (canMove) {
            for (let i = this.coords.length-1; i >= 0; i--) {
                if (this.coords[i][2]) {
                    const adjacent = this.getAdjacentBox(this.coords[i][0], this.coords[i][1], "right");
                    this.setNewBlock(i, adjacent[0], [0, 1]);
                } else {
                    this.coords[i][0] += 1;
                }
            }
        }
    }

    rotateBlock () {
        let matrix = [];
        let subCoords = this.coords;

        for (let i = 0; i < this.coords.length; i++) {
            matrix.push(this.coords[i]);
        }

        const size = Math.floor(Math.sqrt(matrix.length));
        const result = new Array(matrix.length);
        const originalX = new Array(matrix.length);

        for (let i = 0; i < size; ++i) {
            for (let j = 0; j < size; ++j) {
                result[i * size + j] = matrix[(size - j - 1) * size + i][2];
                originalX[i * size + j] = matrix[(size - j - 1) * size + i][0];
            }
        }

        let rotate = this.canRotate(result, originalX);

        for (let i = 0; i < this.coords.length; i++) {
            
            if (rotate) {
                subCoords[i][2] = result[i];
                if (subCoords[i][2]) {

                    const rotated = this.getCurrentBox(subCoords[i][0], subCoords[i][1]);
                    this.getCurrentBox(this.coords[i][0], this.coords[i][1]).style = "";
                    this.getCurrentBox(this.coords[i][0], this.coords[i][1]).dataset.color = "";
                    this.getCurrentBox(this.coords[i][0], this.coords[i][1]).dataset.group = '0';

                    rotated.style = "background-color:" + this.color + ";";
                    rotated.dataset.color = this.color;
                    rotated.dataset.group = this.group;
                } else if (this.getCurrentBox(this.coords[i][0], this.coords[i][1]).dataset.group == this.group) {
                    this.getCurrentBox(this.coords[i][0], this.coords[i][1]).style = "";
                    this.getCurrentBox(this.coords[i][0], this.coords[i][1]).dataset.color = "";
                    this.getCurrentBox(this.coords[i][0], this.coords[i][1]).dataset.group = '0';
                }
                this.coords[i][2] = subCoords[i][2];
            }
        }
    }

    setNewBlock (i, newBlock, newCoord) {
        newBlock.style = "background-color:" + this.color + ";";
        newBlock.dataset.color = this.color;
        newBlock.dataset.group = this.group;

        this.getCurrentBox(this.coords[i][0], this.coords[i][1]).style = "";
        this.getCurrentBox(this.coords[i][0], this.coords[i][1]).dataset.color = "";
        this.getCurrentBox(this.coords[i][0], this.coords[i][1]).dataset.group = '0';

        this.coords[i][newCoord[0]] += newCoord[1];
    }

    setBlockCoords (x, y) {
        return [
            [x,y-10, false],[x+1,y-10, false],[x+2,y-10, false],
            [x,y, true],[x+1,y, true],[x+2,y, true],
            [x,y+10, false],[x+1,y+10, true],[x+2,y+10, false]
        ];
    }

    canRotate (result, originalX) {
        let rotate = true;
        for (let i = 0; i < this.coords.length; i++) {
            if (result[i]) {
                let overflown = false;
                const rotated = this.getCurrentBox(this.coords[i][0], this.coords[i][1]);
                let sumCoords = this.coords[i][0] + this.coords[i][1];

                if ((originalX[i] == 0 && this.coords[i][0] == -1) || (originalX[i] == 9 && this.coords[i][0] == 10)) {
                    overflown = true;
                }

                if ((this.isSolid([rotated, sumCoords]) && this.isSolid([rotated, sumCoords], this.group)) || overflown) {
                    rotate = false;
                }
            }
        }

        return rotate;
    }

    isSolid (box, group = "0") {
        if (box[1] < 200 && box[1] >= 0) {
            if (box[0].dataset.group != group) {
                return true; 
            } else {
                return false;
            }
        } else return true;
    }

    getCurrentBox(x, y) {
        const boxes = document.querySelectorAll(".box");

        return boxes[x+y];
    }

    getAdjacentBox (x, y, direction = "down") {
        const boxes = document.querySelectorAll(".box");
        let adjacentPos = -2;

        if (direction == "down") adjacentPos = x + y + 10;
        else if (direction == "right") adjacentPos = x + y + 1;
        else if (direction == "up") adjacentPos = x + y - 10;
        else if (direction == "left") adjacentPos = x + y - 1;

        if (adjacentPos == -2) {
            throw new Error("wtf that ain't a direction");
        } else {
            return [boxes[adjacentPos], adjacentPos];
        }
    }
}