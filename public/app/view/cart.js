Ext.define("myapp.view.cart", {
    extend: "Ext.grid.Panel",
    alias: "widget.myapp.view.cart",
    title: "Моя корзина",
    requires: [
        "myapp.view.cartController",
    ],
    controller: "cart",
    columns: [{
        text: "Наименование",
        dataIndex: "name",
        flex: 4,
        editor: "textfield",
    }, {
        text: "Количество",
        dataIndex: "quantity",
        flex: 1,
        editor: {
            xtype: "numberfield",
            value: 1,
            maxValue: 99,
            minValue: 1,
            step: 1,
            decimalPrecision: 0,
        },
    }, {
        text: "Валюта",
        dataIndex: "currency",
        flex: 1,
        editor: {
            xtype: "combo",
            store: {
                fields: ["abbr", "name"],
                data: [{
                    abbr: "RUB",
                    name: "RUB",
                }, {
                    abbr: "USD",
                    name: "USD",
                }, {
                    abbr: "EUR",
                    name: "EUR",
                }],
            },
            value: "RUB",
            queryMode: "local",
            displayField: "name",
            valueField: "abbr",
        },
    }, {
        text: "Цена",
        dataIndex: "price",
        flex: 1,
        editor: {
            xtype: "numberfield",
            value: 1,
            maxValue: 1000000,
            minValue: 0.01,
            step: 0.01,
            decimalPrecision: 2,
        },
    }],
    selModel: "rowmodel",
    plugins: {
        ptype: "rowediting",
        clicksToEdit: 1,
    },
    layout: "fit",
    tbar: [{
        text: "Добавить",
        handler: "onAddButtonClicked",
    }, "-", {
        text: "Удалить",
        handler: "onRemoveButtonClicked",
    }],
    buttons: [{
        text: "Посчитать",
        handler: "onCalculateButtonClicked",
    }],
});
