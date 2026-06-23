// 潮汕美食清单。status 决定优先级配色：must > high > mid > low
export const foods = [
  { name: "牛肉火锅", emoji: "🥩", priority: "必吃", note: "鲜切各部位，涮的秒数不同", status: "must" },
  { name: "粿条/粿汁", emoji: "🍜", priority: "必吃", note: "促肉粿条汤 / 粿汁配卤味", status: "must" },
  { name: "肠粉", emoji: "🥟", priority: "必吃", note: "潮汕厚皮版，馅料丰富", status: "must" },
  { name: "砂锅粥+生腌", emoji: "🦐", priority: "强推", note: "海鲜粥配生腌虾蟹", status: "high" },
  { name: "卤鹅", emoji: "🪿", priority: "强推", note: "狮头鹅，蘸蒜泥醋", status: "high" },
  { name: "冰室/甜品", emoji: "🧊", priority: "推荐", note: "解暑必备，鸭母捻/豆花", status: "mid" },
  { name: "梅汁水果", emoji: "🍊", priority: "推荐", note: "甘草水果，路边随买", status: "mid" },
  { name: "蚝烙", emoji: "🦪", priority: "有空就吃", note: "潮汕版蚵仔煎", status: "low" },
];
