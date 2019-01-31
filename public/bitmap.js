let clientUpdates = {clientupdates: [], sequence: 0}

function Bitmap(width, height) {
    this.grid = [];
    for(var row = 0; row < height; row++) {
        var row_arr = new Array(width);
        row_arr.fill("white");
        this.grid.push(row_arr);
    }
}

Bitmap.prototype.render = function(target_element) {
    this.cells = [];
    for(var row = 0; row < this.grid.length; row++) {
        var row_div = document.createElement("div");
        var cell_refs = [];
        row_div.className = "bmp_row";
        for(var col = 0; col < this.grid[row].length; col++) {
            var cell = document.createElement("div");
            cell.className = "bmp_cell";
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.style.background = this.grid[row][col];
            cell.addEventListener("click", this);
            row_div.appendChild(cell);
            cell_refs.push(cell);
        }
        target_element.appendChild(row_div);
        this.cells.push(cell_refs);
    }
};

Bitmap.prototype.setColor = function(row, col, color, localChange = true) {
    this.grid[row][col] = color;
    this.cells[row][col].style.background = color;
    if (localChange) {
        clientUpdates.clientupdates.push([row, col, color])
    }
}

Bitmap.prototype.handleEvent = function(event) {
    if(event.type === "click") {
        var row = parseInt(event.currentTarget.dataset.row);
        var col = parseInt(event.currentTarget.dataset.col);
        if(tool === "draw") {
            this.setColor(row, col, paint_color);
        } else if(tool == "fill") {
            this.fill(row, col, paint_color);
        }
    }
};