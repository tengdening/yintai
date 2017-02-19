
    // 1.兼容的通过类名获取元素
    function getClass(sele,obj){
    var obj=obj||document;
    if(obj.getElementsByClassName){
        return obj.getElementsByClassName(sele);
    }else{
        var arr=[];
        var all=obj.getElementsByTagName("*");
        for(var i=0;i<all.length;i++){
            var leiming=all[i].className;
            if(check(leiming,sele)){
                arr.push(all[i])
            }
        }
        return arr;
    }
}


function check(className,sele){
    var arr=className.split(" ");
    for(var i=0;i<arr.length;i++){
        if(arr[i].className==sele){
            return true;
        }
        return false;   
    }   
}



// 2.兼容的设置获取元素的文本内容
// 如果要传的是0  或者text能用 但是传的是一个空值  那么出来的是一个空字符串
// classname 兼容性
function contentText(obj,value){
    if(value==undefined){
        if(obj.textContent!=undefined){
           return obj.textContent
        }else{
            return obj.innnerText
        }
    }else{
         if(obj.textContent!=undefined){
           obj.textContent=value;
        }else{
           obj.innnerText=value;
        }
    }
}
//获取方法
//var obj=contentText(需要获取的内容)；
//contentText(需要添加的地方,obj)


 //获取通用样式
function getStyle(obj,arrt){               
  //arrt代表对象的属性
    if(obj.currentStyle){
        // IE下可以使用
         return obj.currentStyle[arrt];
    }else{
        // 火狐中使用
       return getComputedStyle(obj,null)[arrt];
    }
}
// alert(getStyle(look,"width"))
 
//3.类名调用

function $(seletor,obj){
    var obj = obj || document;
    if (typeof seletor=="string") {
        if (seletor.charAt(0)==".") {
            return getClass(seletor.slice(1),obj);
        }else if(seletor.charAt(0)=="#"){
            return obj.getElementById(seletor.slice(1));
        }else if(/^[a-z|1-6]{1,10}$/g.test(seletor)){
            return obj.getElementsByTagName(seletor);
        }
    }else if (typeof seletor=="function"){
        window.onload=function(){
            seletor()
        }
    }
}

//调用方法
/*
$(function(){
    var aa = $(".aa");
    //获取到所有类名是aa的元素
    var bb = $("#bb");
    //获取到所有类名是bb的元素
    var div = $("div");
    //获取到所有类名是div的元素
    
})

*/
// 4.eval兼容问题
function evals(str){
    if (typeof str!='string') {
        return;
    }
    if (window.execScript){
        window.execScript(str)
    }else{
        window.eval(str)
    }
}

// 调用方法：
// function aa(){
//     evals('var c="后盾网"')
//     alert(c);
// }
// aa();
// alert(c);
//*************************************************
// 5.获取一个元素所有的子节点的元素的函数
//下变得3个都是获取同一个box里边的元素
function getChild(obj){
    var sons = obj.childNodes;
    var arr=[];
    for (var i = 0; i < sons.length; i++) {
        if(sons[i].nodeType==1){
            arr.push(sons[i]);
        }
    }
    return arr;
}
// 获取方法
//var sons= getChile(box);

// 6.获取第一个元素的子节点
//必须第5个写出来，才可以用这个。
function getFirst(obj){
    return getChild(obj)[0];
}
// 获取方式
// var first=getFirst(box);
// first.style.background="yellow";
//7.获取最后一个元素的子节点
function getLast(obj){
    var arr = getChild(obj);
    return arr[arr.length-1];
}
// 获取方式
// var last=getLast(box);
// last.style.background="red";

// 8.获取下一个元素兄弟节点
function getNext(obj){
    var next=obj.nextSibling;
    if (next==null) {
        return null;
    }
    while(next.nodeType!=1){
        next=next.nextSibling;
        if (next==null) {
            return null;
        }
    }
    return next;
}
// 获取方式
// var second=getNext(first);
// second.style.background="blue";
// 9.获取上一个元素兄弟节点
function getPrevious(obj){
    var prev=obj.previousSibling;
    if (prev==null) {
        return null;
    }
    while(prev.nodeType!=1){
        prev=prev.previousSibling;
        if (prev==null) {
            return null;
        }
    }
    return prev;
}
// 获取方式
// var previous=getNext(first);
// previous.style.background="blue";
//****************************************************

// insertAfter
//10.把a插入到b之后的函数。
function insertAfter(a,b){
var next=getNext(b);
var parent=b.parentNode;
if (next) {
parent.insertBefore(a,next);
}else{
    parent.appendChild(a)
}
}
//获取方法
// window.onload=function(){
//     var newdiv=document.createElement("div");
//     newdiv.className="xiaokuang";
//     var first=$(".xiaokuang")[0];

//     insertAfter(newdiv,first)
// }
// 兼容性的事件绑定的方式 event是事件,现代浏览器event不需要加on，ie8以下需要加
//添加
function addEvent(obj,event,fn){
    if (obj.addEventListener) {
        //现代浏览器   
        obj.addEventListener(event,fn,false)
    }else{
        //ie8以下版本
        obj.attachEvent("on"+event,fn)
    }
}
// 删除
function removeEvent(obj,event,fn){
    if (obj.removeEventListener) {
        //现代浏览器
        obj.removeEventListener(event,fn,false)
    }else{
        //ie8以下版本
        obj.detachEvent("on"+event,fn)
    }
}


// 事件对象兼容问题
// var ev=e||window.event;
/*
点击点距离文档的值
ev.clientX
ev.clientY
点击点距离事件源的值
ev.offsetX
ev.offsetY
点击点距离屏幕的值
ev.screenX
ev.screenY
*/
//添加滚轮事件的函数
function mousewheel(obj,up,down){
    if (obj.addEventListener) {
        // 谷歌
        obj.addEventListener("mousewheel",fu,false);
        // 火狐
        obj.addEventListener("DOMMouseScroll",fn,false);
    }else{
        //ie
        obj.attachEvent("onmousewheel",fn);
    }
    function fn(e){
        //兼容性获取一下
        var ev=e||window.event;
        //兼容性获取一下方向
        var date=ev.detail||ev.wheelDelta;
        if (date==-3||date==120) {
            up()
        }else if (date==-120||date==-120) {
            down()
        }
    }
}
// 调用方法
// mousewheel(obj,function(){},function(){})

// 11.更改或者获取某个属性的值
// ie  document.styleSheets[下标].rules[下标].style.属性
//     document.styleSheets[下标].rules[下标].style.属性=值
// ff  document.styleSheets[下标].cssRules[下标].style.属性
//     document.styleSheets[下标].cssRules[下标].style.属性=值
function cssrule(a,b){
    var a=a||0;
    var b=b||0;
    if (document.all) {
        return  document.styleSheets[a].rules[b].style;
    }else{
        return  document.styleSheets[a].cssRules[b].style;
    };
};



 //判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
    if(parent.contains){
       return parent.contains(child) && parent!=child;
    }else{
      return (parent.compareDocumentPosition(child)===20);
    }
 }
 //判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
     if(getEvent(e).type=="mouseover"){
        return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
        !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
     }else{
        return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
        !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
        }
  }
//鼠标移入移除事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
      if(overfun){
        obj.onmouseover=function  (e) {
              if(checkHover(e,obj)){
                 overfun.call(obj,e);
              }
        }
      }
      if(outfun){
        obj.onmouseout=function  (e) {
              if(checkHover(e,obj)){
                 outfun.call(obj,e);
              }
        }
      }
}
function getEvent(e){
    return e||window.event;
}




