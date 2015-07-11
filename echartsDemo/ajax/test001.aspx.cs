using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using Newtonsoft.Json;
using CAR.CARConnCls;
using CAR.CARCls;


public partial class ajax_test001 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string myReturnValue = GetListInfo();
        Response.Write(myReturnValue);
        Response.End();
    }
    private string GetListInfo()
    {
        List<CListCls> myJsonList = new List<CListCls>();
        CListCls myListCls = new CListCls();
        ConnCls myConnCls = new ConnCls();
        string myJsonStr = "";
        int myInfoListCount = 0;

        string mySql = GetQuerySql();
        myListCls.InfoListCount = myInfoListCount;

        DataTable myTable = myConnCls.GetDataTable(mySql);
        foreach (DataRow myRow in myTable.Rows)
        {
           
            string myname = myRow["CName"].ToString();
            string mynumber = myRow["CNumber"].ToString();          
            CInfoCls myInfoCls = new CInfoCls();
            myInfoCls.CName = myname;
            myInfoCls.CNumber = mynumber;                  
            myListCls.Info.Add(myInfoCls);
        }
        myJsonList.Add(myListCls);

        myJsonStr = JsonConvert.SerializeObject(myJsonList);
          
        return myJsonStr;

    }
    //设置查询条件
    private string GetQuerySql()
    {
        ConnCls myConnCls = new ConnCls();
        string mySql = "select * from CBarTest";
        return mySql;
    }
}