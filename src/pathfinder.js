define(
    [

    ],
    function( PriorityQueue ){
        // Cria Classe Singleton
        var PathFinder = {};

        var heuristic = function( origin, destination ){
            return 0; // So far
        }

        PathFinder.aStar = function( graph, initialSpot, goal ){
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
                if( current === goal ) break;

                var successors = graph.successors( current );
                successors.forEach(function( next ){
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
