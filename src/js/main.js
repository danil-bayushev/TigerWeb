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
    const catalogBtns = $.gE_s('.catalog');
    const openCatalogBtn = $.gE('.catalog_open .catalog');
    const catalogSections = $.gE_s('.catalog_open__wrapper .section');
    const productsTumbs = $.gE_s('.tumbs>ul>li');
    const productsMainImg = $.gE('.main_image>img');
    const fixedMenu = $.gE('.fixed_menu');
    let vertical_Menu_opened = false;
    const verticalMenu = $.gE('.vertical_menu');
    const kebabMenuBtn = $.gE_s('.kebab_menu');
    const tabs = $.gE_s('.tab');
    const rating = $.gE_s('.stars ul li');
    const productCards = $.gE_s('.product_sections li a');

console.log(productCards);
    
    changeCirclesBg(); //Изменение фона круга (избранное, сравнение, корзина) при наличии в нем цифры, отличной от нуля
    

   // Events -------------------------------------------------------------

    catalogBtns.forEach((el) => {
        el.addEventListener('click', openCatalog);
    });

    openCatalogBtn.addEventListener('click', closeAll);

    background.addEventListener('click', closeAll);

    productsTumbs.forEach((el) => {
        el.addEventListener('click', changeImg);
    });
    window.addEventListener('scroll', showFixedMenu);

    kebabMenuBtn.forEach((el) => {
        el.addEventListener('click', showVerticalMenu);
    });
    
    tabs.forEach((el) => {
        el.addEventListener('click', selectTab);
    });

    rating.forEach((el) => {
        el.addEventListener('mouseover', setRating);
    });
    rating.forEach((el) => {
        el.addEventListener('mouseout', clearRating);
    });

    function setRating(e){
        console.log(e.target);
        rating.forEach(el => {
            el.style.background = "url(../../ico/star_empty.png) no-repeat";
        });
        let index = (Array.from(rating).indexOf(e.target));
        for(let i in rating){
            if(i<=index){
                rating[i].style.background = "url(../../ico/star_yellow.png) no-repeat";
            }
        }
    };

    function clearRating(){
        rating.forEach(el => {
            el.style.background = "url(../../ico/star_empty.png) no-repeat";
        });
    };



// Functions -------------------------------------------------------------

    function openCatalog(e){
        e.preventDefault();
        if(!catalog_opened){
            $.gE('.catalog_open').style.display = 'block';
            background.style.display = 'block';

            catalog_opened = true;
        }
    }
    function closeAll(){
        if(catalog_opened){
            $.gE('.catalog_open').style.display = 'none';
            background.style.display = 'none';
            catalog_opened = false;
        }
        if(vertical_Menu_opened){
            verticalMenu.style.display = 'none';
            background.style.display = 'none';
            vertical_Menu_opened = false;
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

    function showFixedMenu(){
        if(window.scrollY > 38){
            fixedMenu.style.display = 'block';
        }else if(window.scrollY < 38){
            fixedMenu.style.display = 'none';
        }
    }
    function showVerticalMenu(){
        if(!vertical_Menu_opened){
            verticalMenu.style.display = 'block';
            background.style.display = 'block';
            vertical_Menu_opened = true;
        }else if(vertical_Menu_opened){
            verticalMenu.style.display = 'none';
            background.style.display = 'none';
            vertical_Menu_opened = false;
        }
    }
    function selectTab(e){
        if(e.target.classList.contains('active')) return;
        tabs.forEach(el => {
            if(el.classList.contains('active')){
               el.classList.remove('active'); 
            }
        });
        e.target.classList.add('active');
        let activeIndex = (Array.from(tabs).indexOf(e.target));
        catalogSections.forEach(el => {
            if(el.classList.contains('active')){
                el.classList.remove('active'); 
             }
        });
        catalogSections[activeIndex].classList.add('active');
    }

};


 