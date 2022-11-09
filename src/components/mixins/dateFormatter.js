export  default {
  methods : {
    // return DD.MM.YYYY
    GetDate(dateStr) {
      try {
        let date = dateStr;
        if (typeof dateStr !== typeof new Date()) {
          date = new Date(dateStr);
        }
        return `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
      }
      catch (err){
        console.error("Date formatter error. Method: GetDate");
        throw err;
      }
    },
    // return hh:mm DD.MM.YYYY
    GetDateTime(dateStr){
      try {
        let date = dateStr;
        if (typeof dateStr !== typeof new Date()) {
          date = new Date(dateStr);
        }
        return `${date.getHours()}:${date.getMinutes()} ${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
      }
      catch (err){
        console.error("Date formatter error. Method: GetDate");
        throw err;
      }
    }
  },
}