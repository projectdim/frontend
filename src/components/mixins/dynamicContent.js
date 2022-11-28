export default {
  methods : {
    //TODO Localozation
    getTooltipText(reportFlag){
      try {
        let a = {
          buildingCondition : "Стан будівлі",
          electricity: "Наявність електроенергії",
          carEntrance: "Автошляхи",
          water: "Вода",
          fuelStation: "Заправка",
          hospital: "Лікарня",
        }
        return a[reportFlag];
      }
      catch (err){
        return "Tooltip content error";
      }
    },
  }
}