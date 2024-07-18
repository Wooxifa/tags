let tiles = [];
let freeCell = {
    x: 3,
    y: 3,
}
let isShuffling = false;

function createCellNull() {
    let cell = $("<div></div>");
    cell.addClass("field__cell");
    cell.addClass("field__cell--null");
    return cell;
}

function setCellOffSet(cell) {
    cell.css({
        top: 20 + (20 + 150) * cell[0].y + "px",
        left: 20 + (20 + 150) * cell[0].x + "px",
    });
}

function appendCell(cell) {
    $("#game_field").append(cell);
}

function createField(){
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let cell = createCellNull();
            cell[0].x = j;
            cell[0].y = i;
            setCellOffSet(cell);
            appendCell(cell);
        }
    }
};

function createTile (x, y) {
    let tile = $("<div></div>");
    tile.addClass("field__cell");
    tile.addClass("field__cell-tile")
    tile.html(y * 4 + x + 1)
    return tile;
}

function createTiles () {
    for(let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (i === 3 && j === 3) {
                continue;
            }
            let cell = createTile(j, i);
            cell[0].x = j;
            cell[0].y = i;
            setCellOffSet(cell);
            appendCell(cell);
            tiles.push(cell);
        }
    }
}

function animateTiles() {
    for(let index = 0; index < tiles.length; index++) {
        tiles[index].on("click", function (event) {
            let bar = event.target;
            let x = bar.x;
            let y = bar.y;
            let changed = false
            if (y === freeCell.y && Math.abs(x - freeCell.x) === 1) {
                if (x > freeCell.x) {
                    bar.x --;
                    freeCell.x = x;
                }
                else {
                    bar.x ++;
                    freeCell.x = x;
                }
                setCellOffSet(tiles[index]);
                changed = !changed
            }
             else if (x === freeCell.x && Math.abs(y - freeCell.y) === 1) {
                if (y > freeCell.y) {
                    bar.y --;
                    freeCell.y = y;
                }
                else {
                    bar.y ++;
                    freeCell.y = y;
                }
                setCellOffSet(tiles[index]);
                changed = !changed
            }
            if (changed && !isShuffling && isWinner()) {
                $("#window").addClass("modal-visible");
            }
        });
    }
}


function isWinner() {
    for (let i = 0; i < 15; i++) {
        if (tiles[i].html() != tiles[i][0].y * 4 + tiles[i][0].x + 1) {
            return false;
        }
    }
    return true;
}

$("body").on("keydown", function (event) {
    isShuffling = true;
    if (event.keyCode === 13) {
        for (let i = 0; i < 1000; i++) {
            let index = Math.floor(Math.random() * 15);
            tiles[index].click();
        }
    }
    isShuffling = false;
});

$("#window").on("click", function() {
    $(this).removeClass("modal-visible");
});



createField();
createTiles();
animateTiles();