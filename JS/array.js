	function sortArray(arr1, arr2) {
	let len1 = arr1.length,
	    len2 = arr2.length,
	    i=0, j=0,
	    arrResult = [];
	while (true) {
		if (i >= len1 && j < len2) {
			arrResult = arrResult.concat(arr2.slice(j));
			break;
		} else if (i < len1 && j >= len2) {
			arrResult = arrResult.concat(arr1.slice(i));
			break;
		} else if (i >= len1 && j >= len2) {
			break;
		}
		if (arr1[i] < arr2[j]) {
			arrResult.push(arr1[i++]);
		} else if (arr1[i] === arr2[j]) {
			arrResult.push(arr1[i++]);
			arrResult.push(arr2[j++]);
		} else {
			arrResult.push(arr2[j++]);
		} 
	}
	return arrResult;
}
console.log(sortArray([1,3,5,9], [2,6,11,22,33,44]));
//[1, 2, 3, 5, 6, 9, 11, 22, 33, 44]