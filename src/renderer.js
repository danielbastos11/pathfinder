define(
    [
        'src/graph.js'
    ],
    function( Graph ){
        // Helpers
        var newline = '\n';
        function isValidPosition( row, col, array){
            var isNotInvalid = ( row >= 0 && col >= 0 );
            var rowExists = ( row < array.length );
            var colExists = ( col < array[row].length);

            return isNotInvalid && rowExists && colExists;
        }

        function isWalkable( type ){
            return type == 'path' || type == 'exit' || type == 'start';
        }

        // Algorithm

        var Renderer = function(){
        };

        Renderer.prototype.types = {
            '0': 'path',
            '1': 'wall',
            '2': 'start',
            '3': 'exit'
        };

        Renderer.prototype.render = function( grid ){
            var graph = new Graph();
            var initial, goal;

            var rowCount = 0;
            var colCount = 0;
            var posTracker = [new Array()]; //array of arrays

            for( var i = 0; i < grid.length; i++ ){
                var char = grid.charAt( i );

                // Detecta nova linha
                if(char === newline){
                    rowCount += 1;
                    colCount = 0;
                    posTracker.push( new Array() );

                    continue;
                }

                var type = this.types[char];

                // Cria e guarda objeto no array e no grafo
                var isGoal = (type == 'exit');
                var newObject = {
                    type: type,
                    row: rowCount,
                    col: colCount,
                    isGoal: isGoal
                };

                posTracker[rowCount].push( newObject );

                // Não inserir nada pra quem não for caminhável
                if( isWalkable( type )){
                    graph.insertVertex( newObject );


                    // Detecta ponto de início
                    if( type == 'start' ){
                        initial = newObject;
                    }

                    if( type == 'exit' ){
                        goal = newObject;
                    }

                    // Insere arestas no grafo
                    var initRow = ( rowCount == 0 ? 0 : rowCount - 1 );
                    var initCol = ( colCount == 0 ? 0 : colCount - 1 );
                    for( var row = initRow; row <= rowCount; row++){
                        for( var col = initCol ; col <= colCount + 1; col++){

                            if( isValidPosition( row, col, posTracker ) ){

                                var neighboor = posTracker[row][col];
                                if( isWalkable( neighboor.type ) && neighboor != newObject ){
                                    graph.insertEdge( newObject, neighboor );
                                }

                            }

                        }
                    }
                }

                colCount ++;
            }

            return {
                graph: graph,
                initial: initial,
                goal: goal,
                array: posTracker
            };
        };

    return new Renderer();
    /*
1111
1201
1101
1131
    */
});
