export class Difficulties {
    easy: boolean;
    normal: boolean;
    hard: boolean;
    expert: boolean;
    expertPlus: boolean;

    constructor(easy: boolean, normal: boolean, hard: boolean, expert: boolean, expertPlus: boolean) {
        this.easy = easy;
        this.normal = normal;
        this.hard = hard;
        this.expert = expert;
        this.expertPlus = expertPlus;
    }

    get length(): number {
        let lenth = 0;
        if (this.easy === true) {
            lenth++;
        }
        if (this.normal === true) {
            lenth++;
        }
        if (this.hard === true) {
            lenth++;
        }
        if (this.expert === true) {
            lenth++;
        }
        if (this.expertPlus === true) {
            lenth++;
        }
        return lenth;
    }
}
