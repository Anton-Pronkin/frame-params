$(document).ready(async function() {

    const checkboxes = {
        paramsHighlighting: $(".option-panel__checkbox-option--params-highlighting .checkbox__input")
    }

    $(".option-panel__save-button").click(async function () {
        await saveOptions();
        close();
    });

    await loadOptions();


    async function saveOptions() {
        await setValue(checkboxes.paramsHighlighting, OptionManager.setParamsHighlightingOption);
    }

    async function loadOptions() {
        await setCheckbox(checkboxes.paramsHighlighting, OptionManager.getParamsHighlightingOption);
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


