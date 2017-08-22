/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var code;
function createCode() {
    code = "";
    var codeLength = 4;//验证码的长度  
    var checkCode = document.getElementById("code");
    var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
            'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');//随机数  
    for (var i = 0; i < codeLength; i++) {//循环操作  
        var index = Math.floor(Math.random() * 36);//取得随机数的索引（0~35）  
        code += random[index];//根据索引取得随机数加到code上  
    }
    checkCode.value = code;//把code值赋给验证码  
}
//校验验证码  
function validate() {
    var inputCode = document.getElementById("vcode").value.toUpperCase(); //取得输入的验证码并转化为大写        
    if (inputCode.length <= 0) { //若输入的验证码长度为0  

        return 0;//则弹出请输入验证码  
    }
    else if (inputCode !== code) { //若输入的验证码与产生的验证码不一致时  
        //alert("验证码输入错误！@_@"); //则弹出验证码输入错误  
        createCode();//刷新验证码  
        document.getElementById("vcode").value = "";//清空文本框 
        return 1;
    }
    else { //输入正确时  
        //alert("^-^");
        return 2;//弹出^-^  
    }
}

var ticket = null;
var tinfo="";
var temail="";
function showCodeImage()
{
    $.post("./HandleGetWechatTicket", {flag: "0"}, function (result)
    {
        if (result === "")
        {
            alert("很抱歉，生成微信二维码失败，请重新尝试！");

        }
        else
        {
            var info = JSON.parse(result);
            if (info.errcode !== undefined && info.errcode !== null)
            {
                alert("很抱歉，生成微信二维码失败，请重新尝试！");
            }
            else
            {
                ticket = info.ticket;
                var url = encodeURI(ticket);
                var modal = document.getElementById("myModal");

                var content = '<div class="modal-dialog">'
                        + '<!-- Modal content-->'
                        + '<div class="modal-content">'
                        + '<div class="modal-header">'
                        + '<button type="button" class="close" data-dismiss="modal">&times;</button>'
                        + '<h4><span class="fa fa-lock"></span>请先关注我们的公共号</h4>'
                        + '</div>'
                        + '<div class="modal-body" style="padding:40px 50px;">'
                        + '<div style="text-align:center;"><img src="https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + url + '" style="width:430px;height:430px;"</div>'
                        + '</div>'
                        + '<div class="modal-footer">'
                        + '<p>已经关注? <a href="javascript:void(0)" onclick="showRegistration()">请继续</a></p>'
                        + '</div>'
                        + '</div>'

                        + '</div>';
                modal.innerHTML = content;
                $('#myModal').modal({backdrop: 'static', keyboard: false});
            }
        }
    });
}

function showRegistration()
{
    var modal = document.getElementById("myModal");

    var content = '<div class="modal-dialog">'
            + '<!-- Modal content-->'
            + '<div class="modal-content">'
            + '<div class="modal-header">'
            + '<button type="button" class="close" data-dismiss="modal">&times;</button>'
            + '<h4><span class="fa fa-lock"></span> 注册</h4>'
            + '</div>'
            + '<div class="modal-body" style="padding:40px 50px;padding-top: 10px;">'
            + '<form role="form" action="" method="post">'
            + ' <div class="form-group">'
            + ' <label for="username"><span class="fa fa-user"></span>  姓名</label>'
            + ' <input type="text" class="form-control" id="name" placeholder="输入名字" name="name">'
            + '</div>'
            + ' <div class="form-group">'
            + ' <label for="username"><span class="fa fa-envelope-o"></span> 电子邮箱</label>';
            if(temail!=="")
            {
                content+=' <input type="text" class="form-control" id="email" placeholder="输入邮箱/微信" name="email" value="'+temail+'" disabled>';
            }
            else
            {
                content+=' <input type="text" class="form-control" id="email" placeholder="输入邮箱/微信" name="email">';
            }
            content+= '</div>'
            + '<div class="form-group">'
            + '<label for="password"><span class="fa fa-eye"></span>密码</label>'
            + '<input type="password" class="form-control" id="password" placeholder="输入密码" name="password">'
            + '</div>'
            + '<div class="form-group">'
            + '<label for="password"><span class="fa fa-eye"></span>确认密码</label>'
            + '<input type="password" class="form-control" id="cpassword" placeholder="确认密码" name="password">'
            + '</div>'

            + '<div class="form-group">'
            + '<label for="validate_code"><span class="fa fa-eye"></span>验证码</label><br/>'
            + '<input type="validate_code" class="form-control" id="vcode" placeholder="输入验证码" name="vcode" style="width:200px; display:inline-block;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type = "button" style="display:inline-block; height:34px; color:red;" id="code" onclick="createCode()"/>'
            + '</div>'

            + '<button type="button" class="btn btn-success btn-block" onclick="handleRegistration()"><span class="fa fa-off"></span> 注册</button>'
            + '</form>'
            + '</div>'
            + '<div class="modal-footer">'
            + '<button type="submit" class="btn btn-danger btn-default pull-left" data-dismiss="modal"><span class="fa fa-remove"></span> 取消</button>'
            + '<p>已经注册? <a href="javascript:void(0)" onclick="showLogIn()">登录</a></p>'
            + '</div>'
            + '</div>'

            + '</div>';
    modal.innerHTML = content;
    $('#myModal').modal({backdrop: 'static', keyboard: false});
    createCode();
}


function showLogIn()
{
    var modal = document.getElementById("myModal");

    var content = '<div class="modal-dialog">'
            + '<!-- Modal content-->'
            + '<div class="modal-content">'
            + '<div class="modal-header" style="padding:35px 50px;">'
            + '<button type="button" class="close" data-dismiss="modal">&times;</button>'
            + '<h4><span class="fa fa-lock"></span> 登录</h4>'
            + '</div>'
            + '<div class="modal-body" style="padding:40px 50px;">'
            + '<form role="form" action="./HandleLogin" method="post">'
            + ' <div class="form-group">'
            + ' <label for="username"><span class="fa fa-user"></span> 账户</label>'
            
            +' <input type="text" class="form-control" id="email" placeholder="输入邮箱/微信" name="email"></div>'
            + '<div class="form-group">'
            + '<label for="password"><span class="fa fa-eye"></span>密码</label>'
            + '<input type="password" class="form-control" id="password" placeholder="输入密码" name="password">'
            + '</div>'
            + '<button type="button" class="btn btn-success btn-block" onclick="handleLogIn();"><span class="fa fa-off"></span> 登录</button>'
            + '</form>'
            + '</div>'
            + '<div class="modal-footer">'
            + '<button type="submit" class="btn btn-danger btn-default pull-left" data-dismiss="modal"><span class="fa fa-remove"></span> 取消</button>'
            + '<p>新用户 <a href="javascript:void(0)" onclick="showRegistration()">注册?</a></p>'
            + '<p>忘记了 <a href="javascript:void(0)" onclick="helpPassword()">密码?</a></p>'
            + '</div>'
            + '</div>'

            + '</div>';
    modal.innerHTML = content;
    $('#myModal').modal({backdrop: 'static', keyboard: false});
}

function handleLogIn()
{
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    $.post("./HandleLogin", {email: email, password: password}, function (result)
    {
        if (result === "0")
        {
            alert("很抱歉，登录失败，请重新登录！");

        }
        else if (result === "1")
        {
            alert("账户或密码不正确，请重新登录！");
        }
        else if (result === "2")
        {
            window.location = "./Admin/index.jsp";
        }
        else if (result === "3")
        {
            window.location = "./SurveyUser/index.jsp";
        }
    });
}

function showRegister(option,info,email)
{
    option=parseInt(option);
    if(option===1)
    {
        tinfo=info;
        temail=email;
        showCodeImage();
    }
    
}

function handleRegistration()
{
    var vcode = validate();
    if (vcode === 0)
    {
        alert("请输入验证码！");
    }
    else if (vcode === 1)
    {
        alert("验证码输入错误！@_@");
    }
    else
    {
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        if (name === "" || email === "" || password === "" || ticket === null)
        {
            alert("信息不能为空");
        }
        else
        {
            ticket=encodeURI(ticket);
            $.post("./HandleRegistration", {name: name, email: email, password: password,ticket:ticket,info:tinfo}, function (result)
            {
                if (result === "0")
                {
                    alert("很抱歉，注册失败，请重新注册！");

                }
                else if (result === "-1")
                {
                    alert("请首先关注我们的微信公众号");
                }
                else if (result === "1")
                {
                    alert("此邮箱已经注册，请直接登录！");
                }
                else if (result === "2")
                {
                    alert("我们已经向你的微信发送了激活链接，请查看你的微信，完成注册！");
                }
                else
                {
                    alert("微信验证发生异常，请稍后再试");
                }
            });
        }
    }

}

function showRegistrationStatus(value)
{
    var parent=document.getElementById("activatePage");
    if (value === "1")
    {
        parent.innerHTML="欢迎你，注册激活已经成功，你现在可以无限畅游我们的服务。";
    }
    else if(value==="0")
    {
         parent.innerHTML="非常抱歉，你的注册激活没有成功";
    }
    else
    {
        parent.innerHTML="无效的链接";
    }
}