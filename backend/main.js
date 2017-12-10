axios = require('axios');

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

class GetItem {
  constructor(lastCategoryIndex){
    this.root = new TreeNode(null, '');
    this.curr = new TreeNode(null, '');
    this.numOfDislikes = 0;
    this.categoryIndex = lastCategoryIndex;
    this.similarIndex = 0;
  }

  getFirstItem(callback) {
    this.setNewRoot(callback);
  }

  selectAfterDislike(callback) {
    //get parent's next child.
    if(this.curr.parent !== null) {
      let parent = this.curr.parent;
      this.curr = parent.children[this.numOfDislikes];
      callback(this.curr.itemId);
    }
  }

  generateSubtree(callback) {
    axios.get('/findSimilarItems/'+this.curr.itemId).then((response) => {
      const similarItems = response.data;
      let arrayOfTrees = [];
      for(let i = 0; i < similarItems.length; i++) {
        let newTree = new TreeNode(this.root, similarItems[i]);
        arrayOfTrees.push(newTree);
      }
      this.curr.children = arrayOfTrees;
      this.curr.parent = this.curr;
      this.curr = this.curr.children[this.similarIndex];
      callback(this.curr.itemId);
    }).catch((error) => {
      console.log(error);
    });
  }

  setNewRoot(callback) {
    axios.get('/findTopSellers/'+listOfCategories[this.categoryIndex].toString()).then((response) => {
      const topSellers = response.data;
      let arrayOfTrees = [];
      for(let i = 0; i < topSellers.length; i++) {
        let newTree = new TreeNode(this.root, topSellers[i]);
        arrayOfTrees.push(newTree);
      }
      this.categoryIndex += 1;
      this.root.children = arrayOfTrees;
      this.curr = this.root.children[0];
      this.curr.parent = this.root;
      callback(this.curr.itemId);
    })
  }

  getNextItem(selection, callback) {
    //dislike
    if(selection == 0) {
      this.numOfDislikes += 1;
      if(this.numOfDislikes == 4) {
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
      this.setNewRoot(callback);
      this.numOfDislikes = 0;
    }
    //not on aws api
    if(selection == 3) {
      this.generateSubtree(callback);
      this.similarIndex += 1;
      if(this.similarIndex == 10) {
        this.similarIndex = 0;
      }
    }

  }
}

const firstItem = (itemGetter, callback) => {
  itemGetter.getFirstItem((result) => {
    axios.get('/itemLookup/'+result).then((lookupResult) => {
      callback(lookupResult.data);
    });
  });
}

const dislikeItem = (itemGetter, callback) => {
  itemGetter.getNextItem(0, (result)=> {
    axios.get('/itemLookup/'+result).then((lookupResult) => {
      callback(lookupResult.data);
    });
  });
}

const likeItem = (itemGetter, callback) => {
  itemGetter.getNextItem(1, (result)=> {
    axios.get('/itemLookup/'+result).then((lookupResult) => {
      callback(lookupResult.data);
    });
  });
}

const wishListItem = (itemGetter, callback) => {
  itemGetter.getNextItem(2, (result)=> {
    axios.get('/itemLookup/'+result).then((lookupResult) => {
      callback(lookupResult.data);
    });
  });
}

const errorItem = (itemGetter, callback) => {
  itemGetter.getNextItem(3, (result)=> {
    axios.get('/itemLookup/'+result).then((lookupResult) => {
      callback(lookupResult.data);
    });
  });
}

const storeLastCategoryIndex = (email, categoryIndex) => {
  let url = 'http://localhost:3000/api/DB/' + String(email) + '/' + String(categoryIndex);
  axios.put(url).then(response => {
    console.log(response);
  });
  console.log('store category index');
}

module.exports = {
  GetItem,
  firstItem,
  likeItem,
  dislikeItem,
  wishListItem,
  storeLastCategoryIndex,
}

/**
  example:
  itemGetter = new GetItem(0);
  firstItem(itemGetter, (result) => {
    console.log('first = ',result);
  });

  setTimeout(() => {
    likeItem(itemGetter, (result) => {
      console.log('like = ', result);
    })
  } , 1000);
**/
