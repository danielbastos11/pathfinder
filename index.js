head.load(
	[
		'lib/require.js'
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

			],
			function( GraphHandler ){

			}
		);
	}
);
