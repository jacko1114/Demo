let cart = JSON.parse(localStorage.getItem("cart")) || []
let isLogin = JSON.parse(localStorage.getItem("login")) || false;
toastr.options = {
    "closeButton": true,
    "positionClass": "toast-top-center",
    "showDuration": "1300",
    "hideDuration": "1000",
    "timeOut": "3000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

const openHamburger = () => {
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".side-menu").classList.add("show");
        document.querySelector(".fa-times").classList.add("show");
    })
}
const closeHamburger = () => {
    document.querySelector(".fa-times").addEventListener("click", function () {
        if (document.querySelector(".side-menu").classList.contains("show")) {
            document.querySelector(".side-menu").classList.remove("show");
            this.classList.remove("show");
        }
    })
}
const toggleAllService = () => {
    document.querySelector(".all-service").addEventListener("click", function () {
        if (document.querySelector("body").classList.contains("open")) {
            document.querySelector("body").classList.remove("open");
            document.querySelector(".section_collapse-zone").classList.remove("open");
        } else {
            document.querySelector("body").classList.add("open");
            document.querySelector(".section_collapse-zone").classList.add("open");
        }
        if (this.classList.contains("active")) this.classList.remove("active");
        else this.classList.add("active");

        //避免觸發關閉
        document.querySelector("#collapse").addEventListener("click", function (e) {
            e.stopPropagation();
        })

        if (document.querySelector(".section_collapse-zone").classList.contains("open")) {
            document.querySelector(".section_collapse-zone.open").addEventListener("click", function () {
                if (this.classList.contains("open")) {
                    this.classList.remove("open");
                    document.querySelector("body").classList.remove("open");
                    document.querySelector("#collapse").classList.remove("show");
                    document.querySelector(".all-service").classList.remove("active");
                }
            })
        }
    })
}
const toggleSideMenuAllService = () => {
    document.querySelector(".side-menu_body .all-service").addEventListener("click", function () {
        if (!document.querySelector(".side-menu_all-service").classList.contains("active")) {
            document.querySelector(".side-menu_all-service").classList.add("active");
        }
    })
    document.querySelector(".side-menu_all-service .all-service").addEventListener("click", function () {
        if (document.querySelector(".side-menu_all-service").classList.contains("active")) {
            document.querySelector(".side-menu_all-service").classList.remove("active");
        }

        document.querySelectorAll(".subItem").forEach(x => {
            if (x.classList.contains("open")) {
                x.classList.remove("open");
            }
        })
    })

}
const toggleSideMenuSubItem = (target, event) => {
    event.preventDefault();
    document.querySelectorAll(".subItem").forEach(x => {
        if (target != x) {
            if (x.classList.contains("open")) {
                x.classList.remove("open");
            }
        }
    })

    target.classList.toggle("open");
}
const toggleCart = () => {
    document.querySelector("#cart").addEventListener("click", function () {
        if (document.querySelector(".cart-side-menu").classList.contains("open")) {
            document.querySelector(".cart-side-menu").classList.remove("open")
        } else {
            document.querySelector(".cart-side-menu").classList.add("open")
        }
    })
    document.querySelector("#cart-close").addEventListener("click", function () {
        if (document.querySelector(".cart-side-menu").classList.contains("open")) {
            document.querySelector(".cart-side-menu").classList.remove("open")
        }
    })
}
const openBottomCart = () => {
    document.querySelectorAll(".nav-bottom-item")[1].addEventListener("click", function () {
        document.querySelector(".section_cart-side-menu").classList.add("open");
    })
}
const openBottomCustomerService = () => {
    document.querySelectorAll(".nav-bottom-item")[3].addEventListener("click", function () {
        document.querySelector(".contact-us-form").classList.toggle("active");
    })
}

const toggleContact = () => {
    document.querySelector(".contact-us button").addEventListener("click", function () {
        this.classList.add("active");
        document.querySelector(".contact-us-form").classList.add("active");
    })
    document.querySelector("#contact-close").addEventListener("click", () => {
        document.querySelector(".contact-us button").classList.remove("active");
        document.querySelector(".contact-us-form").classList.remove("active");
    })
}
const fakeLogin = () => {
    document.querySelectorAll("[id*='login-register']").forEach(x => {
        x.addEventListener("click", function () {
            isLogin = true;
            createLogout();
            createMemberCenter();
            fakeLogout();
            if (cart.length == 0) {
                cartStatus("你目前的購物車是空的");
                countCartAmount(0);
            } else {
                countCartAmount(cart.length);
                showCart();
            }
            toggleTip();
            checkoutBtnControl();
            countCartPrice();
            countCartAmount(cart.length);
            localStorage.setItem("login", isLogin);
        })
    })
}

const fakeLogout = () => {
    document.querySelectorAll("[id*='logout']").forEach(x => {
        x.addEventListener("click", function () {
            isLogin = false;
            cartStatus("請先註冊/登入!");
            createLogIn();
            fakeLogin();
            countCartPrice();
            countCartAmount(0);
            toggleTip();
            checkoutBtnControl();
            localStorage.setItem("login", isLogin);
        })
    })
}
const createMemberCenter = () => {
    if (document.querySelector("#login-register")) {
        document.querySelector("#login-register").remove();
    }
    if (document.querySelector("#side-login-register")) {
        document.querySelectorAll(".side-menu-nav .nav-item")[2].remove();
    }

    let buttonMember = document.createElement("button");
    buttonMember.className = "btns border rounded-pill border-skyblue color-skyblue member-center";
    buttonMember.textContent = "會員中心";
    buttonMember.setAttribute("id", "member-center")
    document.querySelector(".nav_btn-group").prepend(buttonMember);
}
const createLogout = () => {
    let button = document.createElement("button");
    button.classList.add("btns");
    button.textContent = "登出";
    button.setAttribute("id", "nav-logout");
    document.querySelector(".nav_btn-group").prepend(button);

    let li = document.createElement("li");
    li.className = "nav-item py-2";

    let a = document.createElement("a");
    a.className = "nav-link color-gray";
    a.setAttribute("href", "javascript:;");
    a.setAttribute("id", "side-logout");

    let i = document.createElement("i");
    i.className = "fas fa-sign-out-alt ml-4 mr-2";
    a.append(i, "登出");

    li.appendChild(a);
    document.querySelector(".side-menu_body .side-menu-nav").appendChild(li)

}
const createLogIn = () => {
    if (document.querySelector("#member-center")) {
        document.querySelector("#member-center").remove();
    }
    if (document.querySelector("#nav-logout")) {
        document.querySelector("#nav-logout").remove();
    }
    if (document.querySelector("#side-logout")) {
        document.querySelectorAll(".side-menu-nav .nav-item")[2].remove();
    }
    let button = document.createElement("button");
    button.className = "btns border rounded-pill border-skyblue color-skyblue login-register";
    button.setAttribute("id", "login-register");
    button.textContent = "註冊/登入";

    document.querySelector(".nav_btn-group").prepend(button);

    if (isLogin == false) {
        let cartButton = document.createElement("button");
        cartButton.className = "btns border rounded-pill border-skyblue color-skyblue login-register center";
        cartButton.setAttribute("id", "cart-login-register");
        cartButton.textContent = "註冊/登入";
        document.querySelector(".cart-body").appendChild(cartButton);
    }

    let li = document.createElement("li");
    li.className = "nav-item py-2";

    let a = document.createElement("a");
    a.className = "nav-link color-gray";
    a.setAttribute("href", "javascript:;");
    a.setAttribute("id", "side-login-register");

    let i = document.createElement("i");
    i.className = "fas fa-user ml-4 mr-2";
    a.append(i, "註冊/登入");

    li.appendChild(a);
    document.querySelector(".side-menu_body .side-menu-nav").appendChild(li);

}
const loadingAnimation = () => {
    setTimeout(() => {
        document.querySelector(".section_loading").classList.add("inactive");
    }, 100)
}
const imgLazyLoad = () => {
    let imgs = document.querySelectorAll(".lazyload");
    let observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.src = entry.target.dataset.src;
                entry.target.removeAttribute("data-src");
                observer.unobserve(entry.target);
            }
        })
    })
    imgs.forEach(item => observer.observe(item));
}
const hoverEffect = () => {
    const imgSrc = document.querySelectorAll(".section_collapse-zone a");
    imgSrc.forEach(item => {
        let img = document.createElement("img");
        img.setAttribute("style", "opacity:0;position:absolute; z-index:-1;top:0;left:0;width:100%");
        img.src = item.dataset.imgsrc;
        document.querySelector("body").append(img);

        item.addEventListener("mouseenter", function () {
            setTimeout(() => {
                document.querySelector(".section_collapse-zone img").src = item.dataset.imgsrc;
            }, 300);
        })
    })
}
const notation = (value) => {
    let length = value.toString().length
    return length <= 3 ? value :
        length == 4 ? `${value.toString().substring(0, 1)},${value.toString().substring(1, 4)}` :
        length == 5 ? `${value.toString().substring(0, 2)},${value.toString().substring(2, 5)}` :
        length == 6 ? `${value.toString().substring(0, 3)},${value.toString().substring(3, 6)}` :
        length == 7 ? `${value.toString().substring(0, 1)},${value.toString().substring(1, 4)},${value.toString().substring(4, 7)}` :
        length == 8 ? `${value.toString().substring(0, 2)},${value.toString().substring(2, 5)},${value.toString().substring(5, 8)}` : `${value.toString().substring(0, 3)},${value.toString().substring(3, 6)},${value.toString().substring(6, 9)}`
}
const swipeDeleteEffect = () => {
    let cartProducts = document.querySelectorAll(".cart-product-item");

    cartProducts.forEach(item => {
        let hammer = new Hammer(item);
        hammer.on("swipeleft", function () {
            item.classList.add("remove");

            item.querySelector(".confirm").addEventListener("click", () => {
                item.classList.add("delete");
                setTimeout(() => {
                    item.remove();
                    let index = cart.findIndex(x => x.id == item.dataset.id);
                    if (index != -1) {
                        cart.splice(index, 1);
                        localStorage.setItem("cart", JSON.stringify(cart));
                        countCartAmount(cart.length);
                        countCartPrice();
                        checkoutBtnControl();
                        toggleTip();
                        if (cart.length == 0) cartStatus("你目前的購物車是空的");
                        toastr.info(`"${item.querySelector(".card-title").textContent}"<span style="float:right;">成功刪除!!</span>`);
                    }
                }, 500);
            })


            item.querySelector(".cancel").addEventListener("click", () => {
                item.classList.remove("remove");
            })
        })
    })
}
const countCartAmount = (count) => {
    if (document.querySelector(".nav-bottom-item .red-dot")) {
        document.querySelector(".nav-bottom-item .red-dot").remove();
    }
    let span = document.createElement("span");
    span.className = "count red-dot";
    document.querySelector(".nav-bottom-item .fa-shopping-cart").prepend(span);
    document.querySelectorAll(".count").
    forEach(x => x.innerText = count);

    if (count == 0) {
        document.querySelector(".cart-body").style.overflowY = "auto";
    } else document.querySelector(".cart-body").style.overflowY = "scroll";
}
const countCartPrice = () => {
    let products = document.querySelectorAll(".cart-product-item");
    if (isLogin == false) {
        document.querySelector(".cart-footer h2").innerText = `小計 : 0 元`;
    } else {
        if (products.length > 0) {
            let total = Array.from(products).map(x => parseInt(x.dataset.price)).reduce((x, y) => x + y);
            document.querySelector(".cart-footer h2").innerText = `小計 : ${notation(total)} 元`;
        } else {
            document.querySelector(".cart-footer h2").innerText = `小計 : 0 元`;
        }
    }
}
const createCartCard = (price, title, items, id) => {
    let card = document.createElement("div");
    card.className = "cart-product-item mb-3";
    card.setAttribute("data-price", price);
    card.setAttribute("data-id", id);

    let row = document.createElement("div");
    row.className = "row no-gutters w-100";

    let col4 = document.createElement("div");
    col4.classList.add("col-4");
    let col8 = document.createElement("div");
    col8.classList.add("col-8");

    let img = document.createElement("img");
    img.src = `https://picsum.photos/300/400/?random=${id}`;
    img.classList = "w-100 h-100";

    col4.append(img);

    let cardBody = document.createElement("div");
    cardBody.className = "card-body py-4 px-3 d-flex flex-column";

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
    a.className = "btns detail";
    a.textContent = "詳情";

    cardBody.append(h3, ul, p, a);
    col8.append(cardBody);

    let btnGroup = document.createElement("div");
    btnGroup.classList.add("btns-group");

    let btnConfirm = document.createElement("button");
    btnConfirm.className = "btns confirm";
    btnConfirm.textContent = "確認刪除";

    let btnCancel = document.createElement("button");
    btnCancel.className = "btns cancel";
    btnCancel.textContent = "取消";
    btnGroup.append(btnConfirm, btnCancel);
    row.append(col4, col8, btnGroup);
    card.appendChild(row);

    document.querySelector(".section_cart-side-menu .cart-body").appendChild(card);
}
const showCart = () => {
    document.querySelector(".section_cart-side-menu .cart-body").innerHTML = "";
    cart.forEach(x => {
        createCartCard(x.price, x.title, x.items, x.id);
    })
    swipeDeleteEffect();
}
const cartStatus = (words) => {
    document.querySelector(".section_cart-side-menu .cart-body").innerHTML = "";
    let word = document.createElement("h4");
    word.textContent = words;
    word.classList.add("center");
    document.querySelector(".section_cart-side-menu .cart-body").appendChild(word);
}
const checkoutBtnControl = () => {
    if (isLogin == false || cart.length == 0) {
        document.querySelector(".cart-footer .checkout").setAttribute("disabled", true);
    } else {
        document.querySelector(".cart-footer .checkout").removeAttribute("disabled");

    }
}
const toggleTip = () => {
    if (isLogin == false || cart.length == 0) {
        document.querySelector(".tip").classList.add("hide");
    } else {
        document.querySelector(".tip").classList.remove("hide");
    }
}


window.addEventListener("load", () => {
    loadingAnimation();
    openHamburger();
    closeHamburger();
    toggleAllService();
    toggleSideMenuAllService();
    toggleCart();
    toggleContact();
    openBottomCart();
    openBottomCustomerService();
    imgLazyLoad();
    hoverEffect();
    toggleTip();

    if (isLogin == false) {
        cartStatus("請先註冊/登入!");
        countCartAmount(0);
        createLogIn();
        fakeLogin();
        countCartPrice();
        checkoutBtnControl();
        toggleTip();
    } else if (isLogin == true) {
        createLogout();
        createMemberCenter();
        fakeLogout();
        if (cart.length == 0) {
            checkoutBtnControl();
            countCartAmount(0);
            countCartPrice();
            cartStatus("你目前的購物車是空的");
        } else {
            showCart();
            countCartPrice();
            countCartAmount(cart.length);
        }
    }

    document.querySelectorAll(".subItem").forEach(x => {
        x.addEventListener("click", function (e) {
            toggleSideMenuSubItem(x, e);
        })
    })

})

window.addEventListener("resize", () => {
    if (window.innerWidth > 1024 && document.querySelector(".side-menu").classList.contains("show")) {
        document.querySelector(".side-menu").classList.remove("show");
    } else {
        document.querySelector(".cart-side-menu").classList.remove("open");
    }

    if (window.innerWidth < 1024) {
        document.querySelector(".section_collapse-zone").classList.remove("open");
        document.querySelector("#collapse").classList.remove("show");
        document.querySelector(".all-service").classList.remove("active");
        document.querySelector("body").classList.remove("open");
    }
    if (window.innerWidth > 1024 && document.querySelector(".contact-us-form").classList.contains("active")) {
        document.querySelector(".contact-us-form").classList.remove("active");
    }
})