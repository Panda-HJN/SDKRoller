import "./styles/global.less"
type Goods = {
  price: number;
  available: 1 | 0;
};
interface Log {
  type: 0 | 1 | 2 | 3;
  items: Goods[];
}
export  function main(log: Log) {
  if (!log.type) return [];
  return log.items;
}
export const USER_CONFIG = 9527
