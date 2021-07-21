// Imagine having information about recent supermarket visit of `customers` find out who spent the most
// You are not allowed using: loops, if, else, switch, var or let statements

const concatLists = list => list.reduce((accumulator, currentItem) => accumulator.concat(currentItem))

const concatCostsList = list => concatLists(list.map(item => item.list))

const getCostsList = lists => id => concatCostsList(lists.receipts.filter(item => item.customerId === id))

const reducePriceList = (list) => list.reduce((sum, current) => sum + current, 0)

const getPriceList = goods => list =>  list.map( item => Number((goods.find(good => good.id === item.goodId).price * item.amount).toFixed(2)))

const getSumCosts = lists => costsList => reducePriceList(getPriceList(lists.goods)(costsList))

const getCustomersCostsList = (customers, sumFn, listFn) => customers.map(item => ({ ...item, cost: sumFn(listFn(item.id)) }))

const getCustomerSpentTheMost = list => list?.length ? list[0] : null

const customersCostsList = lists => getCustomersCostsList(lists.customers, getSumCosts(lists), getCostsList(lists))

const response = lists => ({ spentTheMost: getCustomerSpentTheMost(customersCostsList(lists)), customers: customersCostsList(lists)})

console.log(response({ customers, receipts, goods }));

