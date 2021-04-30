const fetch = require('sync-fetch');
const Page = require("./_layout/Default");

module.exports = class extends Page {
    constructor(){
        super({title:"Home", sName:"Cipher"});
    }
    render(sPage) {
        const oJson = fetch("https://popupmeals-fe4aa-default-rtdb.firebaseio.com/meals.json").json();
        console.log(oJson);
        let sResult = "<h1 style='text-align: center;'>Upcoming Popup Meals</h1>";
        Object.keys(oJson).map((key) => {
            const oEntity = oJson[key];
            console.log(oEntity);
            oEntity.id = key;
            sResult += `<div style="text-align: center;"> 
            <h2>${oEntity.title}</h2>
            <p><img style="min-width: 300px; max-width: 400px;" src="${oEntity.featured_image}" alt="${oEntity.title}"</p>
            <p>${oEntity.full_description}</p>
            <form action="https://popupmeals.herokuapp.com/payment/" method="post">
            <input type="hidden" name="title" value="${oEntity.title}" />
            <input type="hidden" name="price" value="${oEntity.price}" />
            <input type="tel" placeholder="enter your number" name="telephone"/>
            <button type="submit">Order now</button>
            </form>
            </div>
            `;
        });
        return sResult;
    }
}