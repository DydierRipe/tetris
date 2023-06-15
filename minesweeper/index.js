const table = document.querySelector(".tetris-table");
let needOtherBlock = true;

const setMovement = (brick) => {
    document.addEventListener("keydown", e => {
        if (!brick.set) {
            switch (e.key) {
                case "ArrowDown": 
                    brick.moveDown();
                    break;
                case "ArrowLeft":
                    brick.moveLeft();
                    break;
                case "ArrowRight":
                    brick.moveRight();
                    break;
                case "z":
                    brick.rotateBlock();
                    break;
            }
        }
    });
}

const lineMade = () => {
    const boxes = document.querySelectorAll(".box");
    let n = 0, deletedRows = [];
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 10; j++) {
            if (boxes[(i * 10) + j].dataset.group != "0") {
                n++;
            }   
        }
        if (n == 10) {
            for (let j = 0; j < 10; j++) {
                boxes[(i * 10) + j].style = "";
                boxes[(i * 10) + j].dataset.group = '0';
            }
            deletedRows.push(i*10);
        }
        n = 0;
    }

    for (let i = 0; i < deletedRows.length; i++) {
        for (let j = deletedRows[i]-1; j >= 0; j--) {
            if (boxes[j].dataset.group != "0") {
                boxes[j+10].style = "background-color: " + boxes[j].dataset.color + ";";
                boxes[j+10].dataset.color = boxes[j].dataset.color;
                boxes[j+10].dataset.group = boxes[j].dataset.group;

                boxes[j].style = "";
                boxes[j].dataset.color = "";
                boxes[j].dataset.group = '0';
            }
        }
    }
}

for (let i = 0; i < 200; i++) {
    const fragment = document.createDocumentFragment();
    const box = document.createElement("div");
    box.classList.add("box"); 
    box.setAttribute("data-group", "0");
    box.setAttribute("data-color", "");
    fragment.appendChild(box);
    table.appendChild(fragment);
}

let currentGroup = 1;

const mainInterval = setInterval(() => {
    
    if (needOtherBlock) {
        needOtherBlock = false;
        let brick;

        switch (Math.floor(Math.random() * 7)) {
            case 0: 
                brick = new J(3, 0, currentGroup.toString());
                break;
            case 1:
                brick = new L(3, 0, currentGroup.toString());
                break;
            case 2:
                brick = new O(5, 0, currentGroup.toString());
                break;
            case 3:
                brick = new S(3, 0, currentGroup.toString());
                break;
            case 4:
                brick = new T(3, 0, currentGroup.toString());
                break;
            case 5:
                brick = new Z(3, 0, currentGroup.toString());
                break;
            case 6:
                brick = new I(3, 0, currentGroup.toString());
                break;
        }

        currentGroup++;
        setMovement(brick);
        if (brick.gameState == "end") {
            console.log("game Over");
            clearInterval(mainInterval);
        }
        else {
            brick.moveDownInterval();
        }
    }
}, 500);
