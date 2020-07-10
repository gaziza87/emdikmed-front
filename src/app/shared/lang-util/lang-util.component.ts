import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-lang-util',
    templateUrl: './lang-util.component.html',
    styleUrls: ['./lang-util.component.scss'
    ],
    // encapsulation: ViewEncapsulation.None
})
export class LangUtilComponent implements OnInit, OnChanges {
    public Editor = ClassicEditor;

    // Editor
    res: string;
    text: string;
    outputRes: any;
    outputRes1: any;
    tool = true;

    @Input() isEditor: boolean;
    @Input() isTextArea: boolean;
    @Input() isCkEditor: boolean;
    @Input() source: any;
    @Input() label: string;
    @Output() output = new EventEmitter<any>();
    langList: any = [];

    selectedLang: any;
    config = {
        language: 'ru',
        toolbar: ['heading', '|', 'bold', 'italic', 'link', '|', 'bulletedList', 'numberedList', '|', 'blockQuote', 'insertTable', 'undo', 'redo']
    };

    constructor( ) {
    }

    ngOnInit(): void {
        this.outputRes1 = {};
        this.langList = [{
            name: 'ru',
            code: 'ru',
            displayNameRu: 'Русский',
            displayNameEn: 'Russian',
            displayNameKz: 'Орысша'
        },
            {
                name: 'kz',
                code: 'kz',
                displayNameRu: 'Казахский',
                displayNameEn: 'Kazakh',
                displayNameKz: 'Қазақша'
            },
            {
                name: 'eng',
                code: 'en',
                displayNameRu: 'Английский',
                displayNameEn: 'English',
                displayNameKz: 'Ағылшынша'
            }];

        this.selectedLang = this.langList[0];


        const lan = this.selectedLang;



        this.tool = true;

        // this.getChoice();
        if (this.source === undefined || this.source === null || this.source.length === 0) {
            this.source = {};
            this.langList.forEach(lang => {
                this.source[lang.code] = '';
            });

        }
        if (this.isEditor) {
            this.text = this.process(this.source[lan]);
            this.outputRes1 = this.source;
    }   }

    ngOnChanges(changes: SimpleChanges): void {
        const lan = this.selectedLang;
        if (changes.source && this.source !== undefined ) {
            this.source[lan] = changes.source.currentValue[lan];
            // this.res = this.source[lang.code];

            // this.source[this.selectedLang.code] = changes['source'].currentValue;
            if (this.source === undefined || this.source === null) {
                this.source = [];
                this.langList.forEach(lang => {
                    this.source[lang.code] = '';

                });
            }
        }
    }

    // getChoice(): void {
    //     this._service.getChoice('langList').subscribe(response => {
    //         this.langList = response.values;
    //         this.selectedLang = this.langList[0];
    //         if (!this.source || this.source === undefined) {
    //             this.source = [];
    //             this.langList.forEach(lang => {
    //                 this.source[lang.code] = '';
    //             });
    //         }
    //     }, err => {
    //         console.error(err);
    //     });
    // }

    getName(val, lan: string): any {
        // this.selectedLang = lan[0];
        if (lan[0] === 'ru') {
            return val.displayNameRu;
        } else if (lan[0] === 'en') {
            return val.displayNameEn;
        } else if (lan[0] === 'kz') {
            return val.displayNameKz;
        }
    }

    catchValue(): void {
        this.output.emit(this.source);
    }

    // catchValue2(value): void {
    //     this.source[this.selectedLang.code] = value;
    //     console.log(this.selectedLang.code);
    //     console.log(this.source);
    //     this.output.emit(this.source);
    // }


    // Editor

    onContentChanged({quill, html, text}, code?): void {
        this.text = this.process(html);

        this.outputRes = this.text;
        // this.source[code] = this.outputRes;

        // this.outputRes1[code] = this.outputRes;


        this.output.emit(this.source);

    }
    textChange(code): void {
        this.outputRes1[code] = this.text;

    }

    process(str): string {

        const div = document.createElement('div');
        if (str !== null && str !== undefined) {
            div.innerHTML = str.trim();

        }
        return this.format(div, 0).innerHTML;
    }

    format(node, level): any {

        const indentBefore = new Array(level++ + 1).join('  '),
            indentAfter = new Array(level - 1).join('  ');
        // textNode;

        for (let i = 0; i < node.children.length; i++) {

            let textNode = document.createTextNode('\n' + indentBefore);
            node.insertBefore(textNode, node.children[i]);

            this.format(node.children[i], level);

            if (node.lastElementChild === node.children[i]) {
                textNode = document.createTextNode('\n' + indentAfter);
                node.appendChild(textNode);
            }
        }

        return node;
    }

    showAce(): void {
        this.tool = false;
    }

    showTool(code?): void {
        // this
        // this.outputRes1[code] = this.text;
        this.tool = true;

    }

    save(code): any {
        // this.text = this.process(this.res);


        this.outputRes = this.text;
        this.source[code] = this.outputRes;
        this.output.emit(this.source);
    }

    // @Output() outputResult = new EventEmitter<any>();


}
