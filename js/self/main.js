/**
 * Created by henry on 2016/1/2.
 */

$(".banner").on("click",function(){
    $(this).children('ul').toggle();
});

//var server = "http://localhost:8080/blog/";
//var param = {};
//
//param['dataJson'] = JSON.stringify({category:0});
//$.post(server+"selectByCategory",param,function(data){
//    console.log(data);
//})
