/// <reference path="../ajax/AdminLogin.aspx" />
/// <reference path="../ajax/AdminLogin.aspx" />
//等待框位置设置
function ShowLoadingPosition() {
    $("#div_loading").css("position", "absolute");
    var myTop = parseFloat($("#div_login").offset().top);
    var myLeft = parseFloat($("#div_login").offset().left);
    $("#div_loading").css("top", myTop);
    $("#div_loading").css("left", myLeft);
}

//Ajax回调函数
function OnLogin(myJsonStr) {
    var myMsg = "登录用户或登录密码不正确，请查证后重新输入！";
   
   
    var myJsonObject = eval('(' + myJsonStr + ')');


    var myReturnValue = myJsonObject[0].ReturnInfo[0].state;
   
    if (myReturnValue == "ok") {
        var myUserID = $("#username").val();
       
        window.open("../UI/main.html");
        return false;
    }

    //$("#div_loading").css("display", "none");
    alert(myMsg);
}

function AdminLogin() {
   
    var myUserName = $("#username").val();
    if (myUserName == "") {
        alert("用户名不能为空！");
        return false;
    }

    var myUserPassword = $("#password").val();
    if (myUserPassword == "") {
        alert("密码不能为空！");
        return false;
    }   
  //  ShowLoadingPosition();
   
    var myUrl = "../ajax/AdminLogin.aspx?myUserName=" + myUserName + "&myUserPassword=" + myUserPassword;
   
    //$.getJSON(myUrl, {}, OnCorrectLogin);
    $.ajax({
        //url: "../ajax/AdminLogin.aspx?myUserName=" + myUserName + "&myUserPassword=" + myUserPassword,
        url: myUrl,
        datatype: "json",
        type: 'get',
        
        success: function (myJsonStr) {   //成功后回调
         
            OnLogin(myJsonStr);
       
        },
        error: function (myJsonStr) {    //失败后回调
          
            OnLogin(myJsonStr);
           
            $("#div_loading").css("display", "none");
           
        },
    //    beforeSend: function () {  //发送请求前调用，可以放一些"正在加载"之类的话
    //      //$("#div_loading").css("display", "block");
          

    //    }
    });
 

}

function TxtReset() {
    $("#zmUserName").val("");
    $("#zmUserPassword").val("")
}

function LoginOnKey(event) {
    event = event || window.event;
    if (event.keyCode == 13) {
        AdminLogin();
    }
}

function OnLogout(myJsonObject) {
    window.parent.window.open("../login.html", "_self");
}

function ExitSys() {
    if (confirm("确定退出系统？") == false)
        return false;

    var myUserID = $("#HidUserID").val();
    var myUrl = "../ajax/AdminLogout.aspx?myUserID=" + encodeURI(myUserID);
    $.getJSON(myUrl, {}, OnLogout);
}

//获取用户信息
function GetUserInfo() {
    var myUserID = GetParentRequest("UserID");
    var myUrl = "../ajax/GetUserList.aspx?myUserID=" + encodeURI(myUserID) + "&myTop=15&myPageNum=1";
    $.getJSON(myUrl, {}, OnGetUserInfo);
}

//正确获取用户信息
function OnGetUserInfo(myJsonObject) {
    myJsonObject = myJsonObject[0];
    var myUserID = myJsonObject.Info[0].UserID;
    var myUserName = myJsonObject.Info[0].UserName;
    var myUserPopedom = myJsonObject.Info[0].UserPopedom;
    var myUserSex = myJsonObject.Info[0].UserSex;
    var myUserSexName = myJsonObject.Info[0].UserSexName;

    $("#HidUserID").val(myUserID);
    $("#HidUserName").val(myUserName);
    $("#HidUserPopedom").val(myUserPopedom);
    $("#HidUserSex").val(myUserSex);
    $("#HidUserSexName").val(myUserSexName);

    window.parent.frames["frame_middle"].window.document.getElementById("span_UserName").innerHTML = "<a href=\"javascript:void(0);\""
	    + " onclick=\"javascript:GotoChangePasswordPage('"+myUserID+"');\" title=\"点击修改登录密码\" >" + myUserName + "</a> [" + myUserSexName + "]";
    window.parent.frames["frame_middle"].window.document.getElementById("HidUserID").value = myUserID;

    LeftTreeInit(myUserID, myUserName, myUserPopedom);
}

function GotoChangePasswordPage(myUserID) {
    var http = "../ChangeUserKey.html?myUserID=" + myUserID;
    var Modal = "dialogwidth:400px;dialogheight:300px; location:no; status:no;scroll:no;";

    try
    {
        var returnValue = window.showModalDialog(http, window, Modal);
    }
    catch (e)
    {
        var winOption = "height=300px,width=400px,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,fullscreen=0";
        window.open(http, window, winOption);
    }

    //    if(returnValue!=undefined)
    //    {
    //        if(returnValue!="")
    //        {   
    //            
    //            return true;
    //        }
    //    }
    return false;
}

//修改密码
function ChangePassword() {
    var myPassword1 = $("#zmPassword1").val();
    var myPassword2 = $("#zmPassword2").val();

    if (myPassword1 == "" && myPassword2 == "") {
        alert("新密码不能为空！");
        return false;
    }

    if (myPassword1 != myPassword2) {
        alert("新密码和确认密码不一致！");
        return false;
    }

    var myUserID = GetRequest("myUserID");
    var myUrl = "ajax/ChangePassword.aspx?myUserID=" + myUserID + "&myUserPassword=" + myPassword1;
    $.getJSON(myUrl, {}, OnChangePassword);
}

function OnChangePassword(myJsonObject) {
    var myMsg = "修改密码失败！";
    var myReturnValue = myJsonObject[0].ReturnInfo[0].state;
    if (myReturnValue == "ok") {
        myMsg = "修改密码成功！";
    }

    alert(myMsg);
    window.close();
}

//***********************左边树初始化 开始*********************************
var zTree;
var demoIframe;
var zNodes = [];

var setting = {
    view: {
        dblClickExpand: false,
        showLine: true,
        selectedMulti: false,
        expandSpeed: "fast"
    },
    data: {
        simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "pId",
            rootPId: ""
        }
    },
    callback: {
        beforeClick: function (treeId, treeNode) {
            zTree = $.fn.zTree.getZTreeObj("zmLeftTree");
            if (treeNode.isParent) {
                zTree.expandNode(treeNode);
                return false;
            } else {
                demoIframe.attr("src", treeNode.file);
                return true;
            }
        }
    }
};

function loadReady() {
    var myWidth = document.compatMode == "CSS1Compat" ? document.documentElement.clientWidth : document.body.clientWidth;
    var myHeight = document.compatMode == "CSS1Compat" ? document.documentElement.clientHeight : document.body.clientHeight;
    myWidth = parseFloat(myWidth) - 190;
    myHeight = parseFloat(myHeight) + 10;

    demoIframe.height(myHeight);
    demoIframe.width(myWidth)
}

//左边树初始化
function LeftTreeInit(myUserID, myUserName, myUserPopedom) {
    var myFile = "";

    zNodes.push({
        id: 1, pId: 0, name: "后台管理", open: true, iconOpen: "../css/zTreeStyle/img/diy/1_open.png",
        iconClose: "../css/zTreeStyle/img/diy/1_close.png"
    });

    if (myUserID == "admin") {
        myFile = "UserManager.html?myUserID=" + myUserID + "&myUserName=" + encodeURI(myUserName);
        zNodes.push({ id: 101, pId: 1, name: "系统管理员", file: myFile, icon: "../css/zTreeStyle/img/diy/2.png" });
    }

    if(myUserPopedom.indexOf(",R_TZGG,")>=0 || myUserID=="admin")
    {
        myFile = "tzggManager.html?myUserID=" + myUserID + "&myUserName=" + encodeURI(myUserName);
        zNodes.push({ id: 201, pId: 1, name: "通知公告", file: myFile, icon: "../css/zTreeStyle/img/diy/2.png" });
    }

    if (myUserPopedom.indexOf(",R_XBGK,") >= 0 || myUserID == "admin") {
        myFile = "xbgkManager.html?myUserID=" + myUserID + "&myUserName=" + encodeURI(myUserName);
        zNodes.push({ id: 301, pId: 1, name: "系部概况", file: myFile, icon: "../css/zTreeStyle/img/diy/2.png" });
    }

    if (myUserPopedom.indexOf(",R_XBXW,") >= 0 || myUserID == "admin") {
        myFile = "xbxwManager.html?myUserID=" + myUserID + "&myUserName=" + encodeURI(myUserName);
        zNodes.push({ id: 401, pId: 1, name: "系部新闻", file: myFile, icon: "../css/zTreeStyle/img/diy/2.png" });
    }

    if (myUserPopedom.indexOf(",R_ZYJS,") >= 0 || myUserID == "admin") {
        zNodes.push({
            id: 5, pId: 1, name: "专业介绍", open: false, iconOpen: "../css/zTreeStyle/img/diy/fopen.gif",
            iconClose: "../css/zTreeStyle/img/diy/fclose.gif"
        });

        myFile = "zyjsManager.html?myTypeID=1&myUserID=" + myUserID + "&myUserName=" + encodeURI(myUserName);
        zNodes.push({ id: 501, pId: 5, name: "专业一", file: myFile, icon: "../css/zTreeStyle/img/diy/2.png" });

        myFile = "zyjsManager.html?myTypeID=2&myUserID=" + myUserID + "&myUserName=" + encodeURI(myUserName);
        zNodes.push({ id: 502, pId: 5, name: "专业二", file: myFile, icon: "../css/zTreeStyle/img/diy/2.png" });
    }

    if (myUserPopedom.indexOf(",R_JXKY,") >= 0 || myUserID == "admin") {
        zNodes.push({
            id: 6, pId: 1, name: "教学科研", open: false, iconOpen: "../css/zTreeStyle/img/diy/fopen.gif",
            iconClose: "../css/zTreeStyle/img/diy/fclose.gif"
        });

        myFile = "jxkyManager.html?myTypeID=0&myUserID=" + myUserID + "&myUserName=" + encodeURI(myUserName);
        zNodes.push({ id: 601, pId: 6, name: "教学工作", file: myFile, icon: "../css/zTreeStyle/img/diy/2.png" });

        myFile = "jxkyManager.html?myTypeID=1&myUserID=" + myUserID + "&myUserName=" + encodeURI(myUserName);
        zNodes.push({ id: 602, pId: 6, name: "质量工程", file: myFile, icon: "../css/zTreeStyle/img/diy/2.png" });

        myFile = "jxkyManager.html?myTypeID=2&myUserID=" + myUserID + "&myUserName=" + encodeURI(myUserName);
        zNodes.push({ id: 603, pId: 6, name: "科研工作", file: myFile, icon: "../css/zTreeStyle/img/diy/2.png" });

        myFile = "jxkyManager.html?myTypeID=3&myUserID=" + myUserID + "&myUserName=" + encodeURI(myUserName);
        zNodes.push({ id: 604, pId: 6, name: "科研成果", file: myFile, icon: "../css/zTreeStyle/img/diy/2.png" });
    }

    if (myUserPopedom.indexOf(",R_DJGZ,") >= 0 || myUserID == "admin") {
        myFile = "djgzManager.html?myUserID=" + myUserID + "&myUserName=" + encodeURI(myUserName);
        zNodes.push({ id: 701, pId: 1, name: "党建工作", file: myFile, icon: "../css/zTreeStyle/img/diy/2.png" });
    }
   
    if (myUserPopedom.indexOf(",R_XSGL,") >= 0 || myUserID == "admin") {
        zNodes.push({
            id: 8, pId: 1, name: "学生管理", open: false, iconOpen: "../css/zTreeStyle/img/diy/fopen.gif",
            iconClose: "../css/zTreeStyle/img/diy/fclose.gif"
        });

        myFile = "stydManager.html?myTypeID=0&myUserID=" + myUserID + "&myUserName=" + encodeURI(myUserName);
        zNodes.push({ id: 801, pId: 8, name: "社团园地", file: myFile, icon: "../css/zTreeStyle/img/diy/2.png" });

        myFile = "zsjyManager.html?myTypeID=1&myUserID=" + myUserID + "&myUserName=" + encodeURI(myUserName);
        zNodes.push({ id: 802, pId: 8, name: "招生就业", file: myFile, icon: "../css/zTreeStyle/img/diy/2.png" });

        myFile = "xsglManager.html?myTypeID=2&myUserID=" + myUserID + "&myUserName=" + encodeURI(myUserName);
        zNodes.push({ id: 803, pId: 8, name: "学生工作", file: myFile, icon: "../css/zTreeStyle/img/diy/2.png" });

        myFile = "xsglManager.html?myTypeID=3&myUserID=" + myUserID + "&myUserName=" + encodeURI(myUserName);
        zNodes.push({ id: 804, pId: 8, name: "优秀学子", file: myFile, icon: "../css/zTreeStyle/img/diy/2.png" });
    }

    if (myUserPopedom.indexOf(",R_ZXLY,") >= 0 || myUserID == "admin") {
        myFile = "zxlyManager.html?myUserID=" + myUserID + "&myUserName=" + encodeURI(myUserName);
        zNodes.push({ id: 1001, pId: 1, name: "在线留言", file: myFile, icon: "../css/zTreeStyle/img/diy/2.png" });
    }

    if (myUserPopedom.indexOf(",R_LXWM,") >= 0 || myUserID == "admin") {
        myFile = "lxwmManager.html?myUserID=" + myUserID + "&myUserName=" + encodeURI(myUserName);
        zNodes.push({ id: 1101, pId: 1, name: "联系我们", file: myFile, icon: "../css/zTreeStyle/img/diy/2.png" });
    }

    var myTree = $("#zmLeftTree");
    myTree = $.fn.zTree.init(myTree, setting, zNodes);

    demoIframe = $("#zmRight_Frame");
    demoIframe.bind("load", loadReady);

    try {
        var myHeight = document.compatMode == "CSS1Compat" ? document.documentElement.clientHeight : document.body.clientHeight;
        myHeight = parseFloat(myHeight) + 10;
        document.getElementById("zmRight_Frame").style.height = myHeight;
    }
    catch (e) { }
}
//***********************左边树初始化 结束*********************************

