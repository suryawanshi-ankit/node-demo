// Trade off between query performance vs consistency

// Using References (Normalization) -> CONSISTENCY
// needs to run multiple query
let author = {
  name: 'Ankit'
}

let course = { 
  author: 'id' // taking refrence from author
}

// Using Embedded Documents (Denormalization) -> PERFORMANCE
// single query is used
let courseEmbedded = {
  author: {

  }
}

//Hybrid 
let authorHybrid = {
  name: 'Mosh'
  // 50 other properties
}

let courseHybrid = {
  author: {
    id: 'reference to author document',
    name: 'Ankit'
  }
}
