/**
 * Created by ilpirata on 02/03/2015.
 */

/* factory to create a cell prototype 10x10*/

function cell(x, y, type) {
    var cell = {
        x: x,//width cord
        y: y, //height cord
        type: type
    }
    return{
        get: function get() {
            return cell
        },
        getType: function getTipe() {
            return this.type
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
            this.struct[i] = cell(10, 10 + i, "snake").get()
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
                this.struct[i][j] = cell(i, j, "empty").get()
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
        this.struct = cell(5,5,"food").get()
        return this
    }
}

var game = {
    board: board.init(),
    snake: snake.init(),
    food: food.init(),
    get: function get() {
        return this
    },
    init: function init() {
// put snake and food into board matrix
        this.snake.struct.forEach(function (item) {
            //console.log("item is: ", item)
            this.board.struct[item.x][item.y].type = "snake"
        })
        var food_struct = this.food.struct
       // console.log("food is: ",food_struct)
        this.board.struct[food_struct.x][food_struct.y].type = "food";
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
    }
}

console.log(game.init().printBoard())
