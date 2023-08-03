function loco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
loco();

function loder() {
    let tl = gsap.timeline();
    tl
        .from(".page1>svg", {
            opacity: 0,
            y: -100,
            duration: 0.7,
            delay: 0.3,
        })
        .from(".page1>img", {
            scale: 0.5,
            duration: 1,
            delay: -0.1,
            ease: Power4.easeOut,
            borderRadius: "10px",

        })

        .from("nav", {
            opacity: 0,
            duration: 0.5,
            // y: -100,
            delay: -0.3,
        })
}
loder();

function textAnimation() {
    let h2Data = document.querySelectorAll(".page2 .text-content>h2");

    h2Data.forEach((elem) => {
        let singleH2 = elem.textContent;
        let splitedText = singleH2.split("");
        let clutter = "";
        splitedText.forEach((e) => {
            clutter += `<span>${e}</span>`;
        })
        elem.innerHTML = clutter;
        //    console.log(clutter);
    })
    gsap.to(".page2 .text-content>h2 span", {
        color: "#E3E3C4",
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".page2 .text-content>h2 span",
            scroller: ".main",
            //   markers: true,
            start: "top 60%",
            end: "top -30%",
            scrub: 2,
        },
    });


    // page3 textcontent2 animation

    let h2data = document.querySelectorAll(".page3 .text-content2 h2");
h2data.forEach((elem)=>{
    let splited = elem.textContent.split("");
    let clutter = " ";
    splited.forEach((e)=>{
        clutter+=`<span>${e}</span>`;
        // console.log(e);       
    })
    elem.innerHTML = clutter;
})
gsap.to(".page3 .text-content2 h2 span",{
       color:'#434B34',
       stagger:0.3,
      scrollTrigger:{
        trigger:".page3 .text-content2",
        scroller:".main",
        // markers:true,
        start:"top 50%",
        end:"top 20%",
        scrub:2,
      }  
})
}
textAnimation();

function svgscroll(){
    gsap.to(".page2 #svg2,.page2 #svg3",{
        left:"-100vw",
        scrollTrigger:{
            trigger:".page2 #svg2",
            scroller:".main",
            scrub:2,
            // markers:true,
        }
    })
}
svgscroll();


