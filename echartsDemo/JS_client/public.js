
//js获取Request值
function GetRequest(strParame) 
{ 
    var args = new Object( ); 
    var query = location.search.substring(1); 

    var pairs = query.split("&"); // Break at ampersand 
    for(var i = 0; i < pairs.length; i++) 
    { 
        var pos = pairs[i].indexOf('='); 
        if (pos == -1) continue; 
        
        var argname = pairs[i].substring(0,pos); 
        var value = pairs[i].substring(pos+1); 
        value = decodeURIComponent(value); 
        args[argname] = value; 
    } 
    
    return args[strParame]; 
} 

//js获取Request值
function GetParentRequest(strParame) 
{ 
    var args = new Object( ); 
    var query = parent.location.search.substring(1); 

    var pairs = query.split("&"); // Break at ampersand 
    for(var i = 0; i < pairs.length; i++) 
    { 
        var pos = pairs[i].indexOf('='); 
        if (pos == -1) continue; 
        
        var argname = pairs[i].substring(0,pos); 
        var value = pairs[i].substring(pos+1); 
        value = decodeURIComponent(value); 
        args[argname] = value; 
    } 
    
    return args[strParame]; 
} 

//使用fckeditor录入的数据，会包含英文字符的:、""、'，所以需要将这些符号更换，否则Json无法正确读取
//冒号: <-> □
//分号; <-> ■
//双引号" <-> ☆
//单引号' <-> ★
//左< <-> ○
//右> <-> ●
//左</ <-> △
//右/> <-> ▲
//\r <-> ◇
//\n <-> ◆
//, <-> ◎
//[ <-> ♂
//] <-> ♀
//& <-> ¤
function myFormatJson(myJsonStr)
{
    var myFormatJsonStr = "";

    myJsonStr = myJsonStr.replace(/\□/g, ":");
    myJsonStr = myJsonStr.replace(/\■/g, ";");
    myJsonStr = myJsonStr.replace(/\☆/g, "\"");
    myJsonStr = myJsonStr.replace(/\★/g, "'");
    myJsonStr = myJsonStr.replace(/\△/g, "</");
    myJsonStr = myJsonStr.replace(/\▲/g, "/>");
    myJsonStr = myJsonStr.replace(/\○/g, "<");
    myJsonStr = myJsonStr.replace(/\●/g, ">");
    myJsonStr = myJsonStr.replace(/\◇/g, "\r");
    myJsonStr = myJsonStr.replace(/\◆/g, "\n");
    myJsonStr = myJsonStr.replace(/\◎/g, ",");
    myJsonStr = myJsonStr.replace(/\♂/g, "[");
    myJsonStr = myJsonStr.replace(/\♀/g, "]");
    myJsonStr = myJsonStr.replace(/\¤/g, "&");

    myFormatJsonStr = myJsonStr;
    return myFormatJsonStr;
}

function myFormatText(myJsonStr)
{
	var myFormatJsonStr = "";
    myJsonStr = myJsonStr.replace(/\:/g, "□");
    myJsonStr = myJsonStr.replace(/\;/g, "■");
    myJsonStr = myJsonStr.replace(/\"/g, "☆");
    myJsonStr = myJsonStr.replace(/\'/g, "★");
    var reg=new RegExp("</","g");
    myJsonStr = myJsonStr.replace(reg, "△");
    reg=new RegExp("/>","g");
    myJsonStr = myJsonStr.replace(reg, "▲");
    myJsonStr = myJsonStr.replace(/\</g, "○");
    myJsonStr = myJsonStr.replace(/\>/g, "●");
    reg=new RegExp("\r","g");
    myJsonStr = myJsonStr.replace(reg, "◇");
    reg=new RegExp("\n","g");
    myJsonStr = myJsonStr.replace(reg, "◆");
    myJsonStr = myJsonStr.replace(/\,/g, "◎");
    myJsonStr = myJsonStr.replace(/\[/g, "♂");
    myJsonStr = myJsonStr.replace(/\]/g, "♀");
    reg=new RegExp("&","g");
    myJsonStr = myJsonStr.replace(reg, "¤");
    
    myFormatJsonStr = myJsonStr;
    return myFormatJsonStr;
}

//截取字符串
function CutString(myTitle,myCount)
{
    if(myTitle.length>myCount)
    {
        myTitle=myTitle.substring(0,myCount)+"...";
    }
    return myTitle;
}

//获取日期时间 yyyy-MM-dd hh:mm
function GetShortDateTime(myDateTime)
{
	var myDateTimeArr=myDateTime.split(" ");
	myDateTime=myDateTimeArr[1];
	var myTimeArr=myDateTime.split(":");
	myDateTime=myDateTimeArr[0]+" "+myTimeArr[0]+":"+myTimeArr[1];
	return myDateTime;
}

//获取短日期格式 yyyy-MM-dd
function GetShortDate(myDateTime)
{
	var myDateTimeArr=myDateTime.split(" ");
	return myDateTimeArr[0];
}

//超短日期格式 MM-dd
function GetShortestDate(myDateTime)
{
	var myDateTimeArr=myDateTime.split(" ");
	myDateTime=myDateTimeArr[0];
	myDateTimeArr=myDateTime.split("-");
	myDateTime=myDateTimeArr[1]+"-"+myDateTimeArr[2];
	return myDateTime;
}

//判断日期
function JudgeDate(myJudgedTime)
{
	var myReturnHtml="color:#000000;";
	var myDateNow=new Date();
	var myYear=myDateNow.getFullYear();    //获取完整的年份(4位,1970-????)
	var myMonth=myDateNow.getMonth()+1;       //获取当前月份(0-11,0代表1月)
	var myDay=myDateNow.getDate();        //获取当前日(1-31)
	
	var myJudgedTimeArr=myJudgedTime.split("-");
	var myJudgeYear=myJudgedTimeArr[0];
	var myJudgeMonth=myJudgedTimeArr[1];
	var myJudgeDay=myJudgedTimeArr[2];
	
	if(myJudgeYear>myYear)
		myReturnHtml="color:#FF0000;";
	else if(myJudgeYear==myYear)
	{
		if(myJudgeMonth>myMonth)
			myReturnHtml="color:#FF0000;";
		else if(myJudgeMonth==myMonth)
		{
			if(myJudgeDay>myDay)
				myReturnHtml="color:#FF0000;";
		}
	}
	
	return myReturnHtml;
}