(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{619:function(t,e,r){var content=r(634);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(53).default)("1077d416",content,!0,{sourceMap:!1})},633:function(t,e,r){"use strict";r(619)},634:function(t,e,r){(e=r(52)(!1)).push([t.i,"img[data-v-0175f813]{width:100%;height:240px;-o-object-fit:cover;object-fit:cover}.product-box1 .product-content-holder span[data-v-0175f813]{font-size:large;color:#ff4500;font-weight:400}",""]),t.exports=e},647:function(t,e,r){"use strict";r.r(e);r(30),r(31),r(24),r(65),r(66),r(42),r(25);var o=r(27),c=r(32);function n(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var l={data:function(){return{page:this.$route.params.page}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?n(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):n(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(c.b)({exchangeRate:"sessionStorage/exchangeRate",markupRate:"sessionStorage/markupRate"})),asyncData:function(t){var e=t.$axios,r=t.route,o=(t.params,t.$config.baseApiPath+"/search/"+r.params.provider+"/"+r.params.keyword+"/"+r.params.page);return e.get("".concat(o)).then((function(t){return console.log(t.data),{results:t.data}}))},mounted:function(){console.log(this.markupRate)},methods:{search:function(t){var e="/product/search/"+this.$route.params.provider+"/"+this.$route.params.keyword+"/"+parseInt(this.page);this.$router.push(e)},getCol:function(t){return t?"col-lg-9 col-md-9 col-sm-12 col-xs-12":"col-lg-12 col-md-12 col-sm-12 col-xs-12"},getList:function(t){return t?"col-lg-3 col-md-3 col-sm-6 col-xs-12":"col-lg-2 col-md-2 col-sm-4 col-xs-12"}}},d=(r(633),r(17)),component=Object(d.a)(l,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-lg-4 col-md-4 col-sm-12 col-xs-12"},[r("h4",{staticStyle:{"margin-top":"25px"}},[t._v('ผลการค้นหาคำว่า "'+t._s(t.$route.params.keyword)+'" จาก : '+t._s(t.$route.params.provider)+".com")])]),t._v(" "),r("div",{staticClass:"col-lg-8 col-md-8 col-sm-12 col-xs-12 text-right"},[r("paginate",{attrs:{"page-count":100,"page-range":10,"click-handler":t.search,"prev-text":"ก่อนหน้า","next-text":"ถัดไป","container-class":"pagination"},model:{value:t.page,callback:function(e){t.page=e},expression:"page"}})],1)]),t._v(" "),r("div",{staticClass:"row"},[r("div",{staticClass:"col-lg-12"},[r("div",{staticClass:"row"},t._l(t.results,(function(e){return r("div",{staticClass:"col-lg-3",staticStyle:{height:"300px"}},[r("div",{staticClass:"product-box1"},[r("div",[r("nuxt-link",{attrs:{to:{path:"/product/detail/"+t.$route.params.provider+"/"+e.itemId}}},[r("img",{staticClass:"img-responsive",attrs:{src:e.image,alt:"product"}})])],1),t._v(" "),r("div",{staticClass:"product-content-holder text-left"},[r("span",{staticClass:"price"},[t._v(t._s(t._f("price")(e.promoPrice*t.markupRate,"yuan")))]),r("span",{staticStyle:{float:"right"}},[t._v(t._s(t._f("price")(e.promoPrice*t.markupRate,"baht",t.exchangeRate)))]),t._v(" "),e.promoPrice!=e.price?r("small",{staticStyle:{"text-decoration":"line-through",color:"#aaa"}},[t._v(t._s(t._f("price")(e.price,"yuan")))]):t._e(),r("br"),t._v(" "),e.promoPrice!=e.price?r("span",{staticStyle:{background:"#FF5723",padding:"5px","font-size":"small",color:"white"}},[t._v(t._s(t._f("ceil")((e.promoPrice-e.price)/e.price*100))+"% Off")]):t._e()])])])})),0)])])])}),[],!1,null,"0175f813",null);e.default=component.exports}}]);