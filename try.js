function printValue (value){
    console.log(value);
}

const myPromise = new Promise(function(myResolve, myReject){
    let x = 1;
    if( x === 0){
        myResolve('OK');
    }else {
        myReject('error')
    }
});

myPromise.then(
    function(value){printValue(value)},
    function(error){printValue(value)}
)