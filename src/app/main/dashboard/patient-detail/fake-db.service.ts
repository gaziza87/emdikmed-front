import {Injectable} from '@angular/core';

export interface Element {
    name: string;
    position: string;
    weight: number;
    symbol: string;
    button: string;
}

export interface Elements {
    name: string;
    position: string;
    weight: number;
    symbol: string;
}

export const Analytics = [
    {
        name: 'Company 1',
        series: [
            {
                name: '2010',
                value: 31632
            },
            {
                name: '2011',
                value: 42589
            },
            {
                name: '2012',
                value: 52458
            },
            {
                name: '2013',
                value: 69632
            },
            {
                name: '2014',
                value: 52305
            },
            {
                name: '2015',
                value: 72412
            },
            {
                name: '2016',
                value: 66285
            },
            {
                name: '2017',
                value: 49855
            }
        ]
    },
    {
        name: 'Company 2',
        series: [
            {
                name: '2010',
                value: 61632
            },
            {
                name: '2011',
                value: 68589
            },
            {
                name: '2012',
                value: 55458
            },
            {
                name: '2013',
                value: 62632
            },
            {
                name: '2014',
                value: 38305
            },
            {
                name: '2015',
                value: 41412
            },
            {
                name: '2016',
                value: 32285
            },
            {
                name: '2017',
                value: 31855
            }
        ]
    },
    {
        name: 'Company 3',
        series: [
            {
                name: '2010',
                value: 55632
            },
            {
                name: '2011',
                value: 63589
            },
            {
                name: '2012',
                value: 70458
            },
            {
                name: '2013',
                value: 79632
            },
            {
                name: '2014',
                value: 59305
            },
            {
                name: '2015',
                value: 56412
            },
            {
                name: '2016',
                value: 49285
            },
            {
                name: '2017',
                value: 38855
            }
        ]
    }
];

const data: Element[] = [
    {position: 'Пульс', name: '55', weight: 6090, symbol: 'H', button: 'Button'},
    {position: 'Шаг', name: '66', weight: 5060, symbol: 'H', button: 'Button'},
    {position: 'Сон', name: '77', weight: 7080, symbol: 'H', button: 'Button'},
    {position: 'Оксигинация крови', name: '98', weight: 9080, symbol: 'H', button: 'Button'},
    {position: 'Жигиемые колорий', name: '23', weight: 1056, symbol: 'H', button: 'Button'},
];



const data1: Elements[] = [
    {position: 'Пульс', name: '55', weight: 6090, symbol: 'H'},
    {position: 'Шаг', name: '66', weight: 5060, symbol: 'H'},
    {position: 'Сон', name: '77', weight: 7080, symbol: 'H'},
    {position: 'Оксигинация крови', name: '98', weight: 9080, symbol: 'H'},
    {position: 'Жигиемые колорий', name: '23', weight: 1056, symbol: 'H'},
];

@Injectable({
    providedIn: 'root'
})
export class FakeDbService {

    constructor() {
    }

    getData() {
        return data;
    }
}
