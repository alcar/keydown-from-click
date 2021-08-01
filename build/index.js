(()=>{"use strict";var e={n:t=>{var r=t&&t.__esModule?()=>t.default:()=>t;return e.d(r,{a:r}),r},d:(t,r)=>{for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{createKeydownFromClick:()=>S,default:()=>k,useKeydownFromClick:()=>K});var r=function(e){return console.warn("[keydown-from-click]: "+e)};function n(e){return function(e){if(Array.isArray(e))return l(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||c(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function u(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var n,o,i=[],a=!0,u=!1;try{for(r=r.call(e);!(a=(n=r.next()).done)&&(i.push(n.value),!t||i.length!==t);a=!0);}catch(e){u=!0,o=e}finally{try{a||null==r.return||r.return()}finally{if(u)throw o}}return i}(e,t)||c(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(e,t){if(e){if("string"==typeof e)return l(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?l(e,t):void 0}}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var f={altKey:!1,ctrlKey:!1,metaKey:!1,shiftKey:!1},s=Object.keys(f),y=function(e){return s.includes(e)},d=function(e,t){var o,c=(o=t,Object.entries(o).reduce((function(e,t){var n=u(t,2),o=n[0],i=n[1];return!1===y(o)?r("'".concat(o,"' is an invalid modifier and, therefore, will be ignored.")):"boolean"==typeof i&&(e[o]=i),e}),{}));return e.reduce((function(e,t){var o=t.split("+"),u=o.reduce((function(e,n,u){if(null===e)return e;if(u===o.length-1){var c=/^\s+$/.test(n)?" ":n.trim();return i(i({},e),{},{key:c})}var l=n.trim()+"Key";return!1===y(l)?(r("'".concat(t,"' has one or more invalid modifiers and, therefore, will be ignored.")),null):i(i({},e),{},{modifiers:i(i({},e.modifiers),{},a({},l,!0))})}),{key:"",modifiers:c});return null===u?e:[].concat(n(e),[u])}),[])},p=function(e,t){for(var r=i(i({},f),e),n=Object.entries(r),o=0;o<n.length;o++){var a=u(n[o],2),c=a[0],l=a[1];if(t[c]!==l)return!1}return!0},b=function(e,t){for(var r=0;r<e.length;r++){var n=e[r],o=n.key,i=n.modifiers;if(o===t.key.toLowerCase()&&p(i,t))return!0}return!1};function m(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function v(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?m(Object(r),!0).forEach((function(t){g(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):m(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function g(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var h=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=t.keys,n=t.modifiers,o=void 0===n?{}:n,i=t.shouldPropagate,a=void 0===i||i,u=r?r.map((function(e){return e.toLowerCase()})):["enter"," "],c=d(u,o);return function(t){if(b(c,t)){var r=t.currentTarget.getBoundingClientRect(),n=Math.round(r.left+r.width/2),o=Math.round(r.top+r.height/2),i=document.body.getBoundingClientRect(),u=n-i.x,l=o-i.y,f=window.screenLeft+n,s=window.screenTop+80+o,y={button:0,buttons:0,clientX:n,clientY:o,isTrusted:t.isTrusted,movementX:0,movementY:0,relatedTarget:null,screenX:f,screenY:s};e(v(v({},y),{},{altKey:t.altKey,bubbles:t.bubbles,cancelable:t.cancelable,ctrlKey:t.ctrlKey,currentTarget:t.currentTarget,defaultPrevented:t.defaultPrevented,detail:1,eventPhase:t.eventPhase,getModifierState:function(e){return!!("Alt"===e&&t.altKey||"Control"===e&&t.ctrlKey||"Meta"===e&&t.metaKey||"Shift"===e&&t.shiftKey)},isDefaultPrevented:t.isDefaultPrevented,isPropagationStopped:t.isPropagationStopped,metaKey:t.metaKey,nativeEvent:new MouseEvent("click",y),pageX:u,pageY:l,persist:t.persist,preventDefault:t.preventDefault,shiftKey:t.shiftKey,stopPropagation:t.stopPropagation,target:t.target,timeStamp:t.timeStamp,type:t.type,view:window})),!1===a&&t.stopPropagation()}}};const O=require("react");var w=e.n(O);function j(e){return function(e){if(Array.isArray(e))return P(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return P(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return P(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function P(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var S=h,K=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=t.extraDependencies,n=t.keys,o=t.modifiers,i=t.shouldPropagate,a=w().useMemo((function(){return h(e,{keys:n,modifiers:o,shouldPropagate:i})}),r?[e,n,o,i].concat(j(r)):[e,n,o,i]);return w().useCallback((function(e){return a(e)}),[a])};const k={createKeydownFromClick:S,useKeydownFromClick:K};module.exports=t})();