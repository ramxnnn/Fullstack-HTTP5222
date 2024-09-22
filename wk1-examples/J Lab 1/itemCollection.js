const ItemCollection = (function () {
  let items = [];

  return {
    addItem: function (item) {
      items.push(item);
    },
    getItemCount: function () {
      return items.length;
    },
  };
})();

export const { addItem, getItemCount } = ItemCollection;
