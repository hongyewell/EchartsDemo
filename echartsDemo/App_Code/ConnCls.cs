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

/// <summary>
/// DataBase 的摘要说明
/// </summary>
namespace CAR.CARConnCls
{
    public class ConnCls
    {
        public SqlConnection myConnection;
        public ConnCls()
	    {
		    //
		    // TODO: 在此处添加构造函数逻辑
		    //
	    }

        //标识连接是否类函数自己打开，如果是还要关闭
        bool myDBConSelfOpen = false;
        //自动打开连接
        private void OpenCon()
        {
            if (myConnection == null)
            {
                string myConnStr = System.Configuration.ConfigurationManager.AppSettings["connstr"].ToString();
                myConnection = new SqlConnection(myConnStr);
                myConnection.Open();

                myDBConSelfOpen = true;
            }
        }
        //自动关闭连接
        private void CloseCon()
        {
            if (myDBConSelfOpen == true)
            {
                myConnection.Close();
                myConnection.Dispose();
                myConnection = null;

                myDBConSelfOpen = false;
            }
        }

        //获取第一行记录
        public DataRow GetDataRow(string mySql)
        {
            DataRow myRow = null;
            try
            {
                DataTable myTable = GetDataTable(mySql);
                if (myTable.Rows.Count > 0)
                {
                    myRow = myTable.Rows[0];
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return myRow;
        }

        //获取多条记录
        public DataSet GetDataSet(string mySql)
        {
            //声明数据集 myDataSe
            DataSet myDataSet = new DataSet();

            try
            {
                OpenCon();
                //声明适配器 myDataAdapter用于连接 DataSet 与数据库
                SqlDataAdapter myDataAdapter = new SqlDataAdapter(mySql, myConnection);

                //将数据装填到 DataSet中
                myDataAdapter.Fill(myDataSet);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            CloseCon();

            //返回数据集 myDataSet
            return myDataSet;
        }

        //获取多条记录
        public DataTable GetDataTable(string mySql)
        {
            //声明数据集 myDataSe
            DataTable myTable = new DataTable();

            try
            {
                myTable = GetDataSet(mySql).Tables[0];
            }
            catch (Exception ex)
            {
                throw ex;
            }
            //返回数据集 myDataSet
            return myTable;
        }

        /// <summary>
        /// 执行操作数据库的命令（增、删、改）含参数
        /// </summary>
        /// <param name="strQuery">操作数据库的SQL语句</param>
        public bool ExecuteSql(string mySql)
        {
            bool flag = true;

            //打开数据库
            OpenCon();
            SqlTransaction myTra = myConnection.BeginTransaction();
            //创建操作数据库的命令
            SqlCommand myCommand = new SqlCommand(mySql, myConnection, myTra);
            try
            {
                //执行命令
                myCommand.ExecuteNonQuery();
                myTra.Commit();
            }
            catch (Exception ex)
            {
                flag = false;
                myTra.Rollback();
                throw ex;
            }
            CloseCon();

            return flag;
        }

        //根据UserID获取UserName；格式:,UserID,UserID,……
        public string GetUserNameByUserID(string myUserID)
        {
            string myUserName = "";
            string[] myUserIDArr = myUserID.Split(',');
            
            for (int i = 0; i < myUserIDArr.Length; i++)
            {
                myUserID = myUserIDArr[i].ToString();
                if (myUserID != "")
                {
                    string mySql = "select UserName from tbl_User where UserID='" + myUserID + "'";
                    DataRow myRow = GetDataRow(mySql);
                    if (myRow != null)
                    {
                        myUserName += myRow["UserName"].ToString() + ",";
                    }
                }
            }

            if (myUserName != "")
            {
                myUserName = myUserName.Remove(myUserName.Length - 1, 1);
            }

            return myUserName;
        }

        //根据ID获取Title
        public string GetTitleByID(string myID, string myTable)
        {
            string myTitle = "";

            if (myID != "")
            {
                string mySql = "select Title from " + myTable + " where ID=" + myID;
                DataRow myRow = GetDataRow(mySql);
                if (myRow != null)
                {
                    myTitle = myRow["Title"].ToString();
                }
            }

            return myTitle;
        }

        //根据ID获取PicPath
        public string GetPicPathByID(string myID, string myTable)
        {
            string myPicPath = "";

            if (myID != "")
            {
                string mySql = "select PicPath from " + myTable + " where ID=" + myID;
                DataRow myRow = GetDataRow(mySql);
                if (myRow != null)
                {
                    myPicPath = myRow["PicPath"].ToString();
                }
            }

            return myPicPath;
        }

        //根据表名称、字段获取最大ID
        public int GetMaxID(string myTable, string myField)
        {
            int myMaxID = 1;
            string mySql = "select Max(" + myField + ") as MaxID from " + myTable + "";
            DataRow myRow = GetDataRow(mySql);
            if (myRow != null)
            {
                if (myRow["MaxID"].ToString() != "")
                {
                    myMaxID = Convert.ToInt32(myRow["MaxID"].ToString()) + 1;
                }
            }

            return myMaxID;
        }

        //根据PopedomSign获取PopedomName
        public string GetPopedomNameBySign(string myPopedomSign)
        {
            string myPopedomName = "";

            if (myPopedomSign != "")
            {
                string[] myPopedomSignArr = myPopedomSign.Split(',');
                string mySql = "";

                for (int i = 1; i < myPopedomSignArr.Length - 1; i++)
                {
                    mySql = "select PopedomName from tbl_Popedom where PopedomSign='" + myPopedomSignArr[i].ToString() + "'";
                    DataRow myRow = GetDataRow(mySql);
                    if (myRow != null)
                    {
                        myPopedomName += myRow["PopedomName"].ToString() + ",";
                    }
                }
            }

            if (myPopedomName != "")
                myPopedomName = myPopedomName.Substring(0, myPopedomName.Length - 1);

            return myPopedomName;
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
        public string FormatJson(string myJsonStr)
        {
            string myFormatJsonStr = "";

            if (myJsonStr == "")
                return myFormatJsonStr;

            myJsonStr = myJsonStr.Replace(":", "□");
            myJsonStr = myJsonStr.Replace(";", "■");
            myJsonStr = myJsonStr.Replace("\"", "☆");
            myJsonStr = myJsonStr.Replace("'", "★");
            myJsonStr = myJsonStr.Replace("</", "△");
            myJsonStr = myJsonStr.Replace("/>", "▲");
            myJsonStr = myJsonStr.Replace("<", "○");
            myJsonStr = myJsonStr.Replace(">", "●");
            myJsonStr = myJsonStr.Replace("\r", "◇");
            myJsonStr = myJsonStr.Replace("\n", "◆");
            myJsonStr = myJsonStr.Replace(",", "◎");
            myJsonStr = myJsonStr.Replace("[", "♂");
            myJsonStr = myJsonStr.Replace("]", "♀");
            myJsonStr = myJsonStr.Replace("&", "¤");
            
            myFormatJsonStr = myJsonStr;
            return myFormatJsonStr;
        }

        public string FormatStr(string myJsonStr)
        {
            string myFormatJsonStr = "";

            if (myJsonStr == "")
                return myFormatJsonStr;

            myJsonStr = myJsonStr.Replace("□", ":");
            myJsonStr = myJsonStr.Replace("■", ";");
            myJsonStr = myJsonStr.Replace("☆", "\"");
            myJsonStr = myJsonStr.Replace("★", "'");
            myJsonStr = myJsonStr.Replace("△", "</");
            myJsonStr = myJsonStr.Replace("▲", "/>");
            myJsonStr = myJsonStr.Replace("○", "<");
            myJsonStr = myJsonStr.Replace("●", ">");
            myJsonStr = myJsonStr.Replace("◇", "\r");
            myJsonStr = myJsonStr.Replace("◆", "\n");
            myJsonStr = myJsonStr.Replace("◎", ",");
            myJsonStr = myJsonStr.Replace("♂", "[");
            myJsonStr = myJsonStr.Replace("♀", "]");
            myJsonStr = myJsonStr.Replace("¤", "&");

            myFormatJsonStr = myJsonStr;
            return myFormatJsonStr;
        }
    }
}
