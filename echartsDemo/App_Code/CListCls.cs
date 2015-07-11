using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// CListCls 的摘要说明
/// </summary>
namespace CAR.CARCls
{
    public class CListCls
    {
        public CListCls()
        {
            //
            // TODO: 在此处添加构造函数逻辑
            //
            Info = new List<CInfoCls>();
        }

        public int InfoListCount { get; set; }
        public List<CInfoCls> Info;
    }
}