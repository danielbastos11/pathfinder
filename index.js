head.load(
	[
		'lib/require.js',
		'https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js'
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
					$('#go').click(function(){
						var input = $('#input').val();
						var maze = Renderer.render( input );
						var path = PathFinder.aStar( maze.graph, maze.initial);

						console.log( path );
					})
				})
			}
		);
	}
);
