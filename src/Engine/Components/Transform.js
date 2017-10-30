'use strict';

/**
 * A transform component
 */
class Transform extends Engine.Components.Component {
    /**
     * Defaults
     */
    defaults() {
        this.position = { x: 0, y: 0 };
        this.scale = { x: 1, y: 1 };
        this.rotation = 0;
    }

    /**
     * Adds one Transform to another
     *
     * @param {Transform} a
     * @param {Transform} b
     *
     * @returns {Transform} Result
     */
    static add(a, b) {
        let result = new Transform();

        result.position.x = a.position.x + b.position.x;
        result.position.y = a.position.y + b.position.y;
        
        result.scale.x = a.scale.x + b.scale.x;
        result.scale.y = a.scale.y + b.scale.y;
        
        result.rotation = a.rotation + b.rotation;

        return result;
    }
}

Engine.Components.Transform = Transform;