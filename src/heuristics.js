define(
    [],
    function(){
        var Heuristics = {};

        Heuristics.aStar = function( origin, goal ){
            var result;

            goal.forEach(function( destination ){
                var colDif = Math.abs( origin.col - destination.col );
                var rowDif = Math.abs( origin.row - destination.row );
                var candidate =  colDif + rowDif;

                if( !result ){
                    result = candidate;
                }
                else {
                    result = Math.max( candidate, result );
                }
            });

            return result;
        };

        Heuristics.dijkstra = function(){
            return 1;
        };

        return Heuristics;
    }
)
