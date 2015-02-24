/*
 * Graph representation using Adjacency Matrixes
 *
 * Constraints:
 * 		- Every vertice has to be an String. Store content in your own dictionary if needed
 *
 * Created by Daniel Bastos
 * IFRN - 2015
 */

define(
	[
		'lib/lodash'
	],
	function( _ ){
		/**
		 * Graph
		 *
		 * @class Graph
		 * @constructor
		 *
		 * @param {Boolean} [isDirected=false] Tells whether the new graph is directed
		 */
		var Graph = function( isDirected ){
			this.vertices		 = [];
			this.adjacencyMatrix = [];

			this.isDirected = isDirected || false;
		};

		/**
		 * Add a vertex to the graph
		 *
		 * @method insertVertex
		 * @param vertex
		 */
		Graph.prototype.insertVertex = function( vertex ){
            var that = this;

            that.vertices.push( vertex );
            that.adjacencyMatrix.push( [] );

            var fixColumnSize = function( element ){
                while( element.length != that.vertices.length ){
                    element.push( 0 );
                }
            };

			this.adjacencyMatrix.forEach( fixColumnSize );
		};

		/**
		 * Add an edge to the graph
		 *
		 * @method insertEdge
		 * @param {String} vertexI First vertex on the edge
		 * @param {String} vertexF Second vertex on the edge
		 */
		Graph.prototype.insertEdge = function( vertex1, vertex2 ){
			// Find indexes
			var vertex1Index = this.vertices.indexOf( vertex1 );
			var vertex2Index = this.vertices.indexOf( vertex2 );

			// Check for errors
			if( vertex1Index === -1 || vertex2Index === -1 ){
				throw new Error('Vertex not existent');
			}

			// Perform insertion
			this.adjacencyMatrix[vertex1Index][vertex2Index]++;
			console.log( vertex1Index +  '/' + vertex2Index);
			if( !this.isDirected ){
				this.adjacencyMatrix[vertex2Index][vertex1Index]++;
			}
		};

		/**
		 * List all the vertices of the graph
		 * @method vertices
		 * @return {Array} List of vertices on the graph
		 */
		Graph.prototype.getVertices = function(){
			// Returns a shallow copy of this.vertices
			return this.vertices.slice( 0 );
		};

		/**
		 * List all the vertices adjacent to a given vertex
		 *
		 * @method adjacencyList
		 * @param {String} vertex Vertex to which the returned vertices are adjacent
		 * @return {Array} List of vertices adjacent to vertex
		 */
		Graph.prototype.getAdjacentsOf = function( vertex ){
			var vertexIndex = this.vertices.indexOf( vertex );

            if( vertexIndex === -1 )
            {
                throw new Error('Vertex not existent');
            }

            return this.adjacencyMatrix[vertexIndex].filter(function(element){
				return ( element > 0 );
			});
		}

		/**
		 * Returns the cost of the edge between two verices,
		 * which is always 1 for this graph.
		 *
		 * @method cost
		 * @param {Object} vertex1
		 * @param {Object} vertex2
		 * @return {Number} The cost from vertex1 to vertex2
		 */
        Graph.prototype.cost = function( vertex1, vertex2 ){
            return 1;
        }

		return Graph;
});
