/**
 * Created by ilpirata on 02/03/2015.
 */

/* factory to create a cell prototype 10x10*/

function cell(x, y, type, color) {
    var cell = {
        x: x,//width cord
        y: y, //height cord
        w: 10,
        h: 10,
        type: type,
        color: color
    }
    return{
        get: function get() {
            return cell
        }
    }
}
/* object literal create a snake */
var snake = {
    //console.log("enter snake")
    struct: [], //array of coordi
    length: 4,
    direction: "dx",
    velocity: 5,
    score: 0,

    get: function get() {
        return this;
    },
    init: function init() {
        for (var i = 0; i < this.length; i++) {
            //this.struct[i] = cell(10 - i, 10, "snake", "green").get()
            this.struct.push({x: 10 - i, y: 10})
        }
        return this;
    }

};
/* factory to create a board w*h */
var board = {
    struct: [],
    width: 50,
    height: 50,
    init: function init() {
        for (var i = 0; i < this.height; i++) {
            this.struct[i] = []
            for (var j = 0; j < this.width; j++) {
                this.struct[i][j] = {x: i, y: j}
            }
        }
        return board;
    },
    get: function get() {
        return this;
    }
}

var food = {
    struct: {x: 25, y: 25},
    get: function get() {
        return this
    },
    init: function init() {
        this.struct = {x: 25, y: 25}
        return this
    },
    newFood: function newFood() {
        this.struct.x = parseInt(Math.random() * 50)
        this.struct.y = parseInt(Math.random() * 50)
        return this
    }
}

var game = {
    board: board.init(),
    snake: snake.init(),
    food: food.newFood(),
    zoomView: 10,
    get: function get() {
        return this
    },
    init: function init() {
        var self = this.snake;
        console.log("food is:",this.food)
        window.addEventListener("keydown",
            function onKeyDown(e) {
                //console.log(self)
                switch (e.keyCode) {
                    case 37: //left
                        if (self.direction != "dx")
                            self.direction = "sx"
                        break;
                    case 38: // up
                        if (self.direction != "down")
                            self.direction = "up"
                        break;
                    case 39: //right
                        if (self.direction != "sx")
                            self.direction = "dx"
                        break;
                    case 40: //down
                        if (self.direction != "up")
                            self.direction = "down"
                        break;
                }
            })
        this.snake.direction = self.direction
        return game;
    },
    start: function start() {
        var newHead
        var oldHead = this.snake.struct[0];
        // console.log(this.struct)
        if (this.snake.direction == "dx") {
            newHead = {x: oldHead.x + 1, y: oldHead.y}
        }
        else if (this.snake.direction == "sx") {
            newHead = {x: oldHead.x - 1, y: oldHead.y}
        }
        else if (this.snake.direction == "up") {
            newHead = {x: oldHead.x, y: oldHead.y - 1}
        }
        else {//down
            newHead = {x: oldHead.x, y: oldHead.y + 1}
        }
        console.log(this.food.struct)
        console.log(newHead)
        if (newHead.x == this.food.struct.x && newHead.y == this.food.struct.y) {
            console.log("snake eating")
            this.snake.score += 50;
            this.food.newFood()

            //do not remove tail
        } else {
            //del tail
            this.snake.struct.pop()
        }

        //console.log("board width: ",this.board.width)
        if (newHead.x == this.board.width) {
            newHead.x = 0;
            //console.log("head is: ",newHead)
        }
        if (newHead.y == this.board.height)
            newHead.y = 0;

        if (newHead.y == -1)
            newHead.y = this.board.height;

        if (newHead.x == -1)
            newHead.x = this.board.width;

        this.snake.struct.unshift(newHead)
        // console.log(this.snake.struct)
        return game;

    },

    printBoard: function printBoard() {
        var board = "";
        this.board.struct.forEach(function (item) {
            item.forEach(function (obj) {
                //console.log("obj is: ",obj)
                board += " [ " + obj.type + " ] ";
            })
        })
        return board;
    },
    draw: function draw() {
        //draw on canvas
        var c = document.getElementById("canvas");
        var ctx = c.getContext("2d");
        /* draw background */
        this.board.struct.forEach(function (row) {
                //console.log(row)
                row.forEach(function (item) {
                    //console.log("drawing a: ",item)
                    ctx.fillStyle = "white";
                    ctx.fillRect(item.x * 10, item.y * 10, 10, 10);
                })
            }
        )
        //draw snake
        this.snake.struct.forEach(function (item) {
            //console.log(row)
            //console.log("drawing a: ",item)
            ctx.fillStyle = "green";
            ctx.fillRect(item.x * 10, item.y * 10, 10, 10);
        })
        //draw food
        ctx.fillStyle = "red";
        ctx.fillRect(this.food.struct.x * 10, this.food.struct.y * 10, 10, 10);
        return this
    }
}


