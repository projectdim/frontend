function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function GetRandomElement(array){
    return array[getRndInteger(0, array.length - 1)];
}