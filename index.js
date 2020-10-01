// Practice your JS here!
let addMusic = false;
let row = document.querySelector(".row")

let cartDiv = document.querySelector("#cart-div")

fetch("http://localhost:3000/musics")
    .then(res => res.json())
    .then((arrayOfMusics) => {
        arrayOfMusics.forEach((singleMusic)=>{
            turnMusicToHTML(singleMusic);
        })
    })



let turnMusicToHTML = (music) => {
     let musicCardDiv = document.createElement("div")
        musicCardDiv.className = "col-sm-6 col-md-4 col-lg-3"

  let card = document.createElement("div")
        card.className = "card"

    let musicTitleH2 = document.createElement("h4")
    musicTitleH2.innerText = music.title
   musicTitleH2.className = "card-title"

    let musicImg=document.createElement("iframe")
        musicImg.src = music.link
        musicImg.alt = music.title
        musicImg.width = 300
        musicImg.height = 380
        musicImg.frameborder = 0
        musicImg.allowtransparency = "true"
        musicImg.allow = "encrypted-media"
       musicImg.className = "card-img-top"

       let cardBody = document.createElement("div")
       cardBody.className = "card-body"


    let musicLikesP = document.createElement("p")
        musicLikesP.innerText = `${music.likes} Likes`
        musicLikesP.className = "card-text"
    let likeButton = document.createElement("button")
        likeButton.classList.add("like-btn")
        likeButton.innerText = "Like ❤️"

    let musicTitleH3 = document.createElement("h3")
        musicTitleH3.innerText = music.genre


    let purchaseButton = document.createElement("button")
        purchaseButton.classList.add("purchase-btn")
        purchaseButton.innerText = "Buy 🛒"

       // musicCardDiv.append(musicTitleH2, musicImg, musicLikesP, musicTitleH3, likeButton, purchaseButton)
       musicCardDiv.append(card) 
       card.append(musicImg, cardBody)
       cardBody.append(musicTitleH2, musicLikesP, likeButton, purchaseButton)
       row.append(musicCardDiv)


        likeButton.addEventListener("click", (evt) =>{
            let theNewLikes = music.likes + 1 

            fetch(`http:/localhost:3000/musics/${music.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    likes: theNewLikes
                })
            })
            .then(res => res.json())
            .then((updatedMusic) => {
                musicLikesP.innerText = `${updatedMusic.likes} Likes`
                
                music.likes = updatedMusic.likes
            })
        })



            purchaseButton.addEventListener("click", (evt) =>{
                console.log(music.id)
           

            fetch(`http://localhost:3000/purchases`, {
             method: "POST",
             headers: {
                 "content-type": "application/json",
                 Accept: "application/json"
             },
             body: JSON.stringify({
                user_id:1,
                    music_id: music.id
             })
        })
            .then(res => res.json())
            .then((purchase) => {
                console.log(purchase)
                turnPurchaseToHTML(purchase);
            }
            )
    })
}



let turnPurchaseToHTML = (purchase) => {
        console.log(purchase)

        let userName = document.createElement("p")
         userName.innerText = `${purchase.user.name} bought ${purchase.music.title}`


        let returnButton = document.createElement("button")
        returnButton.classList.add("Return-btn")
        returnButton.innerText = "Return"
        
        cartDiv.append(userName, returnButton)
        returnButtonFunc(returnButton, purchase,cartDiv)
}
        
let returnButtonFunc = (returnButton, purchase,cartDiv) => {
    returnButton.addEventListener("click", (evt) =>{
        
        fetch(`http://localhost:3000/purchases/${purchase.id}`,{
            method: "DELETE"
        } )
        .then(res => res.json() )
        .then((deletedPurchase) => {
            console.log(deletedPurchase)
             cartDiv.innerHTML = ""
        }
        )
    }) //end of event listener
} // end of function
     