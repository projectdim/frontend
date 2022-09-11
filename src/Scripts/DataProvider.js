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
