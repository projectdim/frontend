//Тут піздєц))

const months = ["січень", "лютий", "березень", "квітень", "травень", "червень",
"липень", "серпень", "вересень", "жовтень", "листопад", "грудень"];

export function getDayDateString(dateStr){
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

export function isSameDay(date1, date2){
    try {
        return date1.getDate() === date2.getDate() &&
          date1.getMonth() === date2.getMonth() &&
          date1.getFullYear() === date2.getFullYear()
    }
    catch (err){
        console.error("isSameDay func error")
        throw err;
        return false
    }
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
    let gray = 'gray';
    try {
        let a = {
            buildingCondition: {
                'Неушкоджена': green,
                'Пошкоджена': red,
                'Зруйнована': red,
                'Невідомо': gray
            },
            electricity: {
                'Стабільна': green,
                'Переривчаста': red,
                'Відсутня': red,
                'Невідомо': gray
            },
            carEntrance: {
                "Доступне": green,
                "Недоступне": red,
                'Невідомо': gray
            },
            water: {
                'Стабільна': green,
                "Нестабільна": red,
                'Невідомо': gray
            },
            fuelStation: {
                'Зачинено': red,
                'Відчинено': green,
                'Невідомо': gray
            },
            hospital: {
                'Зачинено': red,
                'Відчинено': green,
                'Невідомо': gray
            },
        }
        return a[field][status];
    }
    catch (err){
        console.error(`Поля ${field} зі статусом ${status} не знайдено`)
        return red;
    }
}
export function getTextColorClass(field, status){
    let color = GetStateColor(field,status);
    if(color === "red")
        return 'text-red-c-500';
    else if(color === "green")
        return 'text-green-c-500';
    else if(color === "yellow")
        return 'text-yellow-custom-400';
    else if(color === "gray")
        return 'text-gray-c-500';
    else
        return 'text-red-c-500';
}
export function getSVGColorClass(field, status){
    let color = GetStateColor(field,status);
    if(color === "red")
        return 'fill-red-c-500';
    else if(color === "green")
        return 'fill-green-c-500';
    else if(color === "yellow")
        return 'fill-yellow-custom-400';
    else if(color === "gray")
        return 'fill-gray-c-500';
    else
        return 'fill-red-c-500';
}
export async function Wait(milliseconds){
    await new Promise(res=> setTimeout(()=>{},
      milliseconds));
}

export const ReportsState = {
    buildingCondition : {
        Intact : 'Неушкоджена',
        Damaged : 'Пошкоджена',
        Destroyed : 'Зруйнована',
        NoData : 'Невідомо'
    },
    electricity : {
        Stable : 'Стабільна',
        Intermittent : 'Переривчаста',
        NoData : 'Невідомо'
    },
    carEntrance : {
        Accessible : "Доступне",
        Inaccessible : "Недоступне",
        NoData : 'Невідомо'
    },
    water: {
        Stable : 'Стабільна',
        Intermittent : "Нестабільна",
        NoData : 'Невідомо'
    },
    fuelStation : {
        Closed : 'Зачинено',
        Open : 'Відчинено',
        NoData : 'Невідомо'
    },
    hospital : {
        Closed : 'Зачинено',
        Open : 'Відчинено',
        NoData : 'Невідомо'
    },
}
