export default class DragAndDrop {

    initialized: false;

    constructor(textAreaObj, uploadButton) {

        if (this.initialized) return;

        this.textAreaObj = textAreaObj;
        this.uploadButton = uploadButton;


        this.textarea = $(this.textAreaObj.element).find('textarea').first();

        $(this.textarea).on('dragover', this.in.bind(this));

        $(this.textarea).on('dragleave', this.out.bind(this));
        $(this.textarea).on('dragend', this.out.bind(this));

        $(this.textarea).on('drop', this.dropping.bind(this));

        this.initialized = true;
    }

    in(e) {
        if (!$(this.textarea).hasClass('flagrow-upload-dragging')) {
            $(this.textarea).toggleClass('flagrow-upload-dragging', true);
        }
    }

    out(e) {
        if ($(this.textarea).hasClass('flagrow-upload-dragging')) {
            $(this.textarea).toggleClass('flagrow-upload-dragging', false);
        }
    }

    dropping(e) {
        if (!$(this.textarea).hasClass('flagrow-dropping')) {
            e.preventDefault();

            console.log(e);
            console.trace();

            $(this.textarea).addClass('flagrow-dropping');

            m.redraw();

            this.uploadButton.uploadFiles(e.originalEvent.dataTransfer.files)
                .then(() => {
                    $(this.textarea).removeClass('flagrow-dropping');
                });
        }

    }
}
