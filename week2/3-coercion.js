const a = {
    num: 1,
    valueOf() {
        return ++this.num;
    }
}

if (a == 2 && a == 3) {
    console.log('How on earth did you get here?');
}
