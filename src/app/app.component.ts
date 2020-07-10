import {Component, OnInit} from '@angular/core';
import {AppSettings} from './app.settings';
import {Settings} from './app.settings.model';
import {Subject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {locale as navigationEnglish} from './navigation/i18n/en';
import {locale as navigationRussian} from './navigation/i18n/ru';
import {locale as navigationKazakh} from './navigation/i18n/kz';
import {FuseTranslationLoaderService} from './navigation/translation-loader.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'app';

    navigation: any;
    public settings: Settings;

    private _unsubscribeAll: Subject<any>;

    selectedLanguage: any;

    languages = [
        {
            id: 'kz',
            title: 'Kazakh',
            flag: 'kz'
        },
        {
            id: 'ru',
            title: 'Russian',
            flag: 'ru'
        },
        {
            id: 'en',
            title: 'English',
            flag: 'us'
        },
    ];

    constructor(public appSettings: AppSettings,
                private _translateService: TranslateService,
                // private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    ) {
        this.settings = this.appSettings.settings;
        // Add languages
        this._translateService.addLangs(['en', 'kz', 'ru']);

        // Set the default language
        this._translateService.setDefaultLang('en');

        // Use a language
        this._translateService.use('en');

        // setTimeout(() => {
        //     this._translateService.use('ru');
        // });

        // Set the navigation translations
        // this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationRussian, navigationKazakh);
        this._translateService.setTranslation(navigationKazakh.lang, navigationKazakh.data, true);
        this._translateService.setTranslation(navigationEnglish.lang, navigationEnglish.data, true);
        this._translateService.setTranslation(navigationRussian.lang, navigationRussian.data, true);

        // Set the private defaults
        // this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {

    }
}
