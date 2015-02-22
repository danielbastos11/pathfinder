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
         * @param {Boolean} [isDirect=false] Tells whether the new graph is directed
         */
        var Graph = function( isDirected ){
            this.adjLists = {};

            this.isDirected = !!isDirected;
        };

        /**
         * Add a vertex to the graph
         *
         * @method insertVertex
         */
        Graph.prototype.insertVertex = function( vertex ){
            this.adjList[vertex] = new Array();

        /**
         * Add an edge to the graph
         *
         * @method insertEdge
         * @param {String} vertexI First vertex on the edge
         * @param {String} vertexF Second vertex on the edge
         */
        Graph.prototype.insertEdge = function( vertex1, vertex2 ){
            var vertex1List = this.adjLists[vertex1];
            var vertex2List = this.adjLists[vertex2];

            if( !vertex1List || !vertex2List ){
                throw new Error('Vertices have to have been added beforehand');
            }

            vertex1List.push( vertex2 );
        };

        /**
         * Remove an edge
         *
         * @method removeEdge
         * @param {String} vertexI First vertex on the edge
         * @param {String} vertexF Second vertex on the edge
         */
        Graph.prototype.removeEdge = function(vertex1, vertex2){
            var vertex1List = this.adjLists[vertex1];
            var vertex2List = this.adjLists[vertex2];

            if( !vertex1List || !vertex2List ){
                throw new Error('Vertices have to have been added beforehand');
            }

            var edgeIndex = vertex1List.indexOf( vertex2 );
            if( edgeIndex === -1 ){
                throw new Error('Edge has to have been added beforehand');
            } else {
                vertex1List.splice( edgeIndex, 1 );
            }
        };


        /**
         * List all the vertices of the graph
         * @method vertices
         * @return {Array} List of vertices on the graph
         */
        Graph.prototype.getVertices = function(){
            return _.keys( this.adjLists );
        };

        /**
         * List all the vertices adjacent to a given vertex
         * @method adjacencyList
         * @param {String} vertex Vertex to which the returned vertices are adjacent
         * @return {Array} List of vertices adjacent to vertex
         */
        Graph.prototype.adjacencyList = function( vertex ){
            var successors = this.getSuccessors( vertex );
            var predecessors = this.getPredecessors( vertex );

            return _.union( successors, predecessors );
        };

        /**
         * List all the predecessor of a given vertex
         * @method getPredecessors
         * @param {String} vertex Vertex of which the returned vertices are predecessors
         * @return {Array} List of vertices that are predecessors to vertex
         */
        Graph.prototype.getPredecessors = function( vertex ){
            var predecessors = [];

            // For each edge
            _.forOwn( this.adjLists, function( adjList, sourceVertex ){
                // If there's an edge pointing to the given vertex
                if( adjList.indexOf( vertex ) !== -1 ){
                    // Add the vertices to predecessors
                    predecessors.push( sourceVertex );
                }
            });

            return predecessors;
        };

        /**
         * List all the sucessors of a given vertex
         * @method getSuccessors
         * @param {String} vertex Vertex of which the returned vertices are successors
         * @return {Array} List of vertices that are successors to vertex
         */
        Graph.prototype.getSuccessors = function( vertex ){
            if( !this.adjLists[vertex] ){
                throw new Error('Vertex has to have been added beforehand');
            }

            return this.adjLists[vertex].slice( 0 );
        };

        // Export the Graph constructor
        return Graph;
});
