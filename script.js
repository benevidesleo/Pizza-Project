const dq = (e) => {
    return document.querySelector(e) // CRIAÇAO DA VARIAVEL SIMPLIFICADA DO DOCUMENT.QUERYSELECTOR
}
const dsa = (e) => {
    return document.querySelectorAll(e)// CRIAÇAO DA VARIAVEL SIMPLIFICADA DO DOCUMENT.QUERYSELECTORALL
}

let modalQt = 1
let cart = []
let modalKey = 0

pizzaJson.map((item, index) => { // LISTAGEM DO PIZZAJSON
    let clone = dq('.models .pizza-item').cloneNode(true)


    // CRIAÇAO DAS INFORMACOES DA PIZZA NO DOCUMENT 
    clone.setAttribute('data-key', index)
    clone.querySelector('.pizza-item--img img').src = item.img
    clone.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    clone.querySelector('.pizza-item--name').innerHTML = item.name
    clone.querySelector('.pizza-item--desc').innerHTML = item.description

    // EVENTOS DE CLICK NA PIZZA
    clone.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault()
        let key = e.target.closest('.pizza-item').getAttribute('data-key')
        modalQt = 1
        modalKey = key

        //CRAIÇAO DAS INFORMACOES DA PIZZA DENTRO DO MODAL
        dq('.pizzaBig img').src = pizzaJson[key].img
        dq('.pizzaInfo h1').innerHTML = pizzaJson[key].name
        dq('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
        dq('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`
        dq('.pizzaInfo--size.selected').classList.remove('selected')


        //FUNÇAO DOS PESOS DA PIZZA 
        /* USANDO O QUERY SELECTOR ALL, MAS USANDO O FOR EACH PARA COLOCAR EM CADA UM DELES SEPARADOS
        SELECIONANDO E DESELECIONANDO O BOTAO TAMBEM */
        dsa('.pizzaInfo--size').forEach((size, sizeIndex) => {

            if (sizeIndex === 2) {
                size.classList.add('selected')
            }

            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
        })

        dq('.pizzaInfo--qt').innerHTML = modalQt

        dq('.pizzaWindowArea').style.opacity = 0
        dq('.pizzaWindowArea').style.display = 'flex'
        setTimeout(() => {
            dq('.pizzaWindowArea').style.opacity = 1
        }, 200)
    })


    dq('.pizza-area').append(clone)
})

// EVENTOS DO MODAL

//  EVENTO DE FECHAR O MODAL
function closeModal() {
    dq('.pizzaWindowArea').style.opacity = 0
    setTimeout(() => {
        dq('.pizzaWindowArea').style.display = 'none'
    }, 500)
}

dsa('.pizzaInfo--cancelMobileButton, .pizzaInfo--cancelButton').forEach((item) => {
    item.addEventListener('click', closeModal)
})


// EVENTO DE AUMENTAR A QUANTIDADE DE PIZZAS

// BUTTON +
dq('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQt++
    dq('.pizzaInfo--qt').innerHTML = modalQt
})

// BUTTON -
dq('.pizzaInfo--qtmenos').addEventListener('click', () => {

    if (modalQt > 1) {
        modalQt--
        dq('.pizzaInfo--qt').innerHTML = modalQt
    } else {
        dq('.pizzaInfo--qt').innerHTML = 1
    }
})

// AÇAO DE TROCA DE SELEÇAO DO BOTAO TAMANHO
dsa('.pizzaInfo--size').forEach((size) => {
    size.addEventListener('click', (e) => {
        dq('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected')
    })
})

//  EVENTO DE ADICIONAR AO CARRINHO

dq('.pizzaInfo--addButton').addEventListener('click', () => {
    /*saber qual a pizza
    console.log('pizza: '+ modalKey)

     SABER QUAL O TAMANHO DA PIZZA
    let getSize = dq('.pizzaInfo--size.selected').getAttribute('data-key')
    console.log('pizza: '+getSize)

     QUANTAS PIZZAS PEGOU
    console.log('quantidade: '+ modalQt) 
    */

    let getSize = dq('.pizzaInfo--size.selected').getAttribute('data-key')

    let identifier = pizzaJson[modalKey].id + '#' + getSize

    let getkey = cart.findIndex((item) => {
        return item.identifier === identifier
    })

    if (getkey > -1) {
        cart[getkey].qt += modalQt
    } else {

        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            getSize,
            qt: modalQt
        })
    }

    updateCart()
    closeModal()
})

// EVENTOS DO CARRINHO

function updateCart() {
    if (cart.length > 0) {
        dq('aside').classList.add('show')
        dq('.cart').innerHTML = ' '
        for (let i in cart) {

            let pizzaItem = pizzaJson.find((item) => {
                return item.id === cart[i].id
            })

            let cartItem = dq('.models .cart--item').cloneNode(true)
            cartItem.querySelector('img').src = pizzaItem.img
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaItem.name
           // cartItem.querySelector('.cart--item-nome').innerHTML = pizzaItem.name

            dq('.cart').append(cartItem)

        }
    } else {
        dq('aside').classList.remove('show')
    }
}