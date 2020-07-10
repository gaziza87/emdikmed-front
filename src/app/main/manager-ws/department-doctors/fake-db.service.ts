import {Injectable} from '@angular/core';

export interface Element {
    name: string;
    position: string;
    department: string;
    time: string;
    cabinet: string;

}

const data: Element[] = [
    {position: 'Кордиолог', name: 'Алихан Махмед', department: 'asd', time: '9:00-18:00', cabinet: '106'},
    {position: 'Шаг', name: 'Темірлан Хамидулин', department: 'dsa', time: '9:00-18:00', cabinet: '208'},
    {position: 'Сон', name: 'Алмас Шарман', department: 'qwe', time: '9:00-20:00', cabinet: '700'},
    {position: 'Оксигинация крови', name: 'Арман Оспанов', department: 'ewq', time: '9:00-16:00', cabinet: '101'},
    {position: 'Жигиемые колорий', name: 'Қарақат Жақсылықов', department: 'zxc', time: '9:00-15:00', cabinet: '605'},
];


@Injectable({
    providedIn: 'root'
})
export class FakeDbService {

    constructor() {
    }

    static getData() {
        return data;
    }
}
