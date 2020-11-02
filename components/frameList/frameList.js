class FrameList extends ComponentBase {
    #frames;

    constructor ({frames}) {
        super({
            name: "frame-list"
        });

        this.#frames = frames;
    }

    renderComponent() {
        return this.#renderFrames();
    }

    #renderFrames() {
        let frames = "";
        for (const frame of this.#frames) {
            frames += this.#renderFrame(frame);
        }

        return frames;
    }

    #renderFrame(frame) {
        return new Frame({frame}).render();
    }
}