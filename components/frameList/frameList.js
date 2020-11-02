class FrameList extends ComponentList {
    constructor ({frames}) {
        super({
            name: "frame-list",
            items: frames.map(frame => new Frame({frame}))
        });
    }
}