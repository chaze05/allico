$(document).ready(function(){
    $('.lang-select').on('click', function() {
            $('.lang-option').fadeToggle();
        })
    $('.option').on('click',function(){
        var image=$(this).find('img').attr('src');
        var language = $(this).find('.language').text();
        var country = $(this).find('.country').text();
        $('.selected img').attr('src',image);
        $('.selected .language').text(language)
        $('.selected .country').text(country)
        console.log('1');
        console.log(image)
    })
    $('.bar').each(function(){
        var myWidth = $(this).data('value');
        $(this).animate({'width':myWidth+"px"});
        console.log(myWidth);
    })
})