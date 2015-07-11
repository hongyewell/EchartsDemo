
function ListInit() {
    var myUrl = "ajax/test001.aspx";
    $.getJSON(myUrl, { }, onGetList);
}

function onGetList(myJsonObject) {
    WriteList(myJsonObject[0]);

}

function GetHeader() {
    var myHtml = "<table class=\"table table-bordered table-hover table-condensed\">"
    	        + "<thead>"
                + "<tr>"
                + "<th>"
                + "最新公告"
                + "</th> "
                + " <th>"
                + "发布时间"
                + "</th>"
                + "<th>"
                + "查看详情"
                + "</th>"
                + "</tr>"
                + " </thead>";

    return myHtml;
}

function WriteList(myJsonObject) {
   
    var myHtml = GetHeader();
    if (myJsonObject.Info.length > 0) {
        for (var i = 0; i <myJsonObject.Info.length; i++) {
          
            var myObj = myJsonObject.Info[i];

            var myID = myObj.ID;
            var mynews = myObj.Title;
            var mydate = myObj.WriteTime;     

            myHtml += 
                + "<tr>"
	        	//+ "<td>"
                //+ String(i + 1)
	            //+ "</td>"
	        	+ "<td >"
	            + mynews
	            + "</td>"

	            + "<td class=\"#\">"
               
	            + mydate
	            + "</td>"

                 + "<td class=\"#\">"
                  + "<a herf=\"../UI/main.html\">"
                 + "查看"
                  + "</a>"
	            + "</td>"
                + "</tr>";
                
        }

    }
    else {
        myHtml += "<tr><td class=\"#\" colspan=\"3\">sorry..读取数据失败！</td></tr>"
    }
    myHtml += "</table>";

    $("#List_lis").html(myHtml);
}
