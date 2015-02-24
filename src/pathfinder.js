define(
    [
        'lib/priorityQueue',
        'src/heuristics'
    ],
    function( PriorityQueue, Heuristics ){
        var comparator = function( obj1, obj2 ){
            return obj1.priority - obj2.priority;
        };

        // Cria Classe Singleton
        var PathFinder = {};

        PathFinder.aStar = function( graph, initialSpot, goals ){
            return find( graph, initialSpot, goals, Heuristics.aStar );
        };

        PathFinder.dijkstra = function( graph, initialSpot, goals ){
            return find( graph, initialSpot, goals, Heuristics.dijkstra );
        }

        function find( graph, initialSpot, goals, heuristic ){

                // Seta as variáveis
                var frontier = new PriorityQueue( comparator );
                var originOf = {};
                var costTo = {};
                var final;

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
                    if( goals.indexOf( current ) !== -1 ){
                        final = current;
                        break;
                    }

                    var adjacents = graph.getAdjacentsOf( current );

                    adjacents.forEach(function( next ){
                        var newCost = costTo[current] + graph.cost( current, next );

                        if( next != initialSpot &&
                            !costTo[next] || costTo[next] > newCost ){

                            costTo[next] = newCost;
                            originOf[next] = current;

                            var priority = newCost + heuristic( next, goals );
                            frontier.put({
                                priority: priority,
                                obj: next
                            });
                        }
                    });
                }

                // Monta o caminho
                var path = [];
                var temp = final;

                while( temp ){
                    path.unshift( temp );
                    temp = originOf[ temp ];
                }

                return path;
        }

        // Exporta a classe
        return PathFinder;
    }
)
