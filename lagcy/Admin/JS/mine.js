/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var totalTags=0;

function cnewTag(option)
{
    window.parent.newTag(option);
}

function newTag(option)
{
    if(option===0)
    {
        createTag("项目资讯");
    }
    else if(option===1)
    {
        createTag("项目管理");
    }
    else if(option===2)
    {
        createTag("调查分析");
    }
    
}

function createTag(name)
{
    var para=document.getElementById("nav_bar");
    var tag=document.createElement("div");
    tag.setAttribute("id","t"+totalTags);
    tag.setAttribute("data_value",totalTags);
    tag.setAttribute("class","preview__actions");
    tag.innerHTML="<div class='preview__action--buy'><a href='javascript:void(0)' class='btn btn--primary' onclick='showTag("+value+"')'>"+name+"</a></div>";
    para.appendChild(tag);
    totalTags++;
}

function initFrame()
{
    var ff = document.getElementById("ff");
    var para = ff.contentDocument || ff.contentWindow.document;
    para.getElementById("s1").addEventListener("click", function(){ newTag(0); });
}



