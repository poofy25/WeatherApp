const AboutProjectButton = document.querySelector(".AboutProject")
const AboutProjectContainer = document.querySelector(".ProjectPopUp")
const X_Button = document.querySelector(".X_Button")
AboutProjectButton.addEventListener('click' , () => {
    AboutProjectContainer.style.visibility = "visible"
})
X_Button.addEventListener('click' , () => {
    console.log("gay")
    AboutProjectContainer.style.visibility = "hidden"
})