'use strict';

tailor.init(function () {
    tailor.trackSuccess();
});å

$('#download').click(function (e) {
    e.preventDefault();
    var href = $(this).attr('href');
    tailor.trackSuccess(function(){
        window.location = href;
    });
});

$('#github').click(function (e) {
    e.preventDefault();
    var href = $(this).attr('href');
    tailor.trackSuccess(function(){
        window.location = href;
    });
});

setTimeout(function(){
    tailor.trackSuccess();
}, 30000);

var pageHeight = $(document).height(),
    $window = $(window),
    windowHeight = $window.height();

$window.scroll(function(event){
    if($window.scrollTop > ((pageHeight - windowHeight) / 2))
    {
        tailor.trackSuccess();
        $window.unbind(event);
    }
});
