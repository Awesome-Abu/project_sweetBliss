let total = document.getElementById("total");
let items = document.getElementById("items");

let basket = JSON.parse(localStorage.getItem("data")) || [];
let calculation = () => {
    let carticon = document.getElementById("cartAmount");
    carticon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculation();

let generateCartItems = () => {
    if (basket.length !== 0) {
        return (items.innerHTML = basket.map((x) => {
            let { id, item } = x;
            
            let search = shopItemsData.find((y) => y.id === id) || [];
            return `
            <div class="cart-item" style="display:flex; padding:0;  justified-content:center;gap:5px; border:2px solid black; ">
                <img width="100"src=${search.img} alt="" />
                <div class="details"  >
                    <div class="title-price-x" style = " display:flex; width:195px; align-items:center; justify-content: space-between; ">
                    <h5 style = "display:flex; align-items:center; gap:15px;">
                    <p> ${search.name}</p>
                    <p style = "background-color:black; color:white; border-radius:15%;"> ${search.price}</p>
                    </h5>
                    <a href="#" onclick="removeItem(${id})"> <img width="20" src="cross.png"alt=""></a>
                    
                    </div>
                    <div class="btn-group" role="group" aria-label="Basic example">
    <button  onclick="increment(${id})" type="button" class="btn btn-primary ">+</button>
    <button id=${id} type="button" class="btn"> ${item}</button>
    <button onclick="decrement(${id})" type="button" class="btn btn-primary">-</button>
</div>
<h3 class="m-3"> ${item * search.price} </h3>
                </div>
             
            </div>
            `;
        }).join(""));
    }
    else {
        items.innerHTML = ``;
        total.innerHTML = `
        <H2> No products in the cart.</H2>
        <a href = "idx.html">  <button type="button " class="btn btn-primary ">Back to Home</button> </a>`;
    }
}
generateCartItems();
let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    }
    else {
        search.item += 1;
    }
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
    update(selectedItem.id);

};
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
    if (search.item === 0) {
        return;
    }
    else {
        search.item -= 1;
    }
    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));

};
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount();
};
let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
    generateCartItems(); TotalAmount();
};
let clearCart=() =>{
    basket=[];
    generateCartItems();
    localStorage.setItem("data",JSON.stringify(basket));
}
let TotalAmount = () => {
    if(basket.length!==0) {
        let amt = basket
        .map((x)=>{
            let {item, id} = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item*search.price;
        }).reduce((x,y)=>x+y,0);
        total.innerHTML=` <h2> Total Bill : ${amt} </h2> 
        <div>
         <button style = "background-color:green; color:white; " type="button" class="btn mt-3 ">Check Out</button>
          <button style = "background-color:red; color:white;" onclick="clearCart()" type="button " class="btn mt-3">Clear Cart</button>
        </div>  
        `;
    } else return;
};
TotalAmount();