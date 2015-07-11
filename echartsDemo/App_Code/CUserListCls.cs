using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// CUserListCls 的摘要说明
/// </summary>
namespace CAR.CARCls
{
    public class CUserListCls
    {
        public CUserListCls()
        {
            //
            // TODO: 在此处添加构造函数逻辑
            //
            Info = new List<CUserInfoCls>();
        }

        public int InfoListCount { get; set; }
        public List<CUserInfoCls> Info;
    }
}