using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// CReturnListCls 的摘要说明
/// </summary>
namespace CAR.CARCls
{
    public class CReturnListCls
    {
        public CReturnListCls()
        {
            //
            // TODO: 在此处添加构造函数逻辑
            //
            ReturnInfo = new List<CReturnCls>();
        }

        public List<CReturnCls> ReturnInfo;
    }
}