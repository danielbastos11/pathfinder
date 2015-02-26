head.load(
	[
		'lib/require.js',
		'lib/jquery.js',
		'lib/flexibleArea.js'
	],
	function(){
		require.config({
			paths: {
				src: './src',
				lib: './lib'
			}
		});

		require(
			[
				'src/renderer.js',
				'src/pathfinder.js'
			],
			function( Renderer, PathFinder ){

				$(document).ready(function(){
					$('#input').flexible();

					$('#go').click(function(){
						var input = $('#input').val();
						var maze = Renderer.render( input );
						var path1 = PathFinder.aStar( maze.graph, maze.initial, maze.goal );
						var path2 = PathFinder.dijkstra( maze.graph, maze.initial, maze.goal );

						var astar	 = Renderer.output( maze.array, path1 );
						var dijkstra = Renderer.output( maze.array, path2 );

						$('#astar').html( astar );
						$('#dijkstra').html( dijkstra );

					})
				})
			}
		);
	}
);
