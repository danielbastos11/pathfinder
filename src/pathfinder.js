define(
    [
        'lib/priorityQueue'
    ],
    function( PriorityQueue ){
        var comparator = function( obj1, obj2 ){
            return obj1.priority - obj2.priority;
        };

        // Cria Classe Singleton
        var PathFinder = {};

        var heuristic = function( origin, destination ){
            var x1 = origin.row;
            var y1 = origin.col;
            var x2 = destination.row;
            var y2 = destination.col;

            return Math.abs( x1 - x2 ) + Math.abs( y1 - y2 );
        }

        PathFinder.aStar = function( graph, initialSpot, goal ){
            // Seta as variáveis
            var frontier = new PriorityQueue( comparator );
            var originOf = {};
            var costTo = {};

            // Seta os valores pro ponto inicial
            originOf[initialSpot] = null;
            costTo[initialSpot] = 0;

            frontier.put({
                priority: 0,
                obj: initialSpot
            });

            // Algoritmo em si
            while( frontier.size() !== 0 ){
                var current = frontier.get().obj;
                if( current.isGoal ){
                    goal = current;
                    break;
                }

                var adjacents = graph.getAdjacentsOf( current );

                adjacents.forEach(function( next ){
                    var newCost = costTo[current] + graph.cost( current, next );

                    if( next != initialSpot &&
                        !costTo[next] || costTo[next] > newCost ){

                        costTo[next] = newCost;
                        originOf[next] = current;

                        var priority = newCost + heuristic( next, goal );
                        frontier.put({
                            priority: priority,
                            obj: next
                        });
                    }
                });
            }

            // Monta o caminho
            var path = [];
            var temp = goal;
            console.log( originOf );

            while( temp ){
                path.unshift( temp );
                temp = originOf[ temp ];
            }

            return path;
        };

        // Exporta a classe
        return PathFinder;
    }
)
