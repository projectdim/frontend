
export  default {
  methods : {
    getShortDataTimeString(data) {

    },
    isPathMatched(url){
      return this.$route.matched.some(x=>x.path===url)
    },
    isEqual(object1, object2) {
      if(!object1 || !object2)
        return false;

      const props1 = Object.getOwnPropertyNames(object1);
      const props2 = Object.getOwnPropertyNames(object2);

      if (props1.length !== props2.length) {
        return false;
      }

      for (let i = 0; i < props1.length; i += 1) {
        const prop = props1[i];
        const bothAreObjects = typeof(object1[prop]) === 'object' && typeof(object2[prop]) === 'object';

        if ((!bothAreObjects && (object1[prop] !== object2[prop]))
          || (bothAreObjects && !this.isEqual(object1[prop], object2[prop]))) {
          return false;
        }
      }
      return true;
    },
    isEqual2(object1, object2) {
      if(!object1 || !object2)
        return false;
      let obj1 = JSON.stringify(object1)
      let obj2 = JSON.stringify(object2)

      return  obj1 === obj2;
    },
    getLineCount(el){
      let style = window.getComputedStyle(el, null);
      let height = parseInt(style.getPropertyValue("height"));
      let font_size = parseInt(style.getPropertyValue("font-size"));
      let line_height = parseInt(style.getPropertyValue("line-height"));
      let box_sizing = style.getPropertyValue("box-sizing");

      if(isNaN(line_height)) line_height = font_size * 1.2;

      if(box_sizing=='border-box')
      {
        let padding_top = parseInt(style.getPropertyValue("padding-top"));
        let padding_bottom = parseInt(style.getPropertyValue("padding-bottom"));
        let border_top = parseInt(style.getPropertyValue("border-top-width"));
        let border_bottom = parseInt(style.getPropertyValue("border-bottom-width"));
        height = height - padding_top - padding_bottom - border_top - border_bottom
      }
      let lines = Math.ceil(height / line_height);
      return lines;
    },
    GetRandomElement(array){
      return array[getRndInteger(0, array.length - 1)];
    },
    getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
}
