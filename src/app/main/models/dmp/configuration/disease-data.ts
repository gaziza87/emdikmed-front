export class DiseaseData {

    constructor(
        public subDannie?: string,
        public anamBol?: string,
        public anamZhiz?: string,
        public objDannie?: string,
        public labAnalys?: any[],
        public labAnalysText?: string,
        public diagMethods?: any[],
        public diagMethodsText?: string,
        public diagZakl?: string,
        public lekNazn?: string[],
        public lekNaznText?: string,
        public procAndInter?: string[],
        public procAndInterText?: string,
        public vrachRec?: string,
        public sovNomadiet?: string,
        public infoMat?: string,
        public note?: string
    ) {

    }
}
