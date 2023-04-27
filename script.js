
class Node {
  constructor(data){
    this.data = data
    this.left = null
    this.right = null
  }
}

class Tree {
  constructor(array = []){
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

  delete(value){
    if(!this.root) return
    let prevN = this.root
    let prevDir = null
    let currN = this.root
    while(currN !== null){
      console.log('currData = '+currN.data )
      console.log('prevData = '+prevN.data)
      if(value === currN.data){
        //If the node has no children and it s not root
        if(!currN.left && !currN.right){
          //no root
          prevDir == null 
            ? this.root = null
            : prevDir == 'l' 
              ? prevN.left = null
              : prevN.right = null
          return
        //Only has left child
        } else if (currN.left && !currN.right){
          prevDir == null 
            ? this.root = currN.left
            : prevDir == 'l'
              ? prevN.left = currN.left
              : prevN.right = currN.left
          return
           
        //Only has right child
        } else if (!currN.left && currN.right){
          prevDir == null 
            ? this.root = currN.right
            : prevDir == 'l'
              ? prevN.left = currN.right
              : prevN.right = currN.right
          return

        //has both children
        } else {
          //min from rigth subtree
          let minN = this.#minNode(currN.right) 
          // caching minNode data to be swaped with 'delete node'
          let tempV = minN.data
          //delete minNode because it'll replace the 'delete node'
          this.delete(tempV)
          // asign correct data 
          currN.data = tempV
          return

        }
      } else if(value > currN.data){
        prevN = currN
        prevDir = 'r'
        currN = prevN.right
      } else {
        prevN = currN
        prevDir = 'l'
        currN = prevN.left
      }
    }
    return false
  }

  find(value){
    if(!this.root) return null
    let currentN = this.root
    while(currentN){
      if(currentN.data === value) return currentN
      else if(value > currentN.data) currentN = currentN.right
      else currentN = currentN.left
    }
    return null
  }

  levelOrderIterative(callbackFn){
    if(!this.root) return null
    let queue = []
    let output = []
    queue.push(this.root)
    while(queue.length > 0){
      let currentN = queue[0]
      //Apply callbackFn or just push to array
      callbackFn ? callbackFn(currentN) : output.push(currentN.data)
      if(currentN.left) queue.push(currentN.left)
      if(currentN.right) queue.push(currentN.right)
      queue.shift()
    }
    if(!callbackFn) return output
  }

  //First call
  levelOrderRecursive(callbackFn){
    let outputArray = []
    this.#lvlOrderRec(callbackFn, outputArray, this.root)
    if(!callbackFn) return outputArray
  }

  inorder(callbackFn, array = [], node = this.root){
    if(!node) return null
    if(node.left) this.inorder(callbackFn, array, node.left)
    callbackFn ? callbackFn(node) : array.push(node.data)
    if(node.right) this.inorder(callbackFn, array, node.right)
    if(!callbackFn) return array
  }

  preorder(callbackFn, array = [], node = this.root){
    if(!node) return null
    callbackFn ? callbackFn(node) : array.push(node.data)
    if(node.left) this.preorder(callbackFn, array, node.left)
    if(node.right) this.preorder(callbackFn, array, node.right)
    if(!callbackFn) return array
  }

  postorder(callbackFn, array = [], node = this.root){
    if(!node) return null
    if(node.left) this.postorder(callbackFn, array, node.left)
    if(node.right) this.postorder(callbackFn, array, node.right)
    callbackFn ? callbackFn(node) : array.push(node.data)
    if(!callbackFn) return array
  }

  depth(node){
    if(!this.root || typeof node == 'string' || typeof node == 'number') return null
    let dist = 0
    let currentN = this.root
    while(currentN){
      if(node.data === currentN.data) return dist
      if(node.data > currentN.data) currentN = currentN.right
      else currentN = currentN.left
      dist++
    }
    return null
  }

  isBalanced(){
    if(!this.root) return null
    let balanced = true
    //using preorder to check all nodes
    this.preorder( node => {
      let leftH = this.height(node.left)
      let rightH = this.height(node.right)
      if(Math.abs(leftH - rightH) > 1) balanced = false
    })
    return balanced
  }

  height(node){
    if(node == null || typeof node == 'string' || typeof node == 'number') return -1
    return Math.max(this.height(node.left),this.height(node.right))+1
  }

  rebalance(){
    if(!this.root) return null
    //inorder array
    this.root = buildTree(this.inorder())
  }

  //Real recursive Fn
  #lvlOrderRec(callbackFn, array, node){
    if(!node) return null
    callbackFn ? callbackFn(node) : array.push(node.data)
    if(node.left) this.#lvlOrderRec(callbackFn, array, node.left)
    if(node.right) this.#lvlOrderRec(callbackFn, array, node.right)
  }

  #minNode(node){
    let currentN = node
    while(currentN.left){
      currentN = currentN.left
    }
    return currentN
  }
}

driver()

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

function randomArray(size){
  return Array.from({ length: size }, () => Math.floor(Math.random() * 1000));
}

function insertRandomTreeValues(tree,size){
  if(!(tree instanceof Tree)) return null
  randomArray(size).forEach(n => tree.insert(n))
}

function driver(){
  const binT = new Tree(randomArray(15))
  console.log('Tree created...')
  prettyPrint(binT.root)
  console.log(binT.isBalanced() ? 'Tree is balanced' : 'Tree is not balanced')
  console.log(`Preorder: \n${binT.preorder()}`)
  console.log(`Inorder: \n${binT.inorder()}`)
  console.log(`Postorder: \n${binT.postorder()}`)
  console.log('Unbalancing Tree by insert several values...')
  insertRandomTreeValues(binT, 100)
  console.log(binT.isBalanced() ? 'Tree is balanced' : 'Tree is not balanced')
  console.log('Rebalancing tree...')
  binT.rebalance()
  console.log(binT.isBalanced() ? 'Tree is balanced' : 'Tree is not balanced')
  console.log(`Preorder: \n${binT.preorder()}`)
  console.log(`Inorder: \n${binT.inorder()}`)
  console.log(`Postorder: \n${binT.postorder()}`)
}


