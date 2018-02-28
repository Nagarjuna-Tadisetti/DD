var check = false;

function changeVal(el) {
  var qt = parseFloat(el.parent().children(".qt").html());
  var price = parseFloat(el.parent().children(".price").html());
  var eq = Math.round(price * qt * 100) / 100;
  
  el.parent().children(".full-price").html( eq + "$" );
  
  changeTotal();			
}

function changeTotal() {
  var price = 0;
  $(".full-price").each(function(index){
    price += parseFloat($(".full-price").eq(index).html());
  });
  
  price = Math.round(price * 100) / 100;
  var tax = Math.round(price * 0.05 * 100) / 100
  var shipping = parseFloat($(".shipping span").html());
  var fullPrice = Math.round((price + tax + shipping) *100) / 100;
  
  if(price == 0) {
    fullPrice = 0;
  }
  $(".subtotal span").html(price+'$');
  $(".tax span").html(tax+'$');
  $(".total span").html(fullPrice+'$');
}

$(document).ready(function(){
    $(".remove").on('click', function() {
    return;
    var el = $(this);     
    var tempCookie = JSON.parse(getCookie('cartItems'));
    el.parent().parent().addClass("removed");
    var a = el.parent().parent().children('div').children('h1').html();
    console.log(a);
    var i=0;
    $.each(tempCookie, function(key,value) {
           if(value !== null)
           if( a == value.item )
                //delete tempCookie[i] ;
           i++;
    });
    console.log(JSON.stringify(tempCookie));
    setCookie('cartItems',JSON.stringify(tempCookie),3);
      
    window.setTimeout(
      function(){
        el.parent().parent().slideUp('fast', function() { 
          el.parent().parent().remove(); 
          if($(".product").length == 0) {
            if(check) {
              $("#cart").html("<h1>The shop does not function, yet!</h1><p> Thank you!</p>");
            } else {
              $("#cart").html("<h1>No products!</h1>");
            }
          }
          changeTotal(); 
        });
      }, 200);
  });
  
  $(".qt-plus").click(function(){
    $(this).parent().children(".qt").html(parseInt($(this).parent().children(".qt").html()) + 1);
    console.log('inside plus');
    var tempCookie = JSON.parse(getCookie('cartItems'));
    var a = $(this).parent().parent().children('div').children('h1').html(); 
    $.each(tempCookie, function(key,value) {
           if( a == value.item )
            value.quantity = value.quantity + 1;
        }); 
        console.log(JSON.stringify(tempCookie));
        setCookie('cartItems',JSON.stringify(tempCookie),3);
    
    $(this).parent().children(".full-price").addClass("added");
    
    var el = $(this);
    window.setTimeout(function(){el.parent().children(".full-price").removeClass("added"); changeVal(el);}, 150);
  });
  
  $(".qt-minus").click(function(){
    
    child = $(this).parent().children(".qt");
    
    if(parseInt(child.html()) > 0) {
      child.html(parseInt(child.html()) - 1);
        var tempCookie = JSON.parse(getCookie('cartItems'));
        var a = $(this).parent().parent().children('div').children('h1').html();    
        $.each(tempCookie, function(key,value) {
           if( a == value.item )
            value.quantity = value.quantity - 1;
        }); 
        console.log(JSON.stringify(tempCookie));
        setCookie('cartItems',JSON.stringify(tempCookie),3);
      }
    
    $(this).parent().children(".full-price").addClass("minused");
    
    var el = $(this);
    window.setTimeout(function(){el.parent().children(".full-price").removeClass("minused"); changeVal(el);}, 150);
  });
  
  window.setTimeout(function(){$(".is-open").removeClass("is-open")}, 1200);
  
  $(".btn").click(function(){
    check = true;
    $(".remove").click();
  });
    
    
function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
    
});
