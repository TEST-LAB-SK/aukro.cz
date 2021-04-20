export const data = {

    url: {
        mainPage: '/',
        filterQuery: 'paymentViaAukro=true'
    },

    moneyBackGuarantee: '#money-back-guarantee',

    menu: {
        self: 'div.nav-section.main-menu > top-level-category',
        filter: 'mat-checkbox'
    },

    categoryView: {
        self: 'filter > categories > ul > li',
        count: 'span.quantity'
    },

    listView: {
        self: 'list-view > list-card',
        item: {
            header: '.product-header'
        },
        validCount: 5
    },

    itemView: {
        header: 'heading.hidden-max-tablet',
        delivery: 'delivery-info',
        info: 'info',
        currentPrice: '.current-price > .price',
        priceInput: 'input[type="number"]',
        buyButton: 'button[data-action="buy"]',
        bidButton: 'button[data-action="bid"]',
    },

    basket: {
        self: 'basket-item'
    },

    loginButton: 'button[type="submit"]',
    
    popup: {
        self: 'mat-dialog-container',
        close: 'header > a'
    }

}
