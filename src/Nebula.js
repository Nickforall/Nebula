class Nebula {
    constructor() {
        this.configuration = {};
        this.loaded = false;
    }

    setEditor(editor) {
        this.editor = editor;
    }

    setLoaded(boolean) {
        this.loaded = boolean;
    }
}

module.exports = Nebula;
