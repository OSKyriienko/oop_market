
class Market {
	constructor(...products) {
		this.arr = [];
		for (let i=0;i<products.length;i++) {
			this.arr[i] = products[i];
		}		
	}

	find(item) {
		for (let i=0;i<this.arr.length;i++) {
			for (let key in this.arr[i]) {
				if (this.arr[i].item == item) {
					return this.arr[i];
				}
			}
		}	
		//sconsole.log(`No ${item} in the market`);
		return false;
	}
}

class ProductItem{
	constructor(item,place, price, weight) {
		this.item = item;
		this.place = place;
		this.price = price;
		this.weight = weight;
	}

	getPlace() {
		return this.place;
	}

	getPrice() {
		return this.price;
	}

	getBill() {
		return this.price*this.weight;
	}

	getWeight() {
		return this.weight;
	}
}  

class Person {
	constructor() {
		this.items=[];	
	}

	buy(shop,item) {
		if (this.items.length < 15) {
			this.items.push(item);
		}	
		else {
			alert('You can\'t buy anymore');
		}	
}
	shoppingList() {
		let list = {};
		for (let i=0; i<this.items.length; i++) {
			if (list[this.items[i]]) {
				list[this.items[i]] += 1;
			}
			else {
				list[this.items[i]] = 1;
			}
		}
	return list;
	}
}

const bread = new ProductItem('bread','shelf',12,1);
const bun = new ProductItem('bun','shelf',10,0.2);
const donut = new ProductItem('donut','shelf',20,0.25);
const apple = new ProductItem('apple','box',20,1.5);
const orange = new ProductItem('orange','box',30,1);
const banana = new ProductItem('banana','box',35,1);
const cola = new ProductItem('cola','shelf',20,1.5);
const pepsi = new ProductItem('pepsi','shelf',22,1.5);
const chicken = new ProductItem('chicken','fridge',75,1);
const beaf = new ProductItem('beaf','fridge',90,1);

const market = new Market(bread,bun,donut,apple,orange,banana,cola,pepsi,chicken,beaf);
const prsn = new Person();

function renderItem(item,i) {  //put element's value in HTML-page
	item.children[1].textContent = `${market.arr[i].price}  UAH`;
	if (market.arr[i].item != 'cola' && market.arr[i].item != 'pepsi') {
	  item.children[2].textContent = `Weight: ${market.arr[i].weight} kg`;
	}
	else {
		item.children[2].textContent = `Volume: ${market.arr[i].weight} L`;
	}
}

const renderMarket = function(market) {  //redner values of all elements
	let $list = document.querySelectorAll('.block');
	for (let i = 0; i < $list.length; i++) {
		renderItem($list[i],i);
	}
}

let $btnToCart = document.querySelectorAll('.btnCart');
for (var i = 0; i < $btnToCart.length; i++ ) {
	$btnToCart[i].addEventListener('click', function() {
		prsn.buy(market,this.parentElement.firstElementChild.id); //bying items in the market;
		//console.log(prsn);
		let totalProductAmount = 0;
		let totalProductSum = 0;
	    let listShop = prsn.shoppingList(); // list of purchases
	    let $table = document.getElementById('cart');
	    let products = document.querySelectorAll('tr');
	    for (let i=1;i<products.length;i++) {    //After each adding new product clear all info (td) and then redraw info in the TABLE
	    	products[i].parentElement.removeChild(products[i]);
	    }
	    for (let key in listShop) {
	      let $tr = document.createElement('tr');		
	      $table.appendChild($tr);
	      let $name = document.createElement('td');
	      $name.textContent = key;
	      $tr.appendChild($name);
	      let $amount = document.createElement('td');
	      $amount.textContent = listShop[key];
	      $tr.appendChild($amount);
	      let $weight = document.createElement('td');
	      $weight.textContent = market.find(key).getWeight()*listShop[key];
	      $tr.appendChild($weight);
	      let $price = document.createElement('td');
	      $price.textContent = market.find(key).getPrice()*listShop[key];
	      $tr.appendChild($price);
	      let $del = document.createElement('td');
	      let $delBtn = document.createElement('button');
	      $delBtn.textContent = '-';
	      $delBtn.onclick = function(e,listShop) {	      
	      	let prod = e.target.parentElement.parentElement.children[0].textContent;
	    	for (let i = 0; i<prsn.items.length; i++) {
	    	  if (prsn.items[i] === prod) {
	    	  	prsn.items.splice(prsn.items.indexOf(prod), 1);
	    	  	console.log(prsn.items);	    	  	
	    	  	break;
	    	  }
	    	}
	    	listShop = prsn.shoppingList();
	    	$amount.textContent = listShop[key];
	    	$weight.textContent = market.find(key).getWeight()*listShop[key];
	    	$price.textContent = market.find(key).getPrice()*listShop[key];
	    	totalProductAmount--;
	    	$totalAmount.textContent = totalProductAmount;
	    	totalProductSum = totalProductSum - market.find(key).getPrice();
	        $totalSum.textContent = totalProductSum;
	        if (!$amount.textContent) {
	        	e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
	        }
	      }	   
	      $del.appendChild($delBtn);
	      $tr.appendChild($del);
	      totalProductAmount += listShop[key];
	      totalProductSum += market.find(key).getPrice()*listShop[key];	      
	    }
	    
	    let $totalAmount = document.getElementById('totalAmount');
	    let $totalSum = document.getElementById('totalSum');
	    $totalAmount.textContent = totalProductAmount;
	    $totalSum.textContent = totalProductSum;
	});
}

renderMarket(market);


