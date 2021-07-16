// Imagine having information about recent supermarket visit of `customers` find out who spent the most
// You are not allowed using: loops, if, else, switch, var or let statements

const concatPurchaseList = (list) => list.reduce((accumulator, currentItem) => accumulator.concat(currentItem))

const getPurchaseList = (receiptsList, id) => {
  const purchaseList = receiptsList
    .filter(customer => customer.customerId === id)
    .map(item => item.list)
  return concatPurchaseList(purchaseList)
}

const convertToValues = (list) => list.map(purchase => {
  const { price } = goods.find(good => good.id == purchase.goodId)
  return Number((price * purchase.amount).toFixed(2))
})

const getCostSum = (list) => list.reduce((sum, current) => sum + current, 0)

const createCustomer = (list, id) => {
  const convertedPriceList = convertToValues(getPurchaseList(list, id))
  const cost = getCostSum(convertedPriceList)
  const { name } = customers.find(name => name.id === id)
  return {
    id,
    name,
    cost,
  }
}

const removeDuplicates = (list, key = item => item.id) => [
  ...new Map(list
    .map(item => [key(item), item]))
    .values()
]

const sortBySpentTheMost = list => list.sort((a, b) => b.cost - a.cost)

const convertToFormatList = list => sortBySpentTheMost(removeDuplicates(list))

const getCustomersList = list => {
  const receiptsList = list.map(purchase => createCustomer(list, purchase.customerId))
  return convertToFormatList(receiptsList)
}

const getCustomerSpentTheMost = list => list?.length ? list[0] : null

const response = (receiptsList = []) => {
  const customers = getCustomersList(receiptsList)
  const customerSpentTheMost = getCustomerSpentTheMost(customers)
  return {
    customers,
    customerSpentTheMost,
  }
}

console.log(response(receipts));