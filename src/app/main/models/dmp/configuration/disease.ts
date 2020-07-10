import {DiseaseData} from './disease-data';

export class Disease {
    constructor(
        public id?: string,
        public code?: string,
        public name?: any,
        public description?: any,
        public categoryId?: string,
        public links?: any,
        public template?: DiseaseData,
        public state?: any
    ) {}
}
