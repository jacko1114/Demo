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

const addCart = () => {
    document.querySelector(".content-footer .add-cart").addEventListener("click", function () {
        let price = +document.querySelector(".section_product .content-footer .price").textContent.replace(",", "");
        let title = document.querySelector(".section_product .content-header h2").textContent;
        let id = Math.max(...Array.from(document.querySelectorAll(".cart-product-item")).map(x => +x.dataset.id));
        createCartCard(price, title, ["傢俱、櫥櫃外觀擦拭", "地面拖地", "地面除塵清潔", "櫃外擦拭"], id + 1);

        cart.push({
            price,
            title,
            items: ["傢俱、櫥櫃外觀擦拭", "地面拖地", "地面除塵清潔", "櫃外擦拭"],
            id: id+1
        });
        localStorage.setItem("cart", JSON.stringify(cart));
        countCartAmount();
        countCartPrice();
        swipeDeleteEffect();
    })
}


window.addEventListener("load", () => {
    switchTabs();
    addCart();
})