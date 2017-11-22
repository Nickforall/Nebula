const Measurements = require('./Measurements');

class Editor {
    constructor(element) {
        this.element = element;

        // create our input
        this.input = document.createElement('textarea');

        // add necessary attributes
        // this.input.setAttribute('hidden', '');
        this.input.setAttribute('id', 'editorInput');

        // append to body
        this.element.appendChild(this.input);

        // focus on the element
        this.input.focus();

        // handle all events to our input in this class, since it's essentially our editor without
        // fanciness
        this.input.addEventListener('input', this.handleEvent.bind(this));
        this.input.addEventListener('keydown', this.handleKeyDown.bind(this));
        this.input.addEventListener('blur', (ev) => {
            // prevent unfocussing our input;
            ev.stopImmediatePropagation();
            ev.preventDefault();

            this.input.focus();
        });

        this.lines = [];

        this.timer = Date.now();

        this.loadFile();

        this.updateCursor();
    }

    updateCursor() {
        const startPos = this.inputPositionToPixels(this.getInputCursorPos().start);
        this.setCursor(startPos.x, startPos.y);
    }

    handleEvent() {
        this.timer = Date.now();

        const value = this.input.value;
        this.lines = value.split('\n');

        this.updateCursor();
        this.draw();
    }

    handleKeyDown() {
        // in here we handle possible cursor movements on keydown
        this.updateCursor();
    }

    /**
     * Sets the cursor on the screen
     * @param {double} x coord in pixels
     * @param {double} y coord in pixels
     */
    setCursor(x, y) {
        this.cursor = [x, y];

        const cursorElement = document.getElementById('cursor');
        cursorElement.style.left = `${x}px`;
        cursorElement.style.top = `${y}px`;
        cursorElement.style.position = 'absolute';
    }

    loadFile(path) {
        this.timer = Date.now();
        this.input.value = 'Hello, world \nWe welcome you today to look at this amazing piece of code. \nHowudoin';
        this.handleEvent();
    }

    draw() {
        this.clearLines();

        for (let index = 0; index < this.lines.length; index += 1) {
            const lineText = this.lines[index];
            this.drawLine(index, lineText, this.lines.length);
        }

        console.debug('Input lag: ', Date.now() - this.timer);
    }

    drawLine(numberInt, text, total) {
        // create line element
        const line = document.createElement('div');

        // add line number to line
        const number = document.createElement('span');
        number.setAttribute('class', 'number');
        number.appendChild(document.createTextNode(numberInt + 1));
        // append number to line
        line.appendChild(number);

        // add line text to line
        line.setAttribute('class', 'line');
        line.appendChild(document.createTextNode(text));
        this.element.appendChild(line);
    }

    clearLines() {
        const params = document.getElementsByClassName('line');

        while (params[0]) {
            params[0].parentNode.removeChild(params[0]);
        }
    }

    // https://stackoverflow.com/questions/7745867/how-do-you-get-the-cursor-position-in-a-textarea
    getInputCursorPos() {
        if ('selectionStart' in this.input && document.activeElement === this.input) {
            return {
                start: this.input.selectionStart,
                end: this.input.selectionEnd,
            };
        } else if (this.input.createTextRange) {
            const sel = document.selection.createRange();
            if (sel.parentElement() === this.input) {
                const rng = this.input.createTextRange();
                rng.moveToBookmark(sel.getBookmark());
                let len;
                for (len = 0;
                         rng.compareEndPoints('EndToStart', rng) > 0;
                         rng.moveEnd('character', -1)) {
                    len += 1;
                }
                rng.setEndPoint('StartToStart', this.input.createTextRange());
                let pos;
                for (pos = { start: 0, end: len };
                         rng.compareEndPoints('EndToStart', rng) > 0;
                         rng.moveEnd('character', -1)) {
                    pos.start += 1;
                    pos.end += 1;
                }
                return pos;
            }
        }
        return -1;
    }

    inputPositionToPixels(pos) {
        const lines = this.input.value.split('\n');
        let position = pos;

        for (let index = 0; index < lines.length; index += 1) {
            const element = lines[index];

            if (element.length < position) {
                position -= element.length;
                position -= 1;
                continue;
            } else {
                const w = Measurements.textWidth(element.substring(0, position));
                return {
                    x: 60 + w,
                    y: index * 16,
                };
            }
        }

        return {
            x: 60,
            y: 0,
        };
    }
}

module.exports = Editor;
