

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}



/**
 * Given an array of integer wallet balances, this function returns an array of transactions that can be used
 * to create a new array of shuffled wallets (i.e. the new balances will be from a variety of different wallets)
 */
function shuffleWallets(array) {

	// Deep copy the array
	let originalArray = JSON.parse(JSON.stringify(array));
	let shuffledArray = JSON.parse(JSON.stringify(array));
	
	// Shuffle the array in place
	shuffle(shuffledArray);


	console.log("Original Array: ", originalArray);
	console.log("Shuffled Array: ", shuffledArray);

	let links = [];

	// Loop through each new wallet and add money to it from the old wallets
	for (var i = 0; i < array.length; i++) {

		// Total in the current i-th wallet
		let currentTotal = 0;

		// How much the i-th wallet should have at the end
		let targetTotal = shuffledArray[i];

		// Loop through the original array and add those values to the link list
		for (var j = 0; j < array.length; j++) {

			// Check that the current wallet being transferred out of isn't empty
			if (originalArray[j] <= 0) { continue; }

			// We've transferred enough money, break.
			if (currentTotal >= targetTotal) { break; }

			// The amount to try to transfer out of the original wallet into the shuffled wallet
			var transferAmount = targetTotal - currentTotal;

			// Make sure we don't try to transfer more money out than exists
			if (transferAmount > originalArray[j]) {
				transferAmount = originalArray[j]; 
			}

			// Transfer the money out
			originalArray[j] = originalArray[j] - transferAmount;

			currentTotal = currentTotal + transferAmount;

			let link = {
				from: j,
				to: i,
				value: transferAmount
			}
			
			links.push(link);
		}
	}
	
	
	console.log("Links: ", links);
	return links;
}
foo([1,2,3,4,5,6]);
