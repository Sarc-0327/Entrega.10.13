$(document).ready(function(){

    var menu = [
        {
           name:'Home',
           link:"#header-wrap"
        },
        {
           name:'About',
           link:'#about'
        },
        {
           name:'Schedules',
           link:'#schedules'
        },
        {
           name:'Speakers',
           link:'#team'
        },
        {
            name:'Gallery',
            link:'#gallery'
        },
        {
            name:'Faq',
            link:'#faq'
        },
        {
            name:'Sponsors',
            link:'#sponsors'
        },
        {
            name:'Pricing',
            link:'#pricing'
        },
        {
            name:'Contact',
            link:'#google-map-area'
        }
    ];

   var frst_loop = "";
   var scd_loop = "";

   for(let i=0;i<menu.length;i++){
       frst_loop += `<li class="nav-item active">
       <a class="nav-link" href="`+menu[i].link+`">`+menu[i].name+`</a>
       </li>`

       scd_loop += `<li>
       <a class="page-scrool" href="`+menu[i].link+`">`+menu[i].name+`</a>
       </li>`
   };
    
   var menu_rdy = `
   <div class="container">
     <!-- Brand and toggle get grouped for better mobile display -->
     <div class="navbar-header">
       <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-navbar" aria-controls="main-navbar" aria-expanded="false" aria-label="Toggle navigation">
         <span class="navbar-toggler-icon"></span>
         <span class="icon-menu"></span>
         <span class="icon-menu"></span>
         <span class="icon-menu"></span>
       </button>
       <a href="index.html" class="navbar-brand"><img src="assets/img/logo.png" alt=""></a>
     </div>
     <div class="collapse navbar-collapse" id="main-navbar">
       <ul class="navbar-nav mr-auto w-100 justify-content-end prueba">

    ${frst_loop}

    <li class="nav-item nav-link api">
            API
        </li>
    <li class="nav-item nav-link change-color">?</li>
        </ul>
        </div>
        </div>

        <!-- Mobile Menu Start -->
        <ul class="mobile-menu">

    ${scd_loop}
    <li class="page-scrool api">
            API
        </li>
    </ul>`;

    $(".load-menu").html(menu_rdy);

    $(".change-color").click(function(){
        $("body").toggleClass('click-color');
      });

    $(".api").click(function(){
        $.ajax({
            type: 'GET',
            url: 'https://newsapi.org/v2/everything?q=bitcoin&apiKey=bfb5c52039404b5aab11508d32da4b6b',
            datatType: 'json',
            success: function(data){
                console.log("get",data)
            }
        });
    });

    var user = {};
    var att = ["name","email","phone","category","message"];
    var obj_size = 0;
    var obj_NotNull = 0;

    $("#form-submit").click(function(){
        /*Counters Reset*/
        obj_size=0;
        obj_NotNull=0;

        /*Attributes values acquisition*/
        for(i in att){
            console.log("For prueba",att[i]);
            user[att[i]]=document.getElementById(att[i]).value;
        }

        /*Null value and counters setting*/
        for (let i in user){
            user[i]=category_null(user[i]);
            obj_size++;
            if(user[i]!=null){obj_NotNull++};
        }
        
        /*Loading or Invalid Animation*/
        if(obj_size==obj_NotNull){
            for(i in user){
                val_success(`#${i}`,i);
            }
            show_loading();
            setTimeout(() =>{
                hide_loading()
            }, 3000)
        }
        else{
            for(i in user){
                if(user[i]==null)
                val_error(`#${i}`,i);
            }
            show_fail();
            setTimeout(() =>{
                hide_fail()
            }, 3000)
        }
        console.log(user);
      });
})

/*var newMenu = []
      menu.forEach(i => {
      newMenu.push(`<li class="nav-item">
                           <a class="nav-link page-scroll" href="#header"> ${i.name} <span class="sr-only">(current)</span></a>
                     </li>`)
   });

$(".load-menu").html(`<div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
           <ul class="navbar-nav ml-auto">
               ${newMenu.join('')}*/

function show_loading(){
    $(".loading").show();
}

function hide_loading(){
    $(".loading").hide();
}

function show_fail(){
    $(".fail").show();
}

function hide_fail(){
    $(".fail").hide();
}

function val_error(field_class,field){
    if(field=="category"){
        new_dft_opt("Invalid");
    }
    $(field_class).toggleClass("form-control-error");
    $(field_class).attr('placeholder','Invalid '+field);
    setTimeout(() =>{
        $(field_class).toggleClass("form-control-error");
        $(field_class).attr('placeholder',field);
        if(field=="category"){
            restore_dft_opt();
        }
    }, 3000)
}

function val_success(field_class,field){
    if(field=="category"){
        new_dft_opt("Valid");
    }
    $(field_class).val('');
    $(field_class).toggleClass("form-control-success");
    $(field_class).attr('placeholder','Valid '+field);
    setTimeout(() =>{
        $(field_class).toggleClass("form-control-success");
        $(field_class).attr('placeholder',field);
        if(field=="category"){
            restore_dft_opt();
        }
    }, 3000)
}

function category_null(category){
    if(category==''){category=null};
    return category;
}

function new_dft_opt(bool){
    $('#default_option').remove();
    $('#category').html(`<option id="default_option" selected value=''>${bool} category</option>`);   
}

function restore_dft_opt(){
    $('#default_option').remove();
    $('#category').html(`<option id="default_option" selected value=''>Category</option>
    <option value="1">Complain</option>
    <option value="2">Feedback</option>
    <option value="3">General Information</option>
    <option value="4">Question</option>
    <option value="5">Suggestion</option>`);
}