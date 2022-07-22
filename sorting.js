const selectionSort = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        let minimumIdx = i;

        for (let j = i; j < arr.length; j++) {
            if (arr[j] < arr[minimumIdx]) {
                minimumIdx = j;
            }
        }

        let temp = arr[i];
        arr[i] = arr[minimumIdx];
        arr[minimumIdx] = temp;
    }

    return arr;
};

const insertionSort = (arr) => {
    let resultArr = [arr.shift()];

    while (arr.length > 0) {
        resultArr.push(arr.shift());

        for (let i = resultArr.length - 1; i >= 0; i--) {
            if (resultArr[i] < resultArr[i - 1]) {
                const temp = resultArr[i];
                resultArr[i] = resultArr[i - 1];
                resultArr[i - 1] = temp;
            }
        }
    }

    return resultArr;
};

const mergeSort = (arr) => {
    if (arr.length === 1) return arr;

    const leftArr = mergeSort(arr.slice(0, arr.length / 2));
    const rightArr = mergeSort(arr.slice(arr.length / 2));

    const result = [];

    while (leftArr.length && rightArr.length) {
        if (leftArr[0] < rightArr[0]) {
            result.push(leftArr.shift());
        } else {
            result.push(rightArr.shift());
        }
    }

    while (leftArr.length) {
        result.push(leftArr.shift());
    }

    while (rightArr.length) {
        result.push(rightArr.shift());
    }

    return result;
};

const quickSort = (arr) => {
    if (!arr.length) return arr;

    const pivot = arr.shift();

    const leftArr = [];
    const rightArr = [];

    while (arr.length) {
        const curr = arr.shift();
        if (curr < pivot) {
            leftArr.push(curr);
        } else {
            rightArr.push(curr);
        }
    }

    return [...quickSort(leftArr), pivot, ...quickSort(rightArr)];
};

console.log(selectionSort([5, 4, 2, 3, 1]));
console.log(insertionSort([4, 5, 2, 3, 1]));
console.log(mergeSort([4, 2, 3, 5, 1]));
console.log(quickSort([4, 2, 3, 1, 5]));
