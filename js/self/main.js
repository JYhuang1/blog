/**
 * Created by henry on 2016/1/2.
 */


$(".banner").on("click",function(){
    $(this).children('ul').toggle();
});
var server = "http://"+location.hostname+ ":8080/blog/";
//var server = "http://115.28.33.164:8080/blog/";
var param = {};
function selectByTag(){
    param['dataJson'] = JSON.stringify({author:"拾荒者"});
    $.post(server+"selectByAuthor",param,function(data){
        var dataJson = $.parseJSON(data);
        if (dataJson.status == 0){
            var num = dataJson.data.length;
            for(var i=0;i<num;i++){
                $('#content').append(
                    "<div>"+
                    "<span style='font-size: 18px;' id='uuid"+i+"'>"+dataJson.data[i].title+"</span>"+
                    "<div class='row' style='font-size: 16px'>"+
                    "<span class='col-sm-3'>"+
                    "<span class='glyphicon glyphicon-thumbs-up'></span>"+
                    "<span style='margin-left: 3px'>1</span>"+
                    "</span>"+
                    "<span class='col-sm-3'>" +
                    "<span class=' glyphicon glyphicon-envelope'></span>" +
                    "<span style='margin-left: 3px'>"+dataJson.data[i].comments+"</span>"+
                    "</span>"+
                    "<span class='col-sm-3'>" +
                    "<span class=' glyphicon glyphicon-time'></span>" +
                    "<span style='margin-left: 3px'>"+dateToString(dataJson.data[i].createTime)+"</span>"+
                    "</span>"+
                    "<span class='col-sm-3'>" +
                    "<span class=' glyphicon glyphicon-tag'></span>" +
                    "<span style='margin-left: 3px'>"+getTagNameByTagNo(dataJson.data[i].tag)+"</span>"+
                    "</span>"+
                    "</div>"+
                    "</div><hr style='margin: 10px 0px 10px 0px'>"
                );
                document.getElementById("uuid"+i+"").value=dataJson.data[i].uuid;
            }
            $("span[id^='uuid']").on('click',function () {
                location.href = "detail.html?uuid="+document.getElementById($(this).attr("id")).value;
            });
        }else{
            alert(dataJson.message);
        }
    })
}
function getTagNameByTagNo(tagNo){
    var tagName = null;
    param['dataJson'] = JSON.stringify({tagNo:tagNo});
    $.ajaxSetup({
        async: false
    });
    $.post(server+"getTagNameByTagNo",param,function(data){
        tagName = $.parseJSON(data).data;
    });
    return tagName;
}

function dateToString(longDate){
    var date = new Date(longDate);
    month = date.getMonth()+1;
    var returnDate = date.getFullYear().toString().substring(2,4)+"-"+month+"-"+date.getDate();
    return returnDate;
}

function getUrlParam(){
    var url = location.search;
    var theParam = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theParam[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
        }
    }
    return theParam;
}