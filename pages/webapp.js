const image=document.querySelectorAll(".sample-pic img");
const imageSlider=document.querySelector(".image-slider");
    
    let activeImageSlide=0;
    image.forEach((item, i)=>{
        item.addEventListener('click',()=>{
            image[activeImageSlide].classList.remove('active');
            item.classList.add('active');
            imageSlider.style.backgroundImage =`url('${item.src}')`;
            activeImageSlide=i;

        })
    });
const imageTwo=document.querySelectorAll(".sample-pic-2 img");
const imageSliderTwo=document.querySelector(".image-slider-2");
    
    let activeImageSlideTwo=0;
    imageTwo.forEach((item, i)=>{
        item.addEventListener('click',()=>{
            imageTwo[activeImageSlideTwo].classList.remove('active');
            item.classList.add('active');
            imageSliderTwo.style.backgroundImage =`url('${item.src}')`;
            activeImageSlideTwo=i;

        })
    });
 const imageThree=document.querySelectorAll(".sample-pic-3 img");
const imageSliderThree=document.querySelector(".image-slider-3");
    
    let activeImageSlideThree=0;
    imageThree.forEach((item, i)=>{
        item.addEventListener('click',()=>{
            imageThree[activeImageSlideThree].classList.remove('active');
            item.classList.add('active');
            imageSliderThree.style.backgroundImage =`url('${item.src}')`;
            activeImageSlideThree=i;

        })
    })


