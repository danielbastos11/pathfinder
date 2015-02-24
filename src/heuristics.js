define(
    [],
    function(){
        var Heuristics = {};

        Heuristics.aStar = function( origin, goal ){
            var result;

            goal.forEach(function( destination ){
                var x1 = origin.row;
                var y1 = origin.col;
                var x2 = destination.row;
                var y2 = destination.col;

                var candidate =  Math.abs( x1 - x2 ) + Math.abs( y1 - y2 );

                if( !result ){
                    result = candidate;
                }
                else {
                    result = Math.min( candidate, result );
                }
            })

            return result;
        };

        Heuristics.dijkstra = function(){
            return 1;
        };

        return Heuristics;
    }
)
