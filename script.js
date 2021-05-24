const receipts = [
  {
    customerId: 1,
    list: [
      { goodId: 1, amount: 2 },
      { goodId: 2, amount: 1 },
      { goodId: 3, amount: 5 },
    ]
  },
  {
    customerId: 2,
    list: [
      { goodId: 1, amount: 4 },
      { goodId: 2, amount: 2 },
    ]
  },
  {
    customerId: 3,
    list: [
      { goodId: 1, amount: 3 },
      { goodId: 2, amount: 10 },
    ]
  },
  {
    customerId: 1,
    list: [
      { goodId: 3, amount: 3 },
    ]
  },
]

const customers = [
  { id: 1, name: 'Jon' },
  { id: 2, name: 'Arya' },
  { id: 3, name: 'Sansa' },
]

const goods = [
  { id: 1, name: 'Beef', price: 7.99 },
  { id: 2, name: 'Bread', price: 1.99 },
  { id: 3, name: 'Beer', price: 3.99 },
]

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

function removeDuplicatesData(list, key) {
  return [
    ...new Map(
      list.map(item => [key(item), item])
      ).values()
    ]
  }
  
  function sortCustomersBySpentTheMost(list) {
  return list.sort((a, b) => b.cost - a.cost)
}

function transformListIntoRequiredForm(list, key = item => item.id) {
  const uniqueCustomersData =  removeDuplicatesData(list, key)
  const sortedList = sortCustomersBySpentTheMost(uniqueCustomersData)
  return sortedList
}

function getCustomersList() {
  return receipts.map(purchase => createCustomer(purchase.customerId))
}

function getCustomerSpentTheMost() {
  const isSpentTheMostCustomer = transformListIntoRequiredForm(getCustomersList())[0]
  return isSpentTheMostCustomer?? '\nOops\nThere have been no customers yet'
}

console.log('Supermarket visiter \nthat has spent the most:\n',getCustomerSpentTheMost()); 

