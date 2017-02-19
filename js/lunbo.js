$(function(){
// 1.获取变量
var box=$('.middle')[1];
var imgbox=$('.imgbox')[0];
var imgtu=$('.imgtu');
var left=$('#left');
var right=$('#right');
var anniubox=$('.anniubox')[0];
var anniu=$('.anniu');
var dk=$(".banner-wai")[0];
var aa = 0;
var st;
var colorarr=["#02142C","#F3F3F3","#D43E40","#FFE6EA","#EB4064"]
imgtu[0].style.zIndex=1;
anniu[0].style.background="#E5004F";
function move(obj){
	aa++
	if (aa==-1) {
		aa=imgtu.length-1
	};
	if (aa==imgtu.length) {
		aa=0;
	};
	for (var i = 0; i < imgtu.length; i++) {
		imgtu[i].style.zIndex=0;
		anniu[i].style.background="#211616"
	}
	anniu[aa].style.background="#E5004F"
	imgtu[aa].style.zIndex=1;
	dk.style.background=colorarr[aa];

}
for (var i = 0; i < anniu.length; i++) {
	anniu[i].index=i;
	anniu[i].onmouseover=function(){
		var that=this;
		clearTimeout(st);

		st=setTimeout(function(){
			aa=that.index;
			for (var j = 0; j < anniu.length; j++) {
				aa=that.index;
				imgtu[j].style.zIndex=0;
				anniu[j].style.background="#211616"
			}
			anniu[that.index].style.background="#E5004F"
			imgtu[that.index].style.zIndex=1;
			dk.style.background=colorarr[that.index];
		},500)
	}
}
var t=setInterval(move,2000)
box.onmouseover=function(){
	clearInterval(t)
}
box.onmouseout=function(){
    t=setInterval(move,2000)
}
left.onclick=function(){
	aa=aa-2
	move()
}
right.onclick=function(){
	move()
}

// 楼层跳转
var btns=$(".anNiu");
var floors=$(".floor");
var btnbox=$(".gudingdingwei")[0];
var temp=btns[0];
	for (var i = 0; i < btns.length; i++) {
		btns[i].index=i;
		btns[i].onclick=function(){
			var obj=document.documentElement.scrollTop==0?document.body:document.documentElement;
			var ot=floors[this.index].offsetTop;
			animate(obj,{scrollTop:ot});
			temp.style.background="";
			this.style.background="#E5004F";
			temp=this;
		}
	};

	var t;
	window.onscroll=function(){
		var dtop=document.body.scrollTop||document.documentElement.scrollTop;
		clearTimeout(t);
		t = setTimeout(function(){
			for (var i = 0; i < floors.length; i++) {
			var btop=floors[i].offsetTop;
				if(btop<dtop+300){
					for (var j = 0; j < btns.length; j++) {
						btns[j].style.background="";
					}
					btns[i].style.background="#E5004F";
				}
		}
		},30)
		var eehh=document.documentElement.scrollTop==0?document.body:document.documentElement;

		var sb=eehh.scrollTop;
		if (sb>800) {
			btnbox.style.display="block";
			animate(btnbox,{opacity:1})
		 }else{
			animate(btnbox,{opacity:0},function(){
				btnbox.style.display="none";
			})
		}
	}

// 返回顶部

var totop=$(".totop")[0];
totop.onclick=function(){
	if (document.body.scrollTop==0) {
		var obj=document.documentElement;
	}else{
		var obj=document.body;
	}
	animate(obj,{scrollTop:0},1000)
}


// 边框
var imgborder=$(".imgborder");
	function createborder(obj){
		var arr=[]
		for(var i =0; i <4;i++){
			var div=document.createElement("div");
			if (i==0) {
				div.style.cssText="position:absolute;background:#666666;left:-1px;top:-1px;height:0;width:1px;z-index:2"
			}else if(i==1){
				div.style.cssText="position:absolute;background:#666666;left:-1px;top:-1px;height:1px;width:0;z-index:2"
			}else if(i==2){
				div.style.cssText="position:absolute;background:#666666;right:-1px;bottom:-1px;height:0;width:1px;z-index:2"
			}else if(i==3){
				div.style.cssText="position:absolute;background:#666666;right:-1px;bottom:-1px;height:1px;width:0;z-index:2"
			}
			obj.appendChild(div);
			arr.push(div)
		}
		var maxwidth=obj.offsetWidth;
		var maxheight=obj.offsetHeight;
		hover(obj,function(){
			animate(arr[0],{height:maxheight});
			animate(arr[1],{width:maxwidth});
			animate(arr[2],{height:maxheight});
			animate(arr[3],{width:maxwidth});
		},function(){
			animate(arr[0],{height:0});
			animate(arr[1],{width:0});
			animate(arr[2],{height:0});
			animate(arr[3],{width:0});
		})
		}
		for (var i = 0; i < imgborder.length; i++) {
			createborder(imgborder[i])
		};

// banner右边向左移动10px
var banright=$(".right",dk)[0];
banright.onmouseover=function(){
	banright.style.right=10+"px";
}
banright.onmouseout=function(){
	banright.style.right=0;
}

// msg选项卡
var msg=$(".msg")[0];
var msgbtn=$(".msg-btn");
var msgtu=$(".bottom",msg);
msgtu[0].style.zIndex=1;
for (var i = 0; i < msgbtn.length; i++) {
	msgbtn[i].index=i;
	msgbtn[i].onmouseover=function(){
		for (var j = 0; j < msgtu.length; j++) {
			msgtu[j].style.zIndex=0;
		};
		msgtu[this.index].style.zIndex=1;
	}
};
 
//推荐选项卡
var recommend=$(".recommend")[0];
var recombtn=$(".recommend-btn");
var recomtu=$(".bottom",recommend);
recomtu[0].style.zIndex=1;
for (var i = 0; i < recombtn.length; i++) {
	recombtn[i].index=i;
	recombtn[i].onmouseover=function(){
		for (var j = 0; j < recomtu.length; j++){
			recomtu[j].style.zIndex=0;
		}
		recomtu[this.index].style.zIndex=1;
	}
};

// 楼层里边中间的图片，左切换图，右切换图
var dwleft=$(".left-btn");
var dwright=$(".right-btn");
var dwbtn1=$(".floorbtn1");
var dwbtn2=$(".floorbtn2");
var floortu=$(".floor-box");
var wbk=$(".wbk-middle")[0];
for (var i = 0; i < floortu.length; i++) {
	yt(dwleft[i],dwright[i],floortu[i],dwbtn1[i],dwbtn2[i])
};
function yt(dwleft,dwright,floortu,dwbtn1,dwbtn2){
	dwbtn1.style.background="#D80950";
	dwbtn1.onmouseover=function(){
		dwbtn2.style.background="#6E6E6E";
		animate(floortu,{left:0})
		dwbtn1.style.background="#D80950";
	}
	dwbtn2.onmouseover=function(){
		dwbtn1.style.background="#6E6E6E";
		animate(floortu,{left:-390})
		dwbtn2.style.background="#D80950";
	}
	dwright.onclick=function(){
		dwbtn1.style.background="#6E6E6E";
		animate(floortu,{left:-390});
		dwbtn2.style.background="#D80950";
	}
	dwleft.onclick=function(){
		dwbtn2.style.background="#6E6E6E";
		animate(floortu,{left:0});
		dwbtn1.style.background="#D80950";
	}
}


// 楼层里边左边的跑马灯
var bll=$(".bll");
var blr=$(".blr");
var blboxzk=$(".blboxzk");
for (var i = 0; i < blboxzk.length; i++) {
	jd(blboxzk[i],bll[i],blr[i])
};
function jd(blboxzk,bll,blr){
	var num=0;
	var sjhs=true;
	blr.onclick=function(){
		if (sjhs) {
			sjhs=false;
		num++;
		if (num==3) {
			num=1;
			blboxzk.style.marginLeft=0;
		}
		animate(blboxzk,{marginLeft:-159*num},500,function(){
			sjhs=true;
		})
		}
	}
	bll.onclick=function(){
		if (sjhs) {
			sjhs=false;
			num--;//num--所以下边改成-1，本来为0；
		if (num==-1) {
			blboxzk.style.marginLeft=-159*2+"px";
			num=1;
		}
		animate(blboxzk,{marginLeft:-159*num},500,function(){
			sjhs=true;
		})
		}
	}
}
})