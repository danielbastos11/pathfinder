define(
    [
        'src/graph',
        './node'
    ],
    function( Graph, Node ){
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
            var initial, goal = [];

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
                var newObject = new Node({
                    type: type,
                    row: rowCount,
                    col: colCount
                });

                posTracker[rowCount].push( newObject );

                // Não inserir nada pra quem não for caminhável
                if( isWalkable( type )){
                    graph.insertVertex( newObject );


                    // Detecta ponto de início
                    if( type == 'start' ){
                        initial = newObject;
                    }

                    if( type == 'exit' ){
                        goal.push( newObject );
                    }

                    // Insere arestas no grafo
                    var checkRow = rowCount,
                        checkCol = colCount - 1;

                    if( isValidPosition( checkRow, checkCol, posTracker ) ){
                        var neighboor = posTracker[checkRow][checkCol];
                        if( isWalkable( neighboor.type ) ){
                            graph.insertEdge( newObject, neighboor );
                        }
                    }

                    checkRow = rowCount - 1,
                    checkCol = colCount;

                    if( isValidPosition( checkRow, checkCol, posTracker ) ){
                        var neighboor = posTracker[checkRow][checkCol];
                        if( isWalkable( neighboor.type ) ){
                            graph.insertEdge( newObject, neighboor );
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

        Renderer.prototype.output = function( array, path ){
            var output = '';

            array.forEach(function(row){
                row.forEach(function(col){
                    var point;

                    switch( col.type ){
                        case 'path':
                            point = "0";
                            break;
                        case 'wall':
                            point = '1';
                            break;
                        case 'start':
                            point = '2';
                            break;
                        case 'exit':
                            point = '3';
                            break;
                    }

                    if( path.indexOf( col ) != -1 ){
                        var newPoint = "<span style='color: red'>";
                        newPoint += point;
                        newPoint += "</span>";

                        point = newPoint;
                    }

                    output += point;
                });

                output += '<br />';
            });

            return output;
        };

    return new Renderer();
    /*
1111
1201
1101
1131
    */
});
