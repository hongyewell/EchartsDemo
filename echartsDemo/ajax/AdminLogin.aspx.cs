using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using Newtonsoft.Json;
using CAR.CARConnCls;
using CAR.CARLogCls;
using CAR.CARCls;

public partial class ajax_AdminLogin : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

        string myUserName = Request["myUserName"].ToString();
        string myUserPassword = Request["myUserPassword"].ToString(); 
        //string myUserName = "dl";
        //string myUserPassword = "123"; 
        string myJsonStr = ValidateUser(myUserName, myUserPassword);
        Response.Write(myJsonStr);
        Response.End();    
    }

    private string ValidateUser(string myUserID, string myUserPassword)
    {
        this.Session["UserID"] = myUserID;
        string myJsonStr = "";
        string myState = "error";
        string myContent = "用户[" + myUserID + "]登录后台系统失败！";
       // myUserPassword = System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(myUserPassword, "MD5");
        string mySql = "select * from tbl_User where UserName = '" + myUserID+ "' and UserPassword = '" + myUserPassword + "'";
         
        ConnCls myConnCls = new ConnCls();
        DataRow myRow = myConnCls.GetDataRow(mySql);
        if (myRow != null)
        {
            myState = "ok";
            myContent = "用户[" + myUserID + "]登录后台系统成功！";
            
        }

        List<CReturnListCls> myJsonList = new List<CReturnListCls>();
        CReturnListCls myReturnListCls=new CReturnListCls();
        CReturnCls myReturnCls = new CReturnCls();
        myReturnCls.state = myState;
        myReturnListCls.ReturnInfo.Add(myReturnCls);
        myJsonList.Add(myReturnListCls);
        myJsonStr = JsonConvert.SerializeObject(myJsonList);

        //LogCls myLogCls = new LogCls();
        //myLogCls.WriteLog(myUserID, myContent);

        return myJsonStr;
  
    }
}