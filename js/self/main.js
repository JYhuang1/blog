/**
 * Created by henry on 2016/1/2.
 */


$(".banner").on("click",function(){
    $(this).children('ul').toggle();
});

//var server = "http://localhost:8080/blog/";
var server = "http://115.28.33.164:8080/blog/";
var param = {};
function selectByTag(tag){
    param['dataJson'] = JSON.stringify({tag:tag});
    $.post(server+"selectByTag",param,function(data){
        var dataJson = $.parseJSON(data);
        if (dataJson.status == 0){
            var num = dataJson.data.length;
            for(var i=0;i<num;i++){
                $('#content').append(
                    "<div style='border-bottom: 1px solid #eeeeee;padding-bottom: 4px'>"+
                    "<h2 style='font-size: 20px'><a href='detail.html'>"+dataJson.data[i].title+"</a></h2>"+
                    "<p style='margin-top: 5px;margin-bottom: 5px'>"+dataJson.data[i].brief+"</p>"+
                    "<div class='row'>" +
                    "<span class='col-sm-3 glyphicon glyphicon-thumbs-up'>&nbsp;1</span>"+
                    "<span class='col-sm-3 glyphicon glyphicon-envelope'>&nbsp;"+dataJson.data[i].comments+"</span>"+
                    "<span class='col-sm-3 glyphicon glyphicon-time'>&nbsp;"+dateToString(dataJson.data[i].createTime)+"</span>"+
                    "<span class='col-sm-3 glyphicon glyphicon-tag'>&nbsp;前端</span>"+
                    "</div>"+
                    "</div>"
                );
            }
        }else{
            alert(dataJson.message);
        }
    })
}

function dateToString(longDate){
    var date = new Date(longDate);
    month = date.getMonth()+1;
    var returnDate = date.getFullYear().toString().substring(2,4)+"-"+month+"-"+date.getDate();
    return returnDate;
}