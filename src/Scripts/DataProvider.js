import {DataItem, HistoryDataItem} from "./DataItemFormat.js";
export var SelectedDataItem = new DataItem();
export var HistoryDataItems = [
    new HistoryDataItem("id1", ""),
    new HistoryDataItem("id2", "id1"),
    new HistoryDataItem("id3", "id2"),
    new HistoryDataItem("id4", "id3"),
    new HistoryDataItem("id5", "id4"),
    new HistoryDataItem("id6", "id5"),
    new HistoryDataItem("id7", "id6"),
    new HistoryDataItem("id8", "id7"),
];

/*
setTimeout(()=>{
    SelectedDataItem.city = "Vinnitsa";
},5000);*/


const MarkerItem = ()=>{
    return JSON.parse("[{\"id\":85,\"created_at\":\"2022-09-21T19:39:32.932033\",\"updated_at\":\"2022-09-21T19:39:32.932397\",\"address\":\"вулиця Хлібна,28\",\"index\":21000,\"city\":\"Вінниця\",\"country\":\"Украина\",\"position\":{\"lat\":49.2324391,\"lng\":28.4598791},\"reports\":{\"water\":\"Нестабільна\",\"hospital\":\"зачинено\",\"carEntrance\":\"Доступне\",\"electricity\":\"Переривчаста\",\"fuelStation\":\"відчинено\",\"hospitalDistance\":6.578978188685575,\"buildingCondition\":\"Неушкоджена\",\"fuelStationDistance\":4.170335869668074}},{\"id\":86,\"created_at\":\"2022-09-21T19:39:32.932033\",\"updated_at\":\"2022-09-21T19:39:32.932397\",\"address\":\"провулок Комунальний,5\",\"index\":21000,\"city\":\"Вінниця\",\"country\":\"Украина\",\"position\":{\"lat\":49.2312574,\"lng\":28.4585121},\"reports\":{\"water\":\"Нестабільна\",\"hospital\":\"зачинено\",\"carEntrance\":\"Недоступне\",\"electricity\":\"Переривчаста\",\"fuelStation\":\"відчинено\",\"hospitalDistance\":0.8324235512654635,\"buildingCondition\":\"Неушкоджена\",\"fuelStationDistance\":5.324875766807986}}]");
}
const HistoryItem = () =>{
    return JSON.parse("[{\"id\":97,\"location_id\":85,\"old_flags\":{\"buildingCondition\":\"Пошкоджена\"},\"media_url\":null,\"action_type\":1,\"created_at\":\"2022-09-14T19:55:00\",\"new_flags\":{\"buildingCondition\":\"Неушкоджена\"}},{\"id\":98,\"location_id\":85,\"old_flags\":{\"electricity\":\"Переривчаста\",\"fuelStation\":\"зачинено\"},\"media_url\":null,\"action_type\":1,\"created_at\":\"2022-09-13T22:57:00\",\"new_flags\":{\"electricity\":\"Стабільна\",\"fuelStation\":\"відчинено\"}},{\"id\":99,\"location_id\":85,\"old_flags\":null,\"media_url\":\"http://static.prsa.pl/images/22f26b47-af71-4daa-a669-07f10bc23810.jpg\",\"action_type\":2,\"created_at\":\"2022-09-05T11:52:00\",\"new_flags\":null}]");
}