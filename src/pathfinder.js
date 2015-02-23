define(
    [

    ],
    function( PriorityQueue ){
        // Cria Classe Singleton
        var PathFinder = {};

        var heuristic = function( origin, destination ){
            var x1 = origin.row;
            var y1 = origin.col;
            var x2 = destination.row;
            var y2 = destination.col;

            return Math.abs( x1 - x2 ) + Math.abs( y1 - y2 );
        }

        PathFinder.aStar = function( graph, initialSpot ){
            // Seta as variáveis
            var frontier = new PriorityQueue();
            var originOf = {};
            var costTo = {};

            // Seta os valores pro ponto inicial
            originOf[initialSpot] = null;
            costTo[initialSpot] = 0;

            // Algoritmo em si
            while( frontier.size() === 0 ){
                var current = frontier.get();
                if( current.isGoal() ) break;

                var adjacents = graph.getAdjacentsOf( current );
                adjacents.forEach(function( next ){
                    var newCost = costTo[current] + graph.cost( current, next );

                    if( !costTo[next] || costTo[next] > newCost ){
                        costTo[next] = newCost;
                        originOf[next] = newCost;

                        var priority = newCost + heuristic( next, goal );
                        frontier.put( next, priority );
                    }
                });
            }

            // Monta o caminho
            var path = [];
            var temp = goal;

            while( temp !== null ){
                path.unshift( temp );
                temp = originOf[temp];
            }

            return path;
        };

        // Exporta a classe
        return PathFinder;
    }
)
