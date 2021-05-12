const A = [1,2,3,3,2,3,1,4,4,4,5,7,9,9,8,7];
const B = [];

for( let i=0; i< A.length; i ++ ){
    // console.log(A[i]);
    if(!B.includes(A[i])){
        B.push(A[i])
    }   
}
console.log("The number of distict values is " + B.length + " and the distict values are " + B);
console.log(B.length);
console.log(B);



