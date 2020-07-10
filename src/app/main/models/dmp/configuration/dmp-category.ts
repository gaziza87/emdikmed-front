import {DmpCategoryFilter} from './dmp-category-filter';

export class DmpCategory {
    constructor(
        public id?: string,
        public code?: string,
        public name?: any,
        public description?: any,
        public filter?: DmpCategoryFilter,
        public state?: any

    ) {}

}
