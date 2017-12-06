findTopSellers = require('./aws-api/api-call.js').findTopSellers;
findSimilarItems = require('./aws-api/api-call.js').findSimilarItems;

class TreeNode {
  constructor(parent, itemId) {
    this._itemId = itemId;
    this._parent = parent;
    this._children = [];
  }

  set parent(parent) {
    this._parent = parent;
  }

  set children(children) {
    this._children = children;
  }

  set itemId(id) {
    this._itemId = id;
  }

  get children() {
    return this._children;
  }

  get parent() {
    return this._parent;
  }

  get itemId() {
    return this._itemId;
  }
}

const listOfCategories = [2350149011, 2617941011, 15684181, 165796011, 3760911, 283155,
502394, 10963061, 2335753011, 468642, 541966, 16310211, 3760901,
16310161,3367581,133140011,284507,599858,2625373011,2334092011,5174,11091801,1064954,2619533011,672123011,229534,228013,165793011];

//const listOfCategories = ['2350149011'];
class GetItem {
  constructor(){
    this.root = new TreeNode(null, '');
    this.curr = new TreeNode(null, '');
    this.numOfDislikes = 0;
    this.categoryIndex = 0;
    this.similarIndex = 0;
  }

  getFirstItem(callback) {
    this.setNewRoot(callback);
  }

  selectAfterDislike(callback) {
    //get parent's next child.
    console.log('afterdislike');
    if(this.curr.parent !== null) {
      let parent = this.curr.parent;
      this.curr = parent.children[this.numOfDislikes];
      callback(this.curr.itemId);
    }
  }

  generateSubtree(callback) {
    let similarItems = findSimilarItems(this.curr.itemId, (similarItems) => {
      let arrayOfTrees = [];
      for(let i = 0; i < similarItems.length; i++) {
        let newTree = new TreeNode(this.root, similarItems[i]);
        arrayOfTrees.push(newTree);
      }
      console.log('similar items = ', similarItems);
      this.curr.children = arrayOfTrees;
      this.curr.parent = this.curr;
      this.curr = this.curr.children[this.similarIndex];
      callback(this.curr.itemId);
    });
  }

  setNewRoot(callback) {
    console.log('abc');
    findTopSellers(listOfCategories[this.categoryIndex].toString(),(topSellers) => {
      let arrayOfTrees = [];
      for(let i = 0; i < topSellers.length; i++) {
        let newTree = new TreeNode(this.root, topSellers[i]);
        arrayOfTrees.push(newTree);
      }
      console.log('top sellers = ', topSellers);
      this.categoryIndex += 1;
      this.root.children = arrayOfTrees;
      this.curr = this.root.children[0];
      this.curr.parent = this.root;
      callback(this.curr.itemId);
    });
  }

  addToWishlist() {
    console.log('add to wishlist');
  }

  getNextItem(selection, callback) {
    //dislike
    if(selection == 0) {
      this.numOfDislikes += 1;
      if(this.numOfDislikes == 3) {
        this.setNewRoot(callback);
      } else {
        this.selectAfterDislike(callback);
      }
    }
    //like
    if(selection == 1) {
      this.generateSubtree(callback);
      this.numOfDislikes = 0;
      this.similarIndex += 1;
      if(this.similarIndex == 10) {
        this.similarIndex = 0;
      }
    }
    //wishlist
    if(selection == 2) {
      this.addToWishlist();
      this.setNewRoot();
      this.numOfDislikes = 0;
    }
  }
}

module.exports = GetItem;
