Ext.define("myapp.view.cartController", {
    extend: "Ext.app.ViewController",
    alias: "controller.cart",
    onAddButtonClicked: (self) => {
        const { store } = self.up("grid");
        store.add({
            quantity: 1,
            currency: "RUB",
            price: 1,
        });
    },
    onRemoveButtonClicked: (self) => {
        const grid = self.up("grid");
        grid.store.remove(grid.getSelection());
    },
    onCalculateButtonClicked: async (self) => {
        const grid = self.up("grid");
        const { store } = grid;
        grid.mask("Получение данных");
        try {
            const response = await Ext.Ajax.request({
                url: "/calculate-total",
                jsonData: store.getData().items.map((item) => item.data),
            });
            const pricesInValutes = Ext.JSON.decode(response.responseText);
            const pricesInValutesAsArray = Object.entries(pricesInValutes)
                .map(([currency, value]) => ({
                    currency,
                    value,
                }));

            Ext.create("Ext.window.Window", {
                title: "Общая стоимость товаров",
                height: 200,
                width: 400,
                layout: "fit",
                items: {
                    xtype: "grid",
                    border: false,
                    columns: [{
                        header: "Валюта",
                        dataIndex: "currency",
                        flex: 1,
                    }, {
                        header: "Сумма",
                        dataIndex: "value",
                        xtype: "numbercolumn",
                        format: "0.00",
                        flex: 2,
                    }],
                    store: {
                        fields: ["currency", "value"],
                        data: pricesInValutesAsArray,
                    },
                },
            }).show();
        } catch (e) {
            Ext.Msg.alert("Ошибка", "Не удалось получить результат, повторите попытку позже");
        } finally {
            grid.unmask();
        }
    },
});
