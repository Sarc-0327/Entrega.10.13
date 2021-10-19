$(document).ready(function(){
    var obj =[
        {
            name: "uno"
        },
        {
            name: "dos"
        },
        {
            name: "tres"
        }
    ]

    var el_li = ""

    for(let i=0;i<obj.length;i++)
        el_li += "<li>"+obj[i].name+"</li>"
    
    console.log(el_li)
    $(".prueba").html(el_li)
})