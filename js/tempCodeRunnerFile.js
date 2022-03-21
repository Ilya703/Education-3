class one {
    constructor (a) {
        this.a = a;
        this.calc = function() {
            console.log(a);
        };
    }

    sum() {
        console.log(1);
    }
}
const arr = new one(5);
console.log(arr);