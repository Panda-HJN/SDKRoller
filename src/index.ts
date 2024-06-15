import "./styles/styles";
import {tax} from "./a";

interface Good {
    price: number;
    edible: 0 | 1;
}

interface GoodsData {
    type: 0 | 1 | 2 | 3;
    items: Good[   ];
}

export function getAllEdibleGoods(goods: GoodsData) {
    if (!goods.type) return [];
    return goods.items
        .filter((g) => g.edible)
        .map((g) => {
            return {
                ...g,
                price: g.price + tax,
            };
        });
}

export const USER_CONFIG = 9527;
