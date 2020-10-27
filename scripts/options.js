$(document).ready(async function() {

    const checkboxes = {
        paramsHighlighting: $(".option-panel__checkbox-option--params-highlighting .checkbox__input"),
        paramsSorting: $(".option-panel__checkbox-option--params-sorting .checkbox__input"),
        emptyFramesHiding: $(".option-panel__checkbox-option--empty-frames-hiding .checkbox__input"),
    }

    $(".option-panel__save-button").click(async function () {
        await saveOptions();
        close();
    });

    await loadOptions();


    async function saveOptions() {
        await setValue(checkboxes.paramsHighlighting, OptionManager.setParamsHighlightingOption);
        await setValue(checkboxes.paramsSorting, OptionManager.setParamsSortingOption);
        await setValue(checkboxes.emptyFramesHiding, OptionManager.setEmptyFramesHidingOption);
    }

    async function loadOptions() {
        await setCheckbox(checkboxes.paramsHighlighting, OptionManager.getParamsHighlightingOption);
        await setCheckbox(checkboxes.paramsSorting, OptionManager.getParamsSortingOption);
        await setCheckbox(checkboxes.emptyFramesHiding, OptionManager.getEmptyFramesHidingOption);
    }

    async function setValue(checkbox, setValue) {
        await setValue(checkbox.is(':checked'));
    }

    async function setCheckbox(checkbox, getValue) {
        if (await getValue()) {
            checkbox.attr('checked', 'checked');
        }
    }
});


