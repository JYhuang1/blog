/**
 * Created by henry on 2016/1/2.
 */


$(".banner").on("click",function(){
    $(this).children('ul').toggle();
});
var server = "http://"+location.hostname+ ":8080/blog/";
console.log(server);
var param = {};
function selectByTag(){
    param['dataJson'] = JSON.stringify({author:"拾荒者"});
    $.post(server+"selectByAuthor",param,function(data){
        var dataJson = $.parseJSON(data);
        if (dataJson.status == 0){
            var num = dataJson.data.length;
            console.log(dataJson.data.length);
            for(var i=0;i<num;i++){
                console.log(dataJson.data[i].tag);

                $('#content').append(
                    "<div style='border-bottom: 1px solid #eeeeee;padding-bottom: 4px'>"+
                    "<h2 style='font-size: 20px'><a href='detail.html' id='uuid"+i+"'>"+dataJson.data[i].title+"</a></h2>"+
                    "<p style='margin-top: 5px;margin-bottom: 5px;font-size: 14px'>"+dataJson.data[i].brief+"</p>"+
                    "<div class='row' style='font-size: 14px'>" +
                    "<span class='col-sm-3 glyphicon glyphicon-thumbs-up'>&nbsp;1</span>"+
                    "<span class='col-sm-3 glyphicon glyphicon-envelope'>&nbsp;"+dataJson.data[i].comments+"</span>"+
                    "<span class='col-sm-3 glyphicon glyphicon-time'>&nbsp;"+dateToString(dataJson.data[i].createTime)+"</span>"+
                    "<span class='col-sm-3 glyphicon glyphicon-tag'>&nbsp;"+getTagNameByTagNo(dataJson.data[i].tag)+"</span>"+
                    "</div>"+
                    "</div>"
                );
                document.getElementById("uuid"+i+"").value=dataJson.data[i].uuid;
            }
            $("a[id^='uuid']").click(function () {
                document.cookie="articleUuid="+document.getElementById($(this).attr("id")).value;
            });
        }else{
            alert(dataJson.message);
        }
    })
}
function getTagNameByTagNo(tagNo){

    var tagName = null;
    param['dataJson'] = JSON.stringify({tagNo:tagNo})
    $.ajaxSetup({
        async: false
    });
    $.post(server+"getTagNameByTagNo",param,function(data){
        tagName = $.parseJSON(data).data;
    });
    console.log(tagName);
    return tagName;
}

function dateToString(longDate){
    var date = new Date(longDate);
    month = date.getMonth()+1;
    var returnDate = date.getFullYear().toString().substring(2,4)+"-"+month+"-"+date.getDate();
    return returnDate;
}