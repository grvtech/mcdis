/*generic functions*/
function compare(a,b) {if (a.values[0].order < b.values[0].order)return -1;return 1;return 0;}
function escapeRegExp(string) {return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");}
function replaceAll(string, find, replace) {return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);}
function capitalizeFirstLetter(string) {return string.charAt(0).toUpperCase() + string.slice(1);}
function loadcss(href) {var cssLink = $("<link>");$("body").append(cssLink);cssLink.attr({rel:"stylesheet",type: "text/css",href: href});};
function getSortedKeys(obj){var result = [];if(obj != null ){var keys = Object.keys(obj);for(var j=0;j<keys.length;j++){var kk = eval("obj."+keys[j]);if(kk != null){var ind = kk.values[0].order;var l = result.length;var add = true;for(var k=0;k<l;k++){var vk = eval("obj."+result[k]);var v = vk.values[0].order;if(ind <= v){result.splice(k,0,keys[j]);add=false;break;}}if(add){result.push(keys[j]);}}}}return result;}


Array.prototype.sum = function(selector) {if (typeof selector !== 'function') {selector = function(item) {return item;};}var sum = 0;for (var i = 0; i < this.length; i++) {sum += parseFloat(selector(this[i]));}return sum;};
Array.prototype.max = function() {return Math.max.apply(null, this);}
Array.prototype.min = function() {return Math.min.apply(null, this);};
Number.prototype.trimNum = function(places,rounding){(rounding != 'floor' && rounding != 'ceil') ? rounding = 'round' : rounding = rounding;var result, num = this, multiplier = Math.pow( 10,places );result = Math[rounding](num * multiplier) / multiplier;return Number( result );}
String.prototype.trimToPx = function(length){var tmp = this;var trimmed = this;if (tmp.visualLength() > length){trimmed += "...";while (trimmed.visualLength() > length){tmp = tmp.substring(0, tmp.length-1);trimmed = tmp + "...";}}return trimmed;}
String.prototype.visualLength = function(fs){let ruler = null;if($('body').has('.ruler').length){ruler = $('.ruler');}else{ruler = $('<span>',{class:'ruler'}).appendTo($('body'));}let fontsize = $('body').css('font-size');if(fs)fontsize=fs;ruler.css('visibility','hidden').css('white-space','nowrap').css('font-size',fontsize).empty().html(this);let len =ruler.width();ruler.remove(); return len;}

