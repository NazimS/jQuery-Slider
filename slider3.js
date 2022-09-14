$(() => {
    // let path = '../img/'
    let path = 'img/'
    let image = ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","sakura.webp"]
    let half = $(window).width() / 2
    let x = 0
    let n = image.length
    let timer = setTimeout(change, 1)
    const slider = $("#slider")
    slider
        .css({
            position: 'relative',
            overflow: 'hidden'
        })
        .append('<div id="slide"></div>')
        .append('<div id="thumb"></div>')
        .append('<div id="line"></div>')
    const slide = $("#slide")
    const thumb = $("#thumb")
    const line = $("#line")
    
    slide
        .css({
            position: 'absolute',
            display: 'flex',
            height: '100%',
        })
        .click(function(e){
            let dir = e.pageX > half ? 1 : -1
            x += dir 
            change(dir) 
        })

    thumb
        .css({
            width: '100%',
            textAlign: 'center',
            position: 'absolute',
            bottom: 0
        })
    line
        .css({
            width: 0,
            height: '5px',
            background: '#FFFFFF80',
            position: 'absolute',
            top: 0
        })
    
    image.forEach(item => {
        thumb.append(`<img src="${path}${item}" />`)
        slide.append(`<img src="${path}${item}" />`)
    })

    $("#slide>img").css({
        width: slider.width() + 'px',
        height: '100%',
        objectFit: 'cover'
    })

    $("#thumb>img")
        .css({
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            objectFit: 'cover',
            border: '3px solid #FFF',
            margin: '10px 5px',
            cursor: 'pointer',
            opacity: .5
        })
        .click(function(){
            x = $(this).index()
            change()
        })

    function change(dir = 1) {
        clearTimeout(timer)
        if(x >= image.length) x = 0 
        if(x < 0) x = image.length - 1
        show(dir)
        line.stop()
            .css({width: 0})
            .animate({width: '100%'}, 3000)
        timer = setTimeout(() => { x++; change() }, 3000)
    }

    function show(dir) {
        slide.animate({left: -100 * x + '%'}, 500)
        $("#thumb>img").css({opacity: .5})      
        $("#thumb>img").eq(x).css({opacity: 1})      
    }
})