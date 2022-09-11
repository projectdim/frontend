import {GetRandomElement} from "./Helper.js"

export class DataItem{
    id="UIWEFIB34RVB89CG23EHW"
    city="Харків"
    index="61110"
    address="Степана Бендери 53б"
    description = "Тут, напевне, якийсь опис, можливо його розмір варто обмежити..."
    lastUpdate=1661621941000
    lat = 0
    lng = 0
    buildingCondition = "intact"        // intact// damaged// destroyed
    electricity = "stable"        // stable// intermittent //none
    carEntrance = "inaccessible"          //accessible //inaccessible
    water = "unstable"                    // stable// unstable  //none
    fuelStation = "close"               //close // open// none
    fuelStationDistance = "1.5"         //km
    hospital = "close"                   //open //close // none
    hospitalDistance = "0.8"            //km
    photo = [
        "https://static.espreso.tv/uploads/photobank/248000_249000/248536_Harkiv_reuters_new_960x380_0.jpg",
        "https://static.ukrinform.com/photos/2022_04/thumb_files/630_360_1651221771-528.jpg",
        "https://media.slovoidilo.ua/media/publications/17/162467/ilyustratyvne-foto_large.jpg",
        "https://decentralization.gov.ua/uploads/ckeditor/pictures/7739/content_%D0%A5%D0%B0%D1%80%D0%BA%D1%96%D0%B2.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2AjVW9GMdPgTkr7J_6MchyC8CqKYIZw1Omt7VN4DYDGxELVHJ6qFoXlhbpuRP29Cli7E&usqp=CAU",
        "https://images.unian.net/photos/2022_03/thumb_files/400_0_1647337339-3790.jpg?0.25597438004291195",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ1aaieEdsZCxNybPekghGXNp8QYNVQPGznloHqGx6OVAp4yzZdSu6H-ZOflJCrrfFWQ4&usqp=CAU",
        "https://media.slovoidilo.ua/media/publications/16/152935/152935-1_large.jpg",
    ]
}

export class HistoryDataItem{
    constructor(id, placePrevHistoryDataItemId) {
        this.id = id,
        this.placePrevHistoryDataItemId = placePrevHistoryDataItemId
    }

    id = ""
    placeDataItemId = "UIWEFIB34RVB89CG23EHW" // ІД місця
    placePrevHistoryDataItemId = ""        // посилання на попередній елемент історії

    createdAt = 1661619941000

    description = "Тут, напевне, якийсь опис, можливо його розмір варто обмежити... Та додатковий тестовий опис"
    buildingCondition = GetRandomElement(buildingConditionState);
    electricity = GetRandomElement(electricityState);
    carEntrance = GetRandomElement(carEntranceState);
    water = GetRandomElement(waterState);
    fuelStation = GetRandomElement(fuelStationState);
    fuelStationDistance = "1.5"         //km
    hospital = GetRandomElement(hospitalState);
    hospitalDistance = "0.8"            //km
    photo = [
        "https://static.espreso.tv/uploads/photobank/248000_249000/248536_Harkiv_reuters_new_960x380_0.jpg",
        "https://static.ukrinform.com/photos/2022_04/thumb_files/630_360_1651221771-528.jpg",
        "https://media.slovoidilo.ua/media/publications/17/162467/ilyustratyvne-foto_large.jpg",
        "https://decentralization.gov.ua/uploads/ckeditor/pictures/7739/content_%D0%A5%D0%B0%D1%80%D0%BA%D1%96%D0%B2.jpg",
    ]
}

const buildingConditionState = ["intact", "damaged", "destroyed"]
const electricityState = ["stable", "intermittent", "none"]
const carEntranceState = ["accessible", "inaccessible"]
const waterState = ["stable", "unstable", "none"]
const fuelStationState = ["close", "open", "none"]
const hospitalState = ["open", "close", "none"]


