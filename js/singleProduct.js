const switchTabs = () => {

    document.querySelectorAll(".product-tabs .nav-link").forEach((x, index) => {
        x.addEventListener("click", () => {
            //切換tabs
            document.querySelectorAll(".product-tabs .nav-link").forEach(y => {
                if (y.classList.contains("active")) {
                    y.classList.remove("active");
                }
            })

            x.classList.add("active");
            //切換頁面
            document.querySelectorAll(".product-tab-item").forEach(z => {
                if (z.classList.contains("active")) {
                    z.classList.remove("active");
                }
            })
            document.querySelectorAll(".product-tab-item")[index].classList.add("active");
        })
    })
}

const createCartCard = (price, title, items, id) => {
    let card = document.createElement("div");
    card.className = "cart-product-item mb-3";
    card.setAttribute("data-price", price);

    let row = document.createElement("div");
    row.className = "row no-gutters";

    let col5 = document.createElement("div");
    col5.classList.add("col-5");
    let col7 = document.createElement("div");
    col7.classList.add("col-7");

    let img = document.createElement("img");
    img.src = `https://picsum.photos/300/400/?random=${id}`;
    img.classList = "w-100 h-100";

    col5.append(img);

    let cardBody = document.createElement("div");
    cardBody.className = "card-body py-4 px-3";

    let h3 = document.createElement("h3");
    h3.classList.add("card-title");
    h3.textContent = title;

    let ul = document.createElement("ul");
    ul.classList.add("list-unstyled");

    items.forEach(x => {
        let li = document.createElement("li");
        li.textContent = x;
        ul.append(li);
    })
    let p = document.createElement("p");
    p.className = "card-text pt-3";

    let small = document.createElement("small");
    small.classList.add("color-muted");
    small.textContent = "超值優惠服務!我們服務，你可放心";

    p.append(small);

    let a = document.createElement("a");
    a.setAttribute("href", "javascript:;");
    a.className = "btn detail";
    a.textContent = "詳情";

    cardBody.append(h3, ul, p, a);
    col7.append(cardBody);

    let btnGroup = document.createElement("div");
    btnGroup.classList.add("btn-group");

    let btnConfirm = document.createElement("button");
    btnConfirm.className = "btn confirm";
    btnConfirm.textContent = "確認刪除";

    let btnCancel = document.createElement("button");
    btnCancel.className = "btn cancel";
    btnCancel.textContent = "取消";

    btnGroup.append(btnConfirm, btnCancel);
    row.append(col5, col7, btnGroup);
    card.appendChild(row);

    document.querySelector(".section_cart-side-menu .cart-body").appendChild(card);
}

const addCart = () => {
    document.querySelector(".content-footer .add-cart").addEventListener("click", function () {
        let price = +document.querySelector(".section_product .content-footer .price").textContent.replace(",", "");
        let title = document.querySelector(".section_product .content-header h2").textContent;
        createCartCard(price, title, ["傢俱、櫥櫃外觀擦拭", "地面拖地", "地面除塵清潔", "櫃外擦拭"], 20);
        countCartAmount();
        countCartPrice();
        swipeDeleteEffect();
    })
}


window.addEventListener("load", () => {
    switchTabs();
    addCart();
})