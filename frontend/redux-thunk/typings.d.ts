declare module '@ckeditor/ckeditor5-react' {
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    import Event from '@ckeditor/ckeditor5-utils/src/eventinfo'
    import { EditorConfig } from '@ckeditor/ckeditor5-core/src/editor/editorconfig'
    import * as React from 'react';
    const CKEditor: React.FunctionComponent<{
        disabled?: boolean;
        editor: typeof ClassicEditor;
        name: string;
        data?: string;
        id?: string;
        config?: any;
        onReady?: (editor: ClassicEditor) => void;
        onChange?: (event: Event, editor: ClassicEditor) => void;
        onBlur?: (event: Event, editor: ClassicEditor) => void;
        onFocus?: (event: Event, editor: ClassicEditor) => void;
        onError?: (event: Event, editor: ClassicEditor) => void;
    }>
    export { CKEditor };
}

declare module '@ckeditor/ckeditor5-build-classic' {
    const ClassicEditor: any;
    export = ClassicEditor;
}

declare module 'js-cookie' {
    const Cookies: any;
    export = Cookies
}

declare module '@material-ui/lab/TabPanel' {
    const TabPanel: React.FunctionComponent<{
        value: string,
        index: number,
        children?: string,
    }>
    export = TabPanel;
}

