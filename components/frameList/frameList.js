class FrameList extends ComponentList {
    constructor ({frames}) {
        super({ 
            name: "frame-list"
        });

        this.items = frames.map(frame => new Frame({
            frame, 
            onClick: this.frameClick.bind(this)
        }));
    }

    frameClick(sender) {
        let currentFrame = sender;
        currentFrame.toggle();

        let otherFrames = this.items.filter(frame => frame != sender);
        otherFrames.forEach(frame => frame.collapse());
    }
}