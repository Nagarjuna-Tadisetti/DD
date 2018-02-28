// Hide Header on on scroll down
$(document).ready(function(){
 addItems('cartItems');
    if($('.left') != undefined) 
        updateCart();
$(".shopping-cart").fadeToggle( "fast"); // This statement is for hiding cart on page load for first time
// Below is code for hiding and showing menu bar at the top
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('header').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('header').removeClass('nav-up').addClass('nav-down');
        }
    }
    
    lastScrollTop = st;
}
    
// Below code is for adding items to the cart in food_menu page

$('.add-to-cart').on('click', function () {
        var cart = $('.my-shopping-cart');
        var imgtodrag = $(this).parent('.my-item').find("img").eq(0);
        if (imgtodrag) {
            var imgclone = imgtodrag.clone()
                .offset({
                top: imgtodrag.offset().top,
                left: imgtodrag.offset().left
            })
                .css({
                'opacity': '0.5',
                    'position': 'absolute',
                    'height': '40',
                    'width': '80',
                    'z-index': '10000'
            })
                .appendTo($('body'))
                .animate({
                'top': cart.offset().top + 10,
                    'left': cart.offset().left + 10,
                    'width': 80,
                    'height': 40
            }, 1000, 'easeInOutExpo');
            
            setTimeout(function () {
                cart.effect("shake", {
                    times: 2
                }, 200);
            }, 1500);

            imgclone.animate({
                'width': 0,
                    'height': 0
            }, function () {
                $(this).detach()
            });
        }
    
    var a =$(this).parent();
    var tempCookie = getCookie('cartItems');
    if( tempCookie == '' ){
        var b = [{}];
        b[0].item = a.children('h4').html();
        b[0].description = a.children('p').html()
        b[0].price = a.children('span').html()
        b[0].img = a.children('img').attr('src')
        b[0].quantity = 1;  
        setCookie('cartItems',JSON.stringify(b),3);
    }
    
    if( tempCookie != '' ) {
        tempCookie = JSON.parse(tempCookie);
        var i =0;
        var flag = 0;
         $.each(tempCookie, function(key,value) {
           i++;
           if( a.children('h4').html() == value.item ){
            value.quantity = value.quantity + 1;
            setCookie('cartItems',JSON.stringify(tempCookie),3);
              flag =1 ;
           }
        }); 
        if(flag == 0){
        var c = {};
        c.item = a.children('h4').html();
        c.description = a.children('p').html()
        c.price = a.children('span').html()
        c.img = a.children('img').attr('src')
        c.quantity = 1;
        tempCookie.push(c); 
        setCookie('cartItems',JSON.stringify(tempCookie),3);
        }
        
    }
    updateCart();
    });
    
// This is for showing and hiding cart in food_menu page  
$(".my-shopping-cart").on("click", function() {
    updateCart();
    $(".shopping-cart").fadeToggle( "fast");
  });
    

$('form').card({
    container: '.card-wrapper',
    width: 280,

    formSelectors: {
        nameInput: 'input[name="first-name"], input[name="last-name"]'
    }
});

// Below functions are for setting, getting and deleting cookies
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

function delete_cookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
    
// Below code is for adding or removing items in review page  
function addItems(cartItems) {
    var itemTemplate = `<article class="product">
				<header>
					<a class="remove">
						<img src="" alt="">
					</a>
				</header>
				<div class="content">
					<h1></h1>
					<p></p>
				</div>
				<footer class="content">
					<span class="qt-minus">-</span>
					<span class="qt"></span>
					<span class="qt-plus">+</span>
					<h2 class="full-price"></h2>
					<h2 class="price"> </h2>
				</footer>
			</article>`;
if($('#site-footer').html() == undefined)
    return;
var tempCookie = JSON.parse(getCookie('cartItems'));
    $.each(tempCookie, function(key,value) {
           if(value.quantity == 0) 
              return;
           $('#cart').append(itemTemplate);
    });

if($($('.product img')[0]).html()== undefined)
    return;
var i=0;
$.each(tempCookie, function(key,value) {
    if(value.quantity == 0) 
            return;
    $($('.product img')[i]).attr('src',value.img);
    $($('.product h1')[i]).html(value.item);
    $($('.product p')[i]).html(value.description);
    $($('.product .qt')[i]).html(value.quantity);
    $($('.product .price')[i]).html(value.price+'$');
    changeVal($($('.product .qt-minus')[i]));
    i++;
}); 
    
  }     
// Below code is for adding items to cart in food_menu page   
function updateCart(){
    $('.shopping-cart-items').html('');
    if($($('.clearfix')[0]) == '')
        return 0;
    var cartTemplate = `<li class="clearfix">
        <img src="" alt="item" height=80 width=80/>
        <span class="item-name"></span>
        <span>Price: $</span>
        <span class="item-price"></span>
        <span>Quantity:</span>  
        <span class="item-quantity"></span>
      </li>`;
    if(getCookie('cartItems') != ''){
    var tempCookie = JSON.parse(getCookie('cartItems'));
    $.each(tempCookie, function(key,value) {
        if(value.quantity == 0) 
            return;
           $('.shopping-cart-items').append(cartTemplate);
    });
    var i=0;
    $.each(tempCookie, function(key,value) {
        if(value.quantity == 0) 
            return;
           $($('.clearfix')[i]).children('img').attr('src',value.img);
           $($('.clearfix')[i]).children('.item-name').html(value.item);
           $($('.clearfix')[i]).children('.item-price').html(value.price);
           $($('.clearfix')[i]).children('.item-quantity').html(value.quantity);
        i++;
    });
    }
    
    
}   
});