console.log('HELLO')

class Node {
  constructor(data){
    this.data = data
    this.left = null
    this.right = null
  }
}

class Tree {
  constructor(array){
    this.root = buildTree(array)
  }

}

function buildTree(array, start=0, end=array.length-1){
  //base case
  if(start > end) return null

  const mid = parseInt((start+end)/2)
  const node = new Node(array[mid]) 

  node.left = buildTree(array,start,mid-1)
  node.right = buildTree(array,mid+1,end)

  return node 
}
