// Imagine having information about recent supermarket visit of `customers` find out who spent the most
// You are not allowed using: loops, if, else, switch, var or let statements

function getPurchaseList(receipts, customerId) {
  return receipts
    .filter(customer => customer.customerId === customerId)
    .map(item => item.list)
}

function convertToValues(list) {
  return list.map(purchase => {
    const price = goods.find(good => good.id == purchase.goodId).price
    return Number((price * purchase.amount).toFixed(2))
  })
}

function concatPurchaseList(list) {
  return list.reduce((accumulator, currentItem) => accumulator.concat(currentItem))
}

function getCostSum(list) {
  return list.reduce((sum, current) => sum + current, 0)
}

function createCustomer(customerId) {
  const purchasePriceList = getPurchaseList(receipts, customerId)
  const convertedPriceList = convertToValues(concatPurchaseList(purchasePriceList))
  const sumOfPriceList = getCostSum(convertedPriceList)
  return {
    id: customerId,
    name: customers.find(name => name.id === customerId).name,
    cost: sumOfPriceList
  }
}

function removeDuplicates(list, key = item => item.id) {
  return [
    ...new Map(
      list.map(item => [key(item), item])
    ).values()
  ]
}

function sortBySpentTheMost(list) {
  return list.sort((a, b) => b.cost - a.cost)
}

function toFormatList(list) {
  const getUniqueCustomers = removeDuplicates(list)
  const sortedList = sortBySpentTheMost(getUniqueCustomers)
  return sortedList
}

function getCustomersList() {
  const list = receipts.map(purchase => createCustomer(purchase.customerId))
  const formattedList = toFormatList(list)
  return formattedList
}

function getCustomerSpentTheMost() {
  const isCustomers = `${!!receipts.length}`
  const CustomerSpentTheMost = {
    'false': null,
    'true': getCustomersList()[0]
  }
  return CustomerSpentTheMost[isCustomers]
}

function response() {
  return {
    customerSpentTheMost: getCustomerSpentTheMost(),
    customers: getCustomersList()
  }
}

console.log(response());