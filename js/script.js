function tabs (classTittle, classContent) {
    document.querySelector(classTittle).classList.add('active');
    document.querySelector(classContent).classList.add('active');


    let tabsTitle = document.querySelectorAll(classTittle),
        tabsContent = document.querySelectorAll(classContent);

    tabsContent.forEach((e, index) => e.dataset.index = index);

    for (let el of tabsTitle) {
        el.addEventListener('click', e => {
            e.preventDefault();

            document.querySelector(classTittle+'.active').classList.remove('active');
            document.querySelector(classContent+'.active').classList.remove('active');

            el.classList.add('active');
            const index = +[...tabsTitle].indexOf(el);

            const content = [...tabsContent].filter(el => +el.getAttribute('data-index') === index);
            content[0].classList.add('active');
        })
    }
}
tabs('.service-tabs-tittle','.service-content-item');


function carousel () {
    tabs('.team-carousel-item','.team-item');

    let caorusel = document.querySelectorAll('.team-carousel-item'),
        caoruselItems = document.querySelectorAll('.team-item'),
        next = document.querySelector('.team-carousel-next'),
        prev = document.querySelector('.team-carousel-prev');

    caorusel.forEach((e, index) => e.dataset.index = index);

    getActivPerson = ()=> document.querySelector('.team-carousel-item.active');
    getActivItem = ()=> document.querySelector('.team-item.active');
    getIndex = ()=> getActivPerson().getAttribute('data-index');

      next.addEventListener('click', e=>{

        const nextIndex = (+getIndex()+1)%caorusel.length;
        getActivPerson().classList.remove('active');

        let nextActive = [...caorusel].filter(el => +el.getAttribute('data-index') === nextIndex);
        nextActive[0].classList.add('active');

        getActivItem().classList.remove('active');
        caoruselItems[nextIndex].classList.add('active');
    });
    prev.addEventListener('click', e =>{

        const prevIndex = (+getIndex()+caorusel.length-1)%caorusel.length;
        getActivPerson().classList.remove('active');

        let prevActive = [...caorusel].filter(el => +el.getAttribute('data-index') === prevIndex);
        prevActive[0].classList.add('active');

        getActivItem().classList.remove('active');
        caoruselItems[prevIndex].classList.add('active');

    })
}
carousel();

function work() {
    graphic = [];
    for (let i=1; i<13; i++){
        graphic.push(`img\\graphic design\\graphic-design`+i+`.jpg`)
    }
    landing = [];
    for (let i=1; i<8; i++){
        landing.push(`img\\landing page\\landing-page`+i+`.jpg`)
    }
    web = [];
    for (let i=1; i<8; i++){
        web.push(`img\\web design\\web-design`+i+`.jpg`)
    }
    wordpress = [];
    for (let i=1; i<11; i++){
        wordpress.push(`img\\wordpress\\wordpress`+i+`.jpg`)
    }
    all = [];
    all = graphic.concat(landing,web,wordpress);

    let compareRandom = (a, b) => {
        return Math.random() - 0.5;
    };

    all.sort(compareRandom);

    const container = document.querySelector('.work-container');

    let addContent = (array, elementFrom, elementTo) => {

        for (let i=elementFrom; i<array.length;i++){
            if (i>elementTo) {break}
            let img = document.createElement('img');
            img.src = array[i];
            img.setAttribute('data-index',`${array[i].substring(array[i].lastIndexOf('img\\')+4, array[i].lastIndexOf('\\'))}`);
            container.appendChild(img);
        }
    };

    let removeChildren = (elem) => {
        while (elem.lastChild) {
            elem.removeChild(elem.lastChild);
        }
    };

    addContent(all,0,11);
    document.querySelector('.work-item').classList.add('active');

    let tittle = document.querySelectorAll('.work-item');
    let buttonLoad = document.querySelector('.work-button');
    for (let el of tittle) {
        el.addEventListener('click', e=>{
            document.querySelector('.work-item.active').classList.remove('active');
            el.classList.add('active');
            let tittleActive = el.innerHTML;
            switch (tittleActive) {
                case 'All': activeArray = all;
                    break;
                case 'Graphic Design': activeArray = graphic;
                    break;
                case 'Web Design': activeArray = web;
                    break;
                case 'Landing Pages': activeArray = landing;
                    break;
                case 'Wordpress': activeArray = wordpress;
                    break;
            }
            removeChildren(container);
            addContent(activeArray,0,11);
            buttonLoad.style.display = 'block'
        });
    }


    buttonLoad.addEventListener('click', e=>{
        let tittleActive = document.querySelector('.work-item.active').innerHTML;
        switch (tittleActive) {
            case 'All': activeArray = all;
                break;
            case 'Graphic Design': activeArray = graphic;
                break;
            case 'Web Design': activeArray = web;
                break;
            case 'Landing Pages': activeArray = landing;
                break;
            case 'Wordpress': activeArray = wordpress;
                break;
        }
        addContent(activeArray,11,22);
        buttonLoad.style.display = 'none'
    });

    let hoverBox = document.querySelector('.work-hover');
    container.addEventListener('mouseover', e=>{

        hoverBox.style.display = 'block';
        hoverBox.style.top = `${e.target.getBoundingClientRect().y + document.documentElement.scrollTop}px`;
        hoverBox.style.left = `${e.target.getBoundingClientRect().x}px`;
        document.querySelector('.work-hover-name').innerHTML = e.target.getAttribute('data-index');

    });

    hoverBox.addEventListener('mouseover', evt =>{
        hoverBox.style.display = 'block';
    } );
    hoverBox.addEventListener('mouseout', evt =>{
        hoverBox.style.display = 'none';
    } )
}

work();

