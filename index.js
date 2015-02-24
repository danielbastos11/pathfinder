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
						var path = PathFinder.aStar( maze.graph, maze.initial, maze.goal);


						var output = '';

						maze.array.forEach(function(row){
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

						$('#output').append( output );

					})
				})
			}
		);
	}
);
