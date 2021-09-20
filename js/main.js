// ________________diusburg pop and filter______________________

(() =>{

    const filterContainer = document.querySelector(".diusburg-filter"),
    diusburgItemsContainer = document.querySelector(".diusburg-items"),
    diusburgItems = document.querySelectorAll(".diusburg-item"),
    popup = document.querySelector(".diusburg-popup"),
    prevBtn = popup.querySelector(".pp-prev"),
    nextBtn = popup.querySelector(".pp-next"),
    closeBtn = popup.querySelector(".pp-close"),
    projectDetailsContainer = popup.querySelector(".pp-details"),
    projectDetailsBtn = popup.querySelector(".pp-project-details-btn");

    let itemIndex, slideIndex, sceenshots;

    // diusburg filter

    filterContainer.addEventListener("click", (event)=>{
        if(event.target.classList.contains("filter-item") &&
        !event.target.classList.contains("active")){
            // deactivate older one
            filterContainer.querySelector(".active").classList.remove("outer-shadow", "active");
            // activate new one
            event.target.classList.add("active", "outer-shadow");
            const target = event.target.getAttribute("data-target");
            diusburgItems.forEach((item) =>{
                if(target === item.getAttribute("data-category") || target === 'all'){
                    item.classList.remove("hide");
                    item.classList.add("show");
                }
                else{
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            })
        }
    })

    // 

    diusburgItemsContainer.addEventListener("click", (event) =>{
        if(event.target.closest(".diusburg-item-inner")){
            const diusburgItem = event.target.closest(".diusburg-item-inner").parentElement;
            // get item index
            itemIndex = Array.from(diusburgItem.parentElement.children).indexOf(diusburgItem);
            screenshots = diusburgItems[itemIndex].querySelector(".diusburg-item-img img").getAttribute("data-screenshots");
            
            screenshots = screenshots.split(",");
            if(screenshots.length === 1){
                prevBtn.getElementsByClassName.display="none";
                nextBtn.getElementsByClassName.display="none";
            }
            else{
                prevBtn.getElementsByClassName.display="block";
                nextBtn.getElementsByClassName.display="block";
            }
            slideIndex = 0;
            popupToggle();
            popupSlideshow();
            popupDetails();
        }
    })

    closeBtn.addEventListener("click", () =>{
        popupToggle();
        if(projectDetailsContainer.classList.contains("active")){
            popupDetailsToggle();
        }
    })

    function popupToggle(){
        popup.classList.toggle("open");
        bodyScrollingToggle();
    }
    
    function popupSlideshow(){
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector(".pp-img");
        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src = imgSrc;
        popupImg.onload = () =>{
            popup.querySelector(".pp-loader").classList.remove("active");
        }
        popup.querySelector(".pp-counter").innerHTML = (slideIndex+1) + " of " + screenshots.length;
    }

    nextBtn.addEventListener("click", () =>{
        if(slideIndex === screenshots.length-1){
            slideIndex = 0;
        }
        else{
            slideIndex++;
        }
        popupSlideshow();
        console.log("slideIndex:" + slideIndex);
    })

    prevBtn.addEventListener("click", () =>{
        if(slideIndex === 0){
            slideIndex = screenshots.length-1
        }
        else{
            slideIndex--;
        }
        popupSlideshow();
        console.log("slideIndex:" + slideIndex);
    })

    function popupDetails(){
        if(!diusburgItems[itemIndex].querySelector(".diusburg-item-details")){
            projectDetailsBtn.style.display="none";
            return;
        }
        projectDetailsBtn.style.display="block";

        const details = diusburgItems[itemIndex].querySelector(".diusburg-item-details").innerHTML;
        popup.querySelector(".pp-project-details").innerHTML = details;
        const title = diusburgItems[itemIndex].querySelector(".diusburg-item-title").innerHTML;
        popup.querySelector(".pp-title h2").innerHTML = title;
        const category = diusburgItems[itemIndex].getAttribute("data-category");
        popup.querySelector(".pp-project-category").innerHTML = category;
    }

    projectDetailsBtn.addEventListener("click", () =>{
        popupDetailsToggle();
    })

    function popupDetailsToggle(){
        console.log("hi");
        if(projectDetailsContainer.classList.contains("active")){
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0 + "px";
        }
        else{
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
            popup.scrollTo(0,projectDetailsContainer.offsetTop);
        }
    }
    
})();

function bodyScrollingToggle(){
    document.body.classList.toggle("stop-scrolling");
}