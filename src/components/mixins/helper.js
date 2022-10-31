
export  default {
  methods : {
    getShortDataTimeString(data) {

    },
    isPathMatched(url){
      return this.$route.matched.some(x=>x.path===url)
    }
  }
}