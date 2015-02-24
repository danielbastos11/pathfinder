define(
    [
        './heap.js'
    ],
    function( Heap ){

        /**
        * Class for Priority Queue datastructure.
        *
        * @constructor
        * @extends {Heap<number, VALUE>}
        * @template VALUE
        * @final
        */
        PriorityQueue = function() {
            Heap.call(this);
        };

        PriorityQueue.prototype = Object.create( Heap.prototype );
        PriorityQueue.prototype.constructor = PriorityQueue;

        /**
        * Puts the specified value in the queue.
        * @param {number} priority The priority of the value. A smaller value here
        *     means a higher priority.
        * @param {VALUE} value The value.
        */
        PriorityQueue.prototype.put = function(priority, value) {
            this.insert(priority, value);
        };

        /**
        * Retrieves and removes the head of this queue.
        * @return {VALUE} The element at the head of this queue. Returns undefined if
        *     the queue is empty.
        */
        PriorityQueue.prototype.get = function() {
            return this.remove();
        };

        return PriorityQueue;
    }
);
