/**
 * Created by ilpirata on 02/03/2015.
 */
/* factory to create a board w*h */
function board(w,h){
    var board = [];

    return {
        get: function get(){
            return board;
        },
        print: function print(){
            console.log("board is: ", board)
        }
    }
}