const $ = {
    gE : function(el){
        return document.querySelector(el);
    },
    gE_s : function(el){
        return document.querySelectorAll(el);
    }
}

window.onload = function() {
    let catalog_opened = false;
    const background = $.gE('.background');
    const catalogBtn = $.gE('.catalog');
    const openCatalogBtn = $.gE('.catalog_open .catalog');
    const productsTumbs = $.gE_s('.tumbs>ul>li');
    const productsMainImg = $.gE('.main_image>img');
    

    catalogBtn.addEventListener('click', openCatalog);
    openCatalogBtn.addEventListener('click', closeCatalog);
    background.addEventListener('click', closeCatalog);

    changeCirclesBg();

    productsTumbs.forEach((el) => {
        el.addEventListener('click', changeImg);
    })
    




// Functions -------------------------------------------------------------

    function openCatalog(){
        if(!catalog_opened){
            $.gE('.catalog_open').style.display = 'block';
            background.style.display = 'block';
            catalog_opened = true;
        }
    }
    function closeCatalog(){
        if(catalog_opened){
            $.gE('.catalog_open').style.display = 'none';
            background.style.display = 'none';
            catalog_opened = false;
        }
    }
    function changeCirclesBg(){
        const circles = $.gE_s('.circle');
        circles.forEach((el) => {
            if(+(el.innerText) > 0){
                el.style.backgroundColor = '#ffec00';
            }
            
        });
        
    }
    function changeImg(e){
        let el;
        let tumb;
        if(e.target.nodeName == "IMG"){
            el = e.target;
            tumb = e.target.parentNode;
        }else if(e.target.nodeName == "LI"){
            el = e.target.firstChild;
            tumb = e.target.parentNode;
        }
        productsMainImg.src = el.attributes.src.nodeValue;
        productsTumbs.forEach((el) => {
            el.classList.remove('active');
        })
        tumb.classList.add('active');
    }

};


 