let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data"))|| [];

let generateShop=()=>{
    return (shop.innerHTML = shopItemsData.map((x)=>{
        let {id,name,price,desc,img} = x;
        let search = basket.find((x)=>x.id===id)||[]
        return `<div id=product-id-${id} class="card border border-black" style="width: 13rem; ">
            <img src=${img} class="card-img-top" alt="..." style="width: 13rem; min-height: auto;">
            <div class="card-body  p-0">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${desc}</p>
                <div class=" d-flex  m-0">
                    <h5 class="p-0 me-auto">${price}</h5>
                    <div class="btn-group justify-content: space-between;" role="group" aria-label="Basic example">
                        <button  onclick="increment(${id})" type="button" class="btn btn-primary ">+</button>
                        <button id=${id} type="button" class="btn"> ${search.item === undefined ? 0:search.item}</button>
                        <button onclick="decrement(${id})" type="button" class="btn btn-primary">-</button>
                    </div>
                </div>
            </div>
        </div>`;
    }).join(""));
};
generateShop();

let increment = (id) =>{
    let selectedItem=id;
    let search = basket.find((x)=> x.id===selectedItem.id);
     if(search === undefined)
     {
        basket.push({
            id:selectedItem.id,
            item:1,
        });
     }
     else
     {
        search.item += 1;
     }
     update(selectedItem.id);
    localStorage.setItem("data",JSON.stringify(basket));
     
};
let decrement = (id) =>
{
    let selectedItem=id;
    let search = basket.find((x)=> x.id===selectedItem.id);
     if(search.item  === 0)
     {
        return;
     }
     else
     {
        search.item -= 1;
     }
     update(selectedItem.id);
     localStorage.setItem("data",JSON.stringify(basket));
     
};
let update = (id) =>{
    let search = basket.find((x)=>x.id===id);
   document.getElementById(id).innerHTML=search.item;
   calculation();
};
let calculation =() =>{
 let carticon = document.getElementById("cartAmount");
 carticon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=> x+y,0);
};
calculation();