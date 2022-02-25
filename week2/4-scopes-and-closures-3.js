function countDown() {
    for (var i = 3; i >= 0; i--) {
        const foo = i;
        setTimeout(function () {
            console.log(foo || "Lift-off!");
        }, (3 - foo) * 1000);
    }
}

function countDownRec(time) {
    if (!time) return console.log("Lift-off!");

    console.log(time);

    setTimeout(() => countDownRec(time - 1), 1000);
}

countDown();
// countDownRec(5);
