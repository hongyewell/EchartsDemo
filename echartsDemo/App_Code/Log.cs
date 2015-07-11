using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Data.SqlClient;
using CAR.CARConnCls;

/// <summary>
/// Log 的摘要说明
/// </summary>
namespace CAR.CARLogCls
{
    public class LogCls
    {
        public LogCls()
        {
            //
            // TODO: 在此处添加构造函数逻辑
            //
        }

        public void WriteLog(string myUserID, string myContent)
        {
            ConnCls myConn = new ConnCls();
            string myUserName = myConn.GetUserNameByUserID(myUserID);
            string myLogDateTime = DateTime.Now.ToString();
            string mySql = "insert into tbl_Log (LogContent,UserID,UserName,LogDateTime) values("
                + "'" + myContent + "','" + myUserID + "','" + myUserName + "','" + myLogDateTime + "')";
            myConn.ExecuteSql(mySql);
        }
    }
}
