(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(t,e,n){t.exports=n(27)},20:function(t,e,n){},27:function(t,e,n){"use strict";n.r(e);var r=n(0),o=n.n(r),a=n(7),c=n.n(a),s=(n(20),n(2)),u=n(3),l=n(14),i=n(5),d=n.n(i),m=n(6),p=Object(s.b)(function(t){return{todos:t.todos}},function(t){return{setTodos:function(e){return t({type:"SET_TODOS",todos:e})}}})(function(t){var e=t.todo,n=t.todos,r=t.setTodos;return o.a.createElement("tr",null,o.a.createElement("th",null,e.id),o.a.createElement("th",null,e.title),o.a.createElement("th",null,e.completed?"\u2705":"\u274c"),o.a.createElement("th",null,e.user.name),o.a.createElement("td",null,o.a.createElement("button",{type:"button",onClick:function(){return t=e.id,void r(n.filter(function(e){return e.id!==t}));var t}},o.a.createElement("span",null,"\ud83d\uddd1"))))}),f=Object(s.b)(function(t){return{todos:t.todos,selectedSort:t.selectedSort}},function(t){return{setTodos:function(e){return t({type:"SET_TODOS",todos:e})},setSelectedSort:function(e){return t({type:"SET_SORT_TYPE",selectedSort:e})}}})(function(t){var e=t.todos,n=t.setTodos,r=t.selectedSort,a=t.setSelectedSort,c=function(t){var o=[];switch(t){case"id":o=Object(m.a)(e).sort(function(t,e){return t.id-e.id});break;case"title":o=Object(m.a)(e).sort(function(t,e){return t.title.localeCompare(e.title)});break;case"user":o=Object(m.a)(e).sort(function(t,e){return t.user.name.localeCompare(e.user.name)});break;case"completed":o=Object(m.a)(e).sort(function(t,e){return e.completed.toString().localeCompare(t.completed.toString())})}n(r===t?Object(m.a)(e).reverse():o),a(t)};return o.a.createElement("div",null,o.a.createElement("table",null,o.a.createElement("thead",null,o.a.createElement("tr",null,o.a.createElement("th",{className:"title",style:{cursor:"pointer"},onClick:function(){return c("id")}},"Sort by Id"),o.a.createElement("th",{className:"title",style:{cursor:"pointer"},onClick:function(){return c("title")}},"Sort by Title"),o.a.createElement("th",{className:"title",style:{cursor:"pointer"},onClick:function(){return c("completed")}},"Sort if is completed"),o.a.createElement("th",{className:"title",style:{cursor:"pointer"},onClick:function(){return c("user")}},"Sort by Name"),o.a.createElement("th",{className:"title"},"Delete"))),o.a.createElement("tbody",null,e.map(function(t){return o.a.createElement(p,{todo:t})}))))}),b=function(){var t;return d.a.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.awrap(fetch("https://jsonplaceholder.typicode.com/todos"));case 2:return t=e.sent,e.abrupt("return",t.json());case 4:case"end":return e.stop()}})},E=function(){var t;return d.a.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.awrap(fetch("https://jsonplaceholder.typicode.com/users"));case 2:return t=e.sent,e.abrupt("return",t.json());case 4:case"end":return e.stop()}})};var S=Object(s.b)(function(t){return{isLoading:t.isLoading,buttonStatus:t.buttonStatus}},function(t){return{setTodos:function(e){return t({type:"SET_TODOS",todos:e})},setIsLoading:function(e){return t({type:"SET_LOADING",isLoading:e})},setButtonStatus:function(e){return t({type:"SET_BUTTON",buttonStatus:e})}}})(function(t){var e=t.setTodos,n=t.isLoading,r=t.setIsLoading,a=t.buttonStatus,c=t.setButtonStatus;return n?o.a.createElement("div",{className:"App"},o.a.createElement("h1",null,"List of Todos"),o.a.createElement("h2",{className:"start-page"},"Loading...")):a?o.a.createElement("div",{className:"App"},o.a.createElement("h1",null,"List of Todos"),o.a.createElement("button",{className:"button",type:"button",onClick:function(){var t,n,o,a,s;return d.a.async(function(i){for(;;)switch(i.prev=i.next){case 0:return r(!0),i.next=3,d.a.awrap(Promise.all([b(),E()]));case 3:return t=i.sent,n=Object(l.a)(t,2),o=n[0],a=n[1],r(!1),c(!1),s=o.map(function(t){return Object(u.a)({},t,{user:a.find(function(e){return t.userId===e.id})})}),e(s),i.abrupt("return",s);case 12:case"end":return i.stop()}})}},"Load")):o.a.createElement("div",{className:"App"},o.a.createElement("h1",null,"List of Todos"),o.a.createElement(f,null))}),T=n(8),O=Object(T.b)(function(t,e){switch(e.type){case"SET_TODOS":return Object(u.a)({},t,{todos:e.todos});case"SET_LOADING":return Object(u.a)({},t,{isLoading:e.isLoading});case"SET_BUTTON":return Object(u.a)({},t,{buttonStatus:e.buttonStatus});case"SET_SORT_TYPE":return Object(u.a)({},t,{selectedSort:e.selectedSort});default:return t}},{todos:[],isLoading:!1,buttonStatus:!0,selectedSort:"id"});c.a.render(o.a.createElement(s.a,{store:O},o.a.createElement(S,null)),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.6f4e1595.chunk.js.map