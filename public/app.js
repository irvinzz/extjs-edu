const cartStore = Ext.create('Ext.data.Store', {
    storeId: 'cartStore',
    fields: ['name', 'quantity', 'currency', 'price'],
    autoSync: true,
    data: [{
        name: 'Яблочный пирог',
        quantity: 1,
        currency: 'USD',
        price: 2
    }, {
        name: 'Велосипед',
        quantity: 1,
        currency: 'USD',
        price: 312
    }, {
        name: 'White Horse',
        quantity: 4,
        currency: 'EUR',
        price: 15
    }, {
        name: 'Red bull',
        quantity: 22,
        currency: 'EUR',
        price: 2,
    }, {
        name: 'Borjomi',
        quantity: '10',
        currency: 'EUR',
        price: 1.15
    }, {
        name: 'Мезим',
        quantity: 1,
        currency: 'RUB',
        price: 240.50
    }],
});

const mainGrid = Ext.create('Ext.grid.Panel', {
    title: 'Моя корзина',
    store: cartStore,
    columns: [{
        text: 'Наименование',
        dataIndex: 'name',
        flex: 4,
        editor: 'textfield'
    }, {
        text: 'Количество',
        dataIndex: 'quantity',
        flex: 1,
        editor: {
            xtype: 'numberfield',
            value: 1,
            maxValue: 99,
            minValue: 1,
            step: 1,
            decimalPrecision: 0,
        },
    }, {
        text: 'Валюта',
        dataIndex: 'currency',
        flex: 1,
        editor: {
            xtype: 'combo',
            store: Ext.create('Ext.data.Store', {
                fields: ['abbr', 'name'],
                data: [{
                    abbr: 'RUB',
                    name: 'RUB',
                }, {
                    abbr: 'USD',
                    name: 'USD',
                }, {
                    abbr: 'EUR',
                    name: 'EUR',
                }]
            }),
            value: 'RUB',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'abbr',
        }
    }, {
        text: 'Цена',
        dataIndex: 'price',
        flex: 1,
        editor: {
            xtype: 'numberfield',
            value: 1,
            maxValue: 1000000,
            minValue: 0.01,
            step: 0.01,
            decimalPrecision: 2,
        },
    }],
    selModel: 'rowmodel',
    plugins: {
        ptype: 'rowediting',
        clicksToEdit: 1
    },
    layout: 'fit',
    tbar: [{
        text: 'Добавить',
        handler: () => {
            cartStore.add({});
        }
    }],
    buttons: [{
        text: 'Посчитать',
        handler: async () => {
            mainGrid.mask('Получение данных');
            const response = await Ext.Ajax.request({
                url: '/calculate-total',
                jsonData: cartStore.getData().items.map(item => item.data),
            });
            mainGrid.unmask();
            const pricesInValutes = Ext.JSON.decode(response.responseText);
            const pricesInValutesAsArray = Object.entries(pricesInValutes).map(([currency, value]) => {
                return {
                    currency,
                    value,
                };
            });

            Ext.create('Ext.window.Window', {
                title: 'Общая стоимость товаров',
                height: 200,
                width: 400,
                layout: 'fit',
                items: {
                    xtype: 'grid',
                    border: false,
                    columns: [{
                        header: 'Валюта',
                        dataIndex: 'currency',
                        flex: 1,
                    }, {
                        header: 'Сумма',
                        dataIndex: 'value',
                        xtype: 'numbercolumn',
                        format: '0.00',
                        flex: 2,
                    }],
                    store: Ext.create('Ext.data.Store', {
                        fields: ['currency', 'value'],
                        data: pricesInValutesAsArray
                    })
                }
            }).show();
        }
    }],
    renderTo: Ext.getBody()
});
