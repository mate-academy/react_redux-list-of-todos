(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,n){e.exports=n(29)},20:function(e,t,n){},21:function(e,t,n){},26:function(e,t,n){},27:function(e,t,n){},28:function(e,t,n){},29:function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),r=n(6),c=n.n(r),u=(n(20),n(21),n(5)),i=n(4),l=n(2),d="todos_load",s="users_load",m="todos_received",f="users_received",h="todo_delete",p="https://jsonplaceholder.typicode.com/",L=function(){return function(e){e({type:d}),fetch("".concat(p,"todos")).then(function(e){return e.json()}).then(function(t){e(b(t))})}},v=function(){return function(e){e({type:s}),fetch("".concat(p,"users")).then(function(e){return e.json()}).then(function(t){e(E(t))})}},b=function(e){return{type:m,payload:e}},E=function(e){return{type:f,payload:e}};var g={todoLoading:!1,userLoading:!1,todoList:null,userList:null};n(26);var y=function(e){return a.a.createElement("td",{className:"name"},a.a.createElement("a",{href:"mailto:".concat(e.email)},e.name))};n(27);var j=function(e){var t=e.id,n=e.title,o=e.email,r=e.completed,c=e.user,u=e.removeItem;return a.a.createElement("tr",{key:t},a.a.createElement("td",{className:"id"},t),a.a.createElement("td",{className:"title"},n),a.a.createElement(y,{name:c.name,email:o}),a.a.createElement("td",null,a.a.createElement("input",{type:"checkbox",defaultChecked:r}),a.a.createElement("button",{className:"remove",onClick:function(){return u(t)}},"remove")))};var w=Object(i.b)(null,function(e){return{removeItem:function(t){return e(function(e){return{type:h,id:e}}(t))}}})(j);n(28);var O=function(e){var t=e.todoMap,n=e.loadTodos,o=e.loadUsers,r=e.isLoading;if(e.isLoaded){var c=t.map(function(e){return a.a.createElement(w,Object.assign({},e,{key:e.id}))});return a.a.createElement("table",{className:"todos"},a.a.createElement("thead",null,a.a.createElement("tr",null,a.a.createElement("th",null,"id"),a.a.createElement("th",null,"Title"),a.a.createElement("th",null,"Author"),a.a.createElement("th",null,"Completed"))),a.a.createElement("tbody",null,c))}return a.a.createElement("button",{className:"load",disabled:r?"disabled":"",onClick:function(){n(),o()}},r?"Loading":"Load")},k=n(13),N=Object(k.a)(function(e){return e.todoList},function(e){return e.userList},function(e,t){return e&&t?e.map(function(e){return Object(l.a)({},e,{user:t.find(function(t){return t.id===e.userId})})}):null}),_=function(e){return e.todoLoading||e.userLoading},C=function(e){return e.todoList&&e.userList};var I=Object(i.b)(function(e){return{isLoading:_(e),isLoaded:C(e),todoMap:N(e)}},function(e){return{loadTodos:function(){return e(L())},loadUsers:function(){return e(v())}}})(O),T=n(14),x=Object(u.c)(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:g,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case d:return Object(l.a)({},e,{todoLoading:!0,todoList:null});case s:return Object(l.a)({},e,{userLoading:!0,userList:null});case m:return Object(l.a)({},e,{todoLoading:!1,todoList:t.payload});case f:return Object(l.a)({},e,{userLoading:!1,userList:t.payload});case h:return Object(l.a)({},e,{todoList:e.todoList.filter(function(e){return e.id!==t.id})});default:return e}},Object(u.a)(T.a));var B=function(){return a.a.createElement(i.a,{store:x},a.a.createElement(I,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement(B,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[15,1,2]]]);
//# sourceMappingURL=main.ec410d9f.chunk.js.map