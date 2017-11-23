const Measurements = require('./Measurements');

class Cursor {
    constructor(editor) {
        this.editor = editor;

        this.row = 0;
        this.col = 0;

        this.xPixels = 0;
        this.yPixels = 0;

        this.element = document.getElementById('cursor');
    }

    /**
     * Sets the cursor on the screen
     * @param {double} x coord in pixels
     * @param {double} y coord in pixels
     */
    setPixels(x, y) {
        this.xPixels = x;
        this.yPixels = y;

        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
        this.element.style.position = 'absolute';
    }

    updateCursor() {
        const startPos = this.inputPositionColRow(this.editor.getInputCursorPos().start);
        const cursorCoordinates = this.inputPositionToPixels(startPos.col, startPos.row);
        this.setPixels(cursorCoordinates.x, cursorCoordinates.y);
    }

    inputPositionColRow(pos) {
        const lines = this.editor.input.value.split('\n');
        let position = pos;

        for (let index = 0; index < lines.length; index += 1) {
            const element = lines[index];

            if (element.length < position) {
                position -= element.length;
                position -= 1;
                continue;
            } else {
                return {
                    col: position,
                    row: index,
                };
            }
        }

        return {
            col: 0,
            row: 0,
        };
    }

    inputPositionToPixels(col, row) {
        const lines = this.editor.input.value.split('\n');
        const w = Measurements.textWidth(lines[row].substring(0, col));
        return {
            x: 60 + w,
            y: row * 16,
        };
    }
}

module.exports = Cursor;
