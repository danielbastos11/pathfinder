define(
    [],
    function(){
        var Node = function( config ){
            this.type = config.type;
            this.row = config.row;
            this.col = config.col;
        };

        Node.prototype.toString = function(){
            return this.row + 'x' + this.col;
        }

        return Node;
    }
);
