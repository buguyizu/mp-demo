 /** 
  *格式化数字显示方式
  *用法
  * formatNumber(12345.999,'#,###0.00'); 
  * formatNumber(12345.999,'#,###0.##'); 
  * formatNumber(123,'000000'); 
  * @param num 
  * @param pattern 
  */  
 function formatNumber(num,pattern){  
	var strarr = num?num.toString().split('.'):['0'];  
	var fmtarr = pattern?pattern.split('.'):[''];  
   	var retstr='';  
   
   	//整数部分
	var str = strarr[0];  
	var fmt = fmtarr[0];  
	var i = str.length-1;    
	var comma = false;  
	for(var f=fmt.length-1;f>=0;f--){  
		switch(fmt.substr(f,1)){  
       	case '#':  
         if(i>=0 ) retstr = str.substr(i--,1) + retstr;  
         break;  
       	case '0':  
         if(i>=0) retstr = str.substr(i--,1) + retstr;  
         else retstr = '0' + retstr;  
         break;  
       	case ',':  
         comma = true;  
         retstr=','+retstr;  
         break;  
		}  
	}  
   	if(i>=0){  
     	if(comma){  
	       	var l = str.length;  
	       	for(;i>=0;i--){  
				retstr = str.substr(i,1) + retstr;  
				if(i>0 && ((l-i)%4)==0) retstr = ',' + retstr;   
	       	}  
		}else retstr = str.substr(0,i+1) + retstr;  
	}  
   
	retstr = retstr+'.'; 
   	//处理小数部分
   	str=strarr.length>1?strarr[1]:'';  
   	fmt=fmtarr.length>1?fmtarr[1]:'';  
   	i=0;  
   	for(var f=0;f<fmt.length;f++){  
		switch(fmt.substr(f,1)){  
		case '#':  
			if(i<str.length) retstr+=str.substr(i++,1);  
         	break;  
		case '0':  
			if(i<str.length) retstr+= str.substr(i++,1);  
         	else retstr+='0';  
		break;  
		}  
	}  
   	return retstr.replace(/^,+/,'').replace(/\.$/,'');  
 }
 
 function formatDecimal(decimal, pattern) {
	 if (!pattern) {
		 pattern = '#,###0.00';
	 }
	 if (!decimal) {
		 return '';
	 } else {
		 return formatNumber(new Number(decimal.toString()), pattern);
	 }
 }
 
 function isNumber(value){
	return parseFloat(value) == value;
 }
 
 function addComma(nStr){  
	if(nStr==null || nStr.length == 0){
   		return nStr;
   	}
	x = nStr.split('.');  
	x1 = x[0];  
	x2 = x.length > 1 ? '.' + x[1] : '';  
	var rgx = /(\d+)(\d{4})/;  
	while (rgx.test(x1)) {  
	   x1 = x1.replace(rgx, '$1' + ',' + '$2');  
	}  
	return x1 + x2;  
 } 
 
 
 function delComma(nStr) {
	if(nStr != null) {
		return nStr.toString().replace(/,/g, '');
    }
    return "";
 }
 
/**
 画面IME设定
*/
function imeSwitch(imeMode){
 $('.ime-ctrl').each(function(idx){
     $(this).css("ime-mode",imeMode);
 })
}
 
/**
 datepicker设定
*/
function setDatePicker(eleStr) {
	if (!eleStr) {
		eleStr = ".datepicker";
	}
	if ($(eleStr).length > 0) {
		$(eleStr)
			.datepicker()
			.prop('readonly', true)
			.keydown( function(e) {
				if (e.keyCode == 8)
					return false;
			});
	}
}

$(function() {
	try {
		showWait();
	    //全体提交等待设定
	    $(window).load(unblock).load(setTitle).on('beforeunload', showWait);
	    $('form').on('submit', showWait);
	    $(':text').on('mouseover', function() {
	    	//某些页面不需要
	    	var loc = location.href;
	    	if (loc.indexOf("u4010") == -1 && loc.indexOf("u4020") == -1) {
		    	//$(this).select().focus();
	    	}
	    }).on('blur', function() {
	    	var v = $(this).val();
	    	//禁止输入
	    	v = v.replace(/\\|\/|\?|\+|\*|\=|\-|\%|\'|\"|\^|\$|\&|\||\#|\<|\>|\(|\)|\[|\]|\{|\}/g, '');
	    	$(this).val($.trim(v));
	    });
	    var f = $('fieldset:first');
	    if (f.height() > 60 && $('fieldset').length > 1) {
	    	var l = f.find('legend');
	    	l.html(l.text() + ' <a href="#" id="udUrl" title="点击切换[展开][折叠]状态。" onclick="return toggleFieldset(this);">⇕</a>')
	    }
	    // title="点击切换侧栏宽度。"
	    //$('.main-side ul').append('<li class="bottom-submenu" onclick="return shiftMenu();"><span>⇔</span></li>');
	    $.datepicker.setDefaults( $.datepicker.regional[ "zh-CN" ] );
	    $.datepicker.setDefaults({
			 	showButtonPanel: true,
			 	showOn: "both",
			 	showAnim: "fadeIn",
			  	showOtherMonths: true,
			  	showWeek: true,
			  	showMonthAfterYear: true,
			  	monthNamesShort: [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12" ],
			  	selectOtherMonths: true,
			   	changeYear: true,
			   	changeMonth: true,
			   	buttonText:"...",
			  	yearRange: "2014:2050",
			  	closeText: "清除"
			});
		setDatePicker();
	    $(":text[readonly]").off('mouseover').off('blur');
		$("input[type=button], input[type=submit], button").button();
		$('.addBtn').button({
			icons: {
				primary: "ui-icon-document"
			},
			text: false
		});
		$('.clearBtn').button({
			icons: {
				primary: "ui-icon-document-b"
			},
			text: false
		});
		$('.editBtn').button({
			icons: {
				primary: "ui-icon-pencil"
			},
			text: false
		});
		$('.copyBtn').button({
			icons: {
				primary: "ui-icon-copy"
			},
			text: false
		});
		$('.deleteBtn').button({
			icons: {
				primary: "ui-icon-trash"
			},
			text: false
		});
		$('.useBtn').button({
			icons: {
				primary: "ui-icon-star"
			},
			text: false
		});
		$('.nonuseBtn').button({
			icons: {
				primary: "ui-icon-cancel"
			},
			text: false
		});
		$('.yesBtn').button({
			icons: {
				primary: "ui-icon-check"
			},
			text: false
		});
		$('.leftBtn').button({
			icons: {
				primary: "ui-icon-circle-arrow-w"
			},
			text: false
		});
		$('.rightBtn').button({
			icons: {
				primary: "ui-icon-circle-arrow-e"
			},
			text: false
		});
		$('.payBtn').button({
			icons: {
				primary: "ui-icon-circle-check"
			},
			text: false
		});
		$('.printBtn').button({
			icons: {
				primary: "ui-icon-print"
			},
			text: false
		});
		$('.exportBtn').button({
			icons: {
				primary: "ui-icon-extlink"
			},
			text: false
		});
     	$( "#navigation .col-b button" ).button({
			icons: {
				primary: "ui-icon-search"
			},
			text: false
     	});
	    //ime设定
	    //imeSwitch(imeModeVal);
	} catch (err) {
		console.error(err);
	}
});

function goTop() {
	$(window).scrollTop(0);
	return false;
}

function toggleFieldset(ele) {
	$(ele).parents('fieldset').find('table').toggle();
	return false;
}

function waitSubmit(form) {
	if (!form) {
		form = $("form");
	}
	form.off('submit');
	$(window).off('beforeunload');
	showWaitInfo();
    $(document).bind("contextmenu",function(e){ 
		return false; 
	});
	form.submit();
	return false;
}

//提交时间较长时
function showWaitInfo() {
	$.blockUI({
		css: {
			border: 'none',
			backgroundColor: 'transparent',
			padding: '15px',
			width: '300px',
			fontSize: '20pt',
			color: 'white'
		},
		message: '执行中，请耐心等待...'
	});
}

//页面跳转，提交时
function showWait() {
	$.blockUI({
		overlayCSS: {
			backgroundColor: 'white',
			opacity: 0.2
		},
		css: {
			border: 'none',
			backgroundColor: 'transparent'
		},
		message: ''
	});
	$(document).bind("contextmenu",function(e){ 
		return false; 
	});
}

//弹出子窗口时
function block() {
    $.blockUI({
			css: {
				width: '150px',
				padding: '10px 0px'
			},
			message: '请先关闭弹出窗口...'
		});
    $(document).bind("contextmenu",function(e){ 
		return false; 
	});
}
//接触窗口锁定
function unblock() {
    $.unblockUI();
    $(document).unbind("contextmenu");
}

//弹窗对象
var openWin;
//票据弹窗调用函数
function showBillPopup(url){
    openWin = window.open(url,'u0010','scrollbars=no,top='+(window.screen.availHeight-410)/2+',left='+(window.screen.availWidth-480)/2+',width=480,height=350,statusbar=0,resizable=no,menubar=no,toolbar=no');
    return false;
}
//结算弹窗调用函数
function showPayPopup(url){
    openWin = window.open(url,'u0020','scrollbars=yes,top='+(window.screen.availHeight-530)/2+',left='+(window.screen.availWidth-900)/2+',width=900,height=500,statusbar=0,resizable=no,menubar=no,toolbar=no');
    return false;
}
//菜单切换
function shiftMenu() {
	$('.main-body').toggleClass('main-body2');
	return false;
}
//jquery-ui Tooltip
function setTitle() {
	var loc = location.href,
		//各页面帮助提示定义
		helps = {
				"u3010": "<ul><li>" + MT015 + "</li><li>" + MT016 + "</li><li>" + MT017 + "</li></ul>",
				"u4010": MT002,
				"u4020": "<ul><li>" + MT001 + "</li><li>" + MT002 + "</li></ul>",
				"u5010": MT018
			},
		hp = null;
	if (loc.indexOf("u3010") > -1) {
		//结算
		hp = helps["u3010"];
	} else if (loc.indexOf("u4010") > -1) {
		//编码管理
		hp = helps["u4010"];
	} else if (loc.indexOf("u4020") > -1) {
		//规格管理
		hp = helps["u4020"];
	} else if (loc.indexOf("u5010") > -1) {
		//结算查询
		hp = helps["u5010"];
	} else {
		$("#pgtip").hide();
	}
 	$(document).tooltip({ items: "#pgtip:visible, [title], [data-img]", track: true,
 		content: function() {
	 		var element = $(this);
	 		if ( element.is( "#pgtip" ) ) {
	 			return hp;
	 		} else if ( element.is( "[data-img]" ) ) {
	 			return "<img class='map' alt='" + element.text() + "' src='img/" + element.attr( "data-img" ) + "'/>";
	 		} else {
	 			return element.attr( "title" );
	 		}
 	} });
}
//消息定义
var MT001 = "如查询结果过多，可以再加上合适的条件查询。",
MT002 = "如要放弃编辑，请点击 [查询] 。",
MT003 = "点击排序。",
MT004 = "另外有{0}张无效票据。",
MT005 = "请输入数字或字母。",
MT006 = "必须输入。",
MT007 = "下面有{0}个小类型。",
MT008 = "被使用{0}次。",
MT009 = "请选择 [规格小类型] 所基于的 [规格大类型] 。",
MT010 = "全部必须输入。",
MT011 = "请输入数字，整数2位，小数2位。",
MT012 = "另外有{0}张无效票据。",
MT013 = "请输入数字。",
MT014 = "今年正月初一",
MT015 = "结算前打印的是预结单；结算后打印的是正式结算单。",
MT016 = "结算成功后，建议立即打印正式结算单，校对后签字盖章，然后交由加工者去财务人员处领款。",
MT017 = "本页面打印的正式结算单，应作为唯一领款凭据。",
MT018 = "财务人员确认正式结算单，向加工者支付现金后，应立即点击[已领]按钮。"
;
