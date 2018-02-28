$(document).ready(function(){
updateFinalCart();
    console.log(getCookie('prices'));
// Below code is for hiding and showing menu bar at top
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight();
console.log(getCookie('cartItems'));
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
/* Card.js plugin by Jesse Pollak. https://github.com/jessepollak/card */

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
    
// This is for showing items in order page    
function updateFinalCart(){
    $('.product_list').html('');
    var cartTemplate = `<div class="products">
                    <div class="product_image">
						<img src=""/>
					</div>
					<div class="product_details">
						<span class="product_name"></span><span>&nbsp;&nbsp;quantity&nbsp;</span>
						<span class="quantity"></span><span>&nbsp;&nbsp;$</span>
						<span class="price"></span>
					</div>
				</div>`;
    if(getCookie('cartItems') != ''){
    var tempCookie = JSON.parse(getCookie('cartItems'));
    $.each(tempCookie, function(key,value) {
        if(value.quantity == 0) 
            return;
           $('.product_list').append(cartTemplate);
    });
    var i=0;
    var subtotal = 0;
    $.each(tempCookie, function(key,value) {
        if(value.quantity == 0) 
            return;
            subtotal = subtotal + Number(value.price)*Number(value.quantity);
           $($('.products')[i]).children().children('img').attr('src',value.img);
           $($('.products')[i]).children().children('.product_name').html(value.item);
           $($('.products')[i]).children().children('.price').html(value.price);
           $($('.products')[i]).children().children('.quantity').html(value.quantity);
        i++;
    });
        
        var tax = Math.round(subtotal * 0.05 * 100) / 100;
        var total = subtotal + tax + 5;
        
        $('#sub_price').html('$'+subtotal);
        $('#sub_tax').html('$'+tax);
        $('#calculated_total').html('$'+total);
        
    }
    
    
}
    
$("#complete").click(function(){
    delete_cookie('cartItems');
});
    
});