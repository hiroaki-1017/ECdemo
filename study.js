Vue.filter('number_format', function(val) {
    return val.toLocaleString();
})
var app = new Vue({
    el: '#app',
    data: {
        //表示中の商品数
        //セ－ル対象のチェック状態
        showSaleItem: false,
        //送料無料のチェック状態
        showDelvFree: false,
        //並び替えの選択値(1.標準、2.価格が安い順)
        sorfOrder: 1,
        //商品リスト
        products: [
            { id:1, name: 'Michel<br>写真', price: 1580, image: '01 (1).jpg', delv: 0, isSale: true },
            { id:2, name: 'Reiji<br>写真', price: 1580, image: '01 (2).jpg', delv: 0, isSale: true },
            { id:3, name: 'Waiyade<br>写真', price: 1380, image: '01 (3).jpg', delv: 240, isSale: true },
            { id:4, name: 'Ojei<br>写真', price: 1280, image: '01 (4).jpg', delv: 0, isSale: false }
        ]
    },
    watch: {
        //セール対象チェックボックスの状態を監視するウォッチャ
        showSaleItem: function(newVal, oldVal) {
            //ここでproductsの配列を書き換える
            console.log('showSaleItemウォッチャが呼び出されました');
        },
        //送料無料チェックボックスの状態を監視するウォッチャ
        showDelvItem: function(newVal, oldVal) {
            //ここでproductsの配列を書き換える
            console.log('showDelvItemウォッチャが呼び出されました');
        },
        sortOrder: function(newVal, oldVal) {
            //ここでproductsの配列を書き換える
            console.log('sortOrderウォッチャが呼び出されました');
        }
    },
    computed: {
        //絞り込み後の商品リストを返すプロパティ
        filteredList: function() {
            //絞り込み後の商品リストを格納する新しい配列
            var newList = [];
            for (var i=0; i<this.products.length; i++) {
                //表示対象かどうかを判定するフラグ
                var isShow = true;
                //i番目の商品が表示対象かどうかを判定する
                if (this.showSaleItem && !this.products[i].isSale) {
                    //「セール対象」チェックありで、セール対象ではないとき
                    isShow = false;
                }
                if (this.showDelvFree && this.products[i].delv > 0) {
                    isShow = false;
                }
                //表示対象の商品だけ新しい配列に追加する
                if (isShow) {
                    newList.push(this.products[i]);
                }
            }
            //新しい配列を並び変える
            if (this.sortOrder == 1) {
                //標準の並び替え済み
            }
            else if (this.sortOrder == 2) {
                //価格が安い順に並び返る
                newList.sort(function(a,b){
                    return a.price - b.price;
                });
            }
            //絞り込み後の商品リストを返す
            return newList;
        }
    }
});