/**
 * Created by ilpirata on 02/03/2015.
 */

/* factory to create a cell prototype 10x10*/

function cell(x, y, type, color) {
    var cell = {
        x: x,//width cord
        y: y, //height cord
        w : 10,
        h : 10,
        type: type,
        color : color
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
    struct: [],
    length: 4,
    direction: "dx",
    velocity: 5,
    score: 0,
    get: function get() {
        return this;
    },
    init: function init() {
        for (var i = 0; i < this.length; i++) {
            this.struct[i] = cell(10, 10 + i, "snake", "green").get()
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
                this.struct[i][j] = cell(i, j, "empty", "blue").get()
            }
        }
        return board;
    },
    get: function get() {
        return this;
    }
}

var food = {
    struct : [],
    get : function get(){
        return this
    },
    init : function init(){
        this.struct[0] = cell(25,25,"food","red").get()
        return food
    }
}

var game = {
    board: board.init(),
    snake: snake.init(),
    food: food.init(),
    zoomView : 10,
    get: function get() {
        return this
    },
    init: function init() {
// put snake and food into board matrix
        this.snake.struct.forEach(function (item) {
            //console.log("item is: ", item)
            this.board.struct[item.x][item.y] = item
            console.log("adding item: ",item)
        })
        this.food.struct.forEach(function(item){
            this.board.struct[item.x][item.y] = item;
        })// note that food is one box
        return game;
    },
    start: function start() {
        return game;
    },
    printBoard: function printBoard() {
        var board = "";
        this.board.struct.forEach(function (item) {
            item.forEach(function (obj) {
                //console.log("obj is: ",obj)
                board += " [ " +obj.type + " ] ";
            })
        })
        return board;
    },
    draw : function draw(){
        //draw on canvas
        var c = document.getElementById("canvas");
        var ctx = c.getContext("2d");
        this.board.struct.forEach(function(row){
                //console.log(row)
                row.forEach(function(item){
                    //console.log("drawing a: ",item)
                    ctx.fillStyle = item.color;
                    ctx.fillRect(item.x * 10,item.y * 10,item.h,item.w);
                })
            }
        )
    }
}


