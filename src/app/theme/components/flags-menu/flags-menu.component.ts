import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AppSettings} from '../../../app.settings';
import {Settings} from '../../../app.settings.model';
import {TranslateService} from '@ngx-translate/core';
import * as _ from 'lodash';

@Component({
    selector: 'app-flags-menu',
    templateUrl: './flags-menu.component.html',
    styleUrls: ['./flags-menu.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FlagsMenuComponent implements OnInit {

    public settings: Settings;
  selectedLanguage: any;

    constructor(public appSettings: AppSettings,
                private _translateService: TranslateService, ) {
        this.settings = this.appSettings.settings;
    }

  languages = [
    {
      id: 'kz',
      title: 'Қазақша',
      flag: 'kz',
      img: 'assets/img/flags/kz.svg'
    },
    {
      id: 'ru',
      title: 'Русский',
      flag: 'ru',
      img: 'assets/img/flags/ru.svg'
    },
    {
      id: 'en',
      title: 'English',
      flag: 'us',
      img: 'assets/img/flags/gb.svg'
    },
  ];



  ngOnInit(): void {

    this.selectedLanguage =  this.languages[0];
    this._translateService.use(this.languages[0].id);
    this._translateService.currentLang = this.languages[0].id;

    this._translateService.use(this.languages[1].id);
    this._translateService.currentLang = this.languages[1].id;

    this.selectedLanguage = _.find(this.languages, {id: this._translateService.currentLang});
    // Custom code by BEESET
  }

  setLanguage(lang): void {
    // Set the selected language for the toolbar
    this.selectedLanguage = lang;
    // console.log(this._translateService.getLangs());
    // console.log(lang);      // Use the selected language for translations
    this._translateService.use(lang.id);
    console.log(this._translateService.currentLang);
  }
}
