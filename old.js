load = async () => {
    const data = await fetch('./data.json')
    if (!data) return {}
    return await data.json()
}
getId = (id) => document.querySelector(`#${id}`);
newEl = (el) => document.createElement(el)
addDiv = (id, content) => {
    const d = newEl('div')
    d.innerHTML = JSON.stringify(content)
    getId(id).append(d)
}
addTo = (el, content) => {
    el.append(content)
    return el
}
addHtml = (el, content) => {
    el.innerHTML = content;
    return el
}

simpleCard = (item) => {
    const card = newEl('div')

    if (item.id) {
        card.id = item.id
    }
    if (item.title) addTo(card, addHtml(newEl('h2'), item.title))

    if (item.description) addTo(card, addHtml(newEl('p'), item.description))

    if (item.items) {
        for (let subItem of item.items) addTo(card, newCard(subItem))
    }


    addTo(getId("itens"), card)
}

newCard = (item) => {
    let card = newEl('div')


    if (item.type) {
        if (item.type == "techs") {
            addTo(card, addHtml(p, item.title))
        }
        else if (item.type == "skill") {
            card = newEl('span')
            card.style = "padding: 2px"
            i = newEl('i')
            i.style = "padding: 2px"
            addHtml(card, item.title)
            addTo(card, addHtml(i, item.grade))
        }
        else if (item.type == "employee") {
            addTo(card, addHtml(newEl('h3'), item.title))
            if (item.client) {
                addTo(card, addHtml(newEl('h4'), item.client))
            }
            if (item.ocupation) {
                addTo(card, addHtml(newEl('h5'), item.ocupation))
            }
            if (item.period) {
                addTo(card, addHtml(newEl('p'), item.period))
            }
            if (item.location) {
                addTo(card, addHtml(newEl('p'), item.location))
            }

            if (item.techs) {
                for (let d of item.techs) {
                    let s = newEl('span')
                    s.style = "padding: 2px"
                    addTo(card, addHtml(s, d))
                }
            }
        }
    }


    else if (item.title) {
        addTo(card, addHtml(newEl('h3'), item.title))
    }

    if (item.description) {
        addTo(card, addHtml(newEl('p'), item.description))
    }


    //let l = addTo(getId("itens"), card)
    /*
    if (item.items) {
    for (let item1 of item.items) {
    console.log(4, item1)
    let x = newCard(item1)
    addTo(card, x)
    }
    } */

    return card

}

populate = (data) => {
    console.log(1, data)
    if (!data || !data.pages) return;
    //console.log(2, data.pages)
    for (let pages of data.pages) {
        //console.log(3, pages)
        simpleCard(pages)
    }

}

let d = getId("dt");

load().then(q => {
    populate(q);
    d.innerHTML = ""; //JSON.stringify(q)
}).catch(q => {
    console.log('ss', q)
    d.innerHTML = "Erro ao carregar";
})