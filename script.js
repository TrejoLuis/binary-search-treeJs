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
    this.root = buildTree(prepareArray(array))
  }

  insert(value){
    const node = new Node(value)
    if(!this.root) {
      this.root = node
      return
    }

    let prevN = null
    let tmpN = this.root
    while(tmpN){
      //Ignore duplicated entry, to preserve the Tree
      if(node.data == tmpN.data) return
      else if(node.data > tmpN.data){
        prevN = tmpN
        tmpN = prevN.right
      } else {
        prevN = tmpN
        tmpN = prevN.left
      }
    }
    //Inserting node to a leaf
    if(node.data > prevN.data) prevN.right = node
    else prevN.left = node
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

function prettyPrint (node, prefix = '', isLeft = true){
  if (node === null) {
     return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

function prepareArray(array){
  const set = new Set(array.sort((a,b) => a - b))
  return [...set]
}
