'use strict';

/**
 * The player grid
 */
Game.Actors.PlayerGrid = class PlayerGrid extends Game.Actors.Grid {
    /**
     * Constructor
     */
    constructor(config) {
        super(config);
    
        // Build blank tiles
        for(let y = 0; y < this.size; y++) {
            for(let x = 0; x < this.size; x++) {
                let tile = new Game.Actors.FloorTile();
            
                tile.transform.position.x = (UNIT * 2) * (x - 1);
                tile.transform.position.y = (UNIT * 2) * (y - 1);

                tile.geometryRenderer.width = UNIT * 2
                tile.geometryRenderer.height = UNIT * 2
                
                tile.collider.width = UNIT * 2
                tile.collider.height = UNIT * 2
               
                tile.color = new Engine.Math.Color(0, 0, 0);

                this.addChild(tile);
            }
        }

        // Place grid
        this.transform.position.x = Engine.Graphics.screenWidth / 2;
        this.transform.position.y = Engine.Graphics.screenHeight - UNIT * 6.5;

        // Pointer events 
        Engine.Input.on('pointerup', [0, 1], (e) => {
            if(!this.draggingTile) { return; }

            this.onReleasingTile(e, this.draggingTile);
        });
        
        Engine.Input.on('pointermove', [0, 1], (e) => {
            if(!this.draggingTile) { return; }

            this.onDraggingTile(e, this.draggingTile);
        });
    }

    /**
     * Event: A tile is being dragged
     *
     * @param {InputEvent} e
     * @param {ColorTile} queueTile
     */
    onDraggingTile(e, queueTile) {
        queueTile.transform.translate(Engine.Input.pointerDelta.x, Engine.Input.pointerDelta.y);

        let x = e.pageX;
        let y = e.pageY;

        if(e.changedTouches && e.changedTouches.length > 0) {
            x = e.changedTouches[0].pageX;
            y = e.changedTouches[0].pageY;
        }
        
        // Highlight hovered tile
        for(let i = 0; i < this.children.length; i++) {
            this.children[i].setHighlight(this.children[i].collider.getBounds().contains(x, y));
        }
        
        // Check if tile is hovering the void
        queueTile.setTransparent(y > Engine.Stage.getActor(Game.Actors.Queue).getGlobalTransform().position.y + UNIT);
    }

    /**
     * Event: A tile is being released
     *
     * @param {ColorTile} queueTile
     */
    onReleasingTile(e, queueTile) {
        let x = e.pageX;
        let y = e.pageY;

        if(e.changedTouches && e.changedTouches.length > 0) {
            x = e.changedTouches[0].pageX;
            y = e.changedTouches[0].pageY;
        }

        // Find hovered tile, if any
        for(let i = 0; i < this.children.length; i++) {
            if(this.children[i].collider.getBounds().contains(x, y)) {
                this.onDropTile(this.draggingTile, i);
            }
        }

        // Check if tile is hovering the void
        if(y > Engine.Stage.getActor(Game.Actors.Queue).getGlobalTransform().position.y + UNIT) {
            this.draggingTile.destroy();
        }

        this.draggingTile = null;

        Engine.Stage.getActor(Game.Actors.Queue).updateTiles();
    }

    /**
     * Event: A tile was dropped onto the grid
     *
     * @param {ColorTile} queueTile
     * @param {Number} tileIndex
     */
    onDropTile(queueTile, tileIndex) { 
        // Trigger on picked event
        queueTile.onPicked(this, tileIndex);

        // Compare to the target colour
        let targetGrid = Engine.Stage.getActor(Game.Actors.TargetGrid);

        let targetTile = targetGrid.children[tileIndex];
        let currentTile = this.children[tileIndex];

        currentTile.setHighlight(false);

        let isCorrect = currentTile.color.equals(targetTile.color);

        let isIncorrect =
            currentTile.color.r > targetTile.color.r || 
            currentTile.color.g > targetTile.color.g || 
            currentTile.color.b > targetTile.color.b;

        if(isIncorrect) {
            currentTile.setCorrect(false);
        } else if(isCorrect) {
            currentTile.setCorrect(true);
        } else {
            currentTile.setCorrect(undefined);
        }

        // Check if won
        this.checkIfWon();

        // Remove queue tile
        queueTile.destroy();
    }

    /**
     * Checks if the level is won
     */
    checkIfWon() {
        let targetGrid = Engine.Stage.getActor(Game.Actors.TargetGrid);
        let correctTiles = 0;

        for(let i in this.children) {
            let currentTile = this.children[i];
            let targetTile = targetGrid.children[i];
        
            if(targetTile.color.equals(currentTile.color)) {
                correctTiles++;
            }
        }

        if(correctTiles >= this.children.length) {
            let currentScene = parseInt(Engine.Stage.scene.name.match(/\d+/));
        
            currentScene++;

            Engine.Stage.loadScene('Scene' + currentScene);
        }
    }

    /**
     * Defaults
     */
    defaults() {
        super.defaults();

        this.size = 3;
    }
}