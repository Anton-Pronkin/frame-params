let render = async () => {
    const frameInfo = await FrameManager.getFrames();
    const frames = await FramePreparer.process(frameInfo);

    const controller = new ComponentsController({
        root: document.getElementById("popup-content"),
        mainComponent: new FramePage({frames})
    });

    controller.renderComponents();
};

render();