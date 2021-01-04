import React from "react";
import FrameList from "../frameList";
import FrameManager from "../../utils/frameManager";
import FramePreparer from "../../utils/framePreparer";
import "./index.css";

export default class FramePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            frames: null
        }
    }

    async componentDidMount() {
        const frameInfo = await FrameManager.getFrames();
        const frames = await FramePreparer.process(frameInfo);
        
        this.setState({
            loaded: true,
            frames
        });
    }

    render() {
        if (!this.state.loaded) {
            return <div className="frame-page__loading">Loading...</div>;
        }

        if (this.state.frames.length) {
            return <FrameList frames={this.state.frames}/>
        }

        return <span className="frame-page__empty-message">Page does not contan frames with params</span>;
    }
}