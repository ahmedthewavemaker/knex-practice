require('dotenv').config()
const knex = require('knex')


const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
})

function searchProdByName(searchTerm){
    knexInstance
        .select('*')
        .from('shopping_list')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result =>{
      console.log(result)
        })
}

searchProdByName('fish')



function paginateItems(page){
    const items = 6
    const offset = items * (page - 1)
    knexInstance
        .select('*')
        .from('shopping_list')
        .limit(items)
        .offset(offset)
        .then(resuts=>{
            console.log(resuts)
        })

}

paginateItems(2)



function itemsAddedDaysAgo(days){
    knexInstance
        .select('*')
        .from('shopping_list')
        .where(
            'date_added',
            '>',
            knexInstance.raw(`now() - '?? days' ::INTERVAL`, days)
        )
        .then(results=>
            console.log(results))

}

itemsAddedDaysAgo(7)



function priceByCategory(){
    knexInstance
        .select('category')
        .from('shopping_list')
        .sum('price as total')
        .groupBy('category')
        .then(result=>{
            console.log(result)
        })
}

priceByCategory()

