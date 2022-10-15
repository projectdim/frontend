//Тут піздєц))

const months = ["січень", "лютий", "березень", "квітень", "травень", "червень",
"липень", "серпень", "вересень", "жовтень", "листопад", "грудень"];

export function getDayDate(dateStr){
    try {
        let date = new Date(dateStr);
        if(isToday(date))
            return "сьогодні";
        else if(isYesterday(date))
            return "вчора"
        else {
            return `${months[date.getMonth()]} ${date.getDate()}`
        }
    }
    catch (err){
        return "Invalid date"
    }
}

export function getTime(dateStr){
    try{
        let date = new Date(dateStr);
        return `${date.getHours()}:${date.getMinutes()}`
    }
    catch (err){
        return "00:00";
    }
}

export function isToday(someDate){
    const today = new Date();
    return someDate.getDate() === today.getDate() &&
        someDate.getMonth() === today.getMonth() &&
        someDate.getFullYear() === today.getFullYear()
}

export function isYesterday(date) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() - 1);
    if (tomorrow.toDateString() === date.toDateString())
        return true;
    return false;
}

export function GetRandomElement(array){
    return array[getRndInteger(0, array.length - 1)];
}
export function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


export function GetStateColor(field, status){
    let red = 'red';
    let green = 'green';
    let a = {
        buildingCondition : {
            'Неушкоджена' : green,
            'Пошкоджена' : red,
            'Зруйнована' : red
        },
        electricity : {
            'Стабільна' : green,
            'Переривчаста' : red,
            'Відсутня' : red},
        carEntrance : {
            "Доступне" : green,
            "Недоступне" : red
        },
        water: {
            'Стабільна' : green,
            "Нестабільна" : red},
        fuelStation : {
            'Зачинено' : red,
            'Відчинено' : green},
        hospital : {
            'Зачинено' : red,
            'Відчинено' : green},
    }

    return a[field][status];
}


export function getTextColorClass(field, status){
    let color = GetStateColor(field,status);
    if(color === "red")
        return 'text-dangerous-red';
    else if(color === "green")
        return 'text-safety-green';
    else if(color === "yellow")
        return 'text-yellow-custom-400';
}
export function getSVGColorClass(field, status){
    let color = GetStateColor(field,status);
    if(color === "red")
        return 'fill-dangerous-red';
    else if(color === "green")
        return 'fill-safety-green';
    else if(color === "yellow")
        return 'fill-yellow-custom-400';
}
