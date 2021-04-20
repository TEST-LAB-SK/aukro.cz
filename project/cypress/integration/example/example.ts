// NOTE: App devs should setup their apps to not show random popus in case of cypress testing mode!
//       if(window.Cypress) {}

import { data } from '@helpers/example'

let pageInfo = []
let categoryItem = {
  count: "3568",
  name: "Bankovky",
  url: "https://aukro.cz/bankovky?paymentViaAukro=true"
}

describe('Payment scenario', function() {

  before(function() {
    loadPageInfo()
  })

  it('Validate all items of selected category', function() {
    categoryItem = getFirstValidCategoryItem()
    cy.wrap(categoryItem).should('not.be.null').then(() => {
        cy.visit(categoryItem.url)

        // check listview item header
        cy.get(data.listView.self).each(($listviewItem, $listviewItemIndex, $listviewItems) => {
          cy.log($listviewItem.find(data.listView.item.header).text())
          cy.wrap($listviewItem)
            .find(data.moneyBackGuarantee)
            .should('exist')
        })
      })
  })

  it('Validate selected item', function() {
    //get listview index for click
    const listviewCount = Cypress.$(data.listView.self).length
    const listviewItemIndex = listviewCount % 2 != 0 ? (listviewCount-1)/2 : Math.floor(Math.random() * listviewCount)
    
    // select listview item
    cy.get(data.listView.self).eq(listviewItemIndex)
      .find(data.listView.item.header)
      .click()

    // check itemview header
    cy.get(data.itemView.header)
      .find(data.moneyBackGuarantee)
      .should('exist')

    // check itemview delivery
    cy.get(data.itemView.delivery)
      .find(data.moneyBackGuarantee)
      .should('exist')
  })

  it('Buy/Bid selected item', function() {
    cy.get(data.itemView.info).then($info => {
      // get payments posibilities
      let btnBuyExists = $info.find(data.itemView.buyButton).length == 1
      let btnBidExists = $info.find(data.itemView.bidButton).length == 1
      if(btnBuyExists && btnBidExists) {
        btnBuyExists = Math.floor(Math.random() * 2) == 0 ? true : false
        btnBidExists = !btnBuyExists
      }

      // buy item
      if(btnBuyExists) {
        cy.get(data.itemView.buyButton)
          .click()

        cy.get(data.basket.self).should($basket => {
          expect($basket).to.have.length(1)
        })

      // bid item
      } else if(btnBidExists) {
        // NOTE: sometimes button is disabled (not clickable), which leads to failure test

        const listviewItemCurrentPrice = parseFloat($info.find(data.itemView.currentPrice).text().replace(' ','').slice(0, -2))
        const listviewItemBidPrice = (listviewItemCurrentPrice * 1.2).toFixed(2)

        cy.get(data.itemView.priceInput)
          .type(listviewItemBidPrice.toString())
          
        cy.get(data.itemView.bidButton)
          .click()

        cy.get(data.loginButton)
          .contains('Přihlásit se')

      // TODO: What action should ocure in case of no button exists?
      } else {

      }

    })
  })

})

function loadPageInfo() {
  cy.visit(data.url.mainPage)

  cy.get(data.menu.self).each(($menuItem, $menuItemIndex, $menuItems) => {
    // go to menu item
    const menuItemName = $menuItem.find('a').text()
    const menuItemUrlWithFilterQuery = $menuItem.find('a').attr('href') + '?' + data.url.filterQuery
    cy.visit(menuItemUrlWithFilterQuery)

    // get category items info
    cy.get(data.categoryView.self).then($categoryItems => {
      let categoryInfo = []
      for(let i=0; i<$categoryItems.length; i++) {
          const categoryItem = $categoryItems[i].getElementsByTagName('a')[0]
          categoryInfo.push({
            name: categoryItem.innerText.replace(/(.*) \(.*\)/, '$1').trim(),
            count: categoryItem.innerText.replace(/.* \((.*)\)/, '$1').trim(),
            url: categoryItem.href
          })
      }

      // add menu item info
      pageInfo.push({
        name: menuItemName,
        url: menuItemUrlWithFilterQuery,
        categories: categoryInfo
      })
    })
  })
}

function getFirstValidCategoryItem() {
  for(let i=0; i<pageInfo.length; i++) {
    for(let j=0; j<pageInfo[i].categories.length; j++) {
      if(pageInfo[i].categories[j].count >= data.listView.validCount) {
        return pageInfo[i].categories[j]
      }
    }
  }
  return null
}
