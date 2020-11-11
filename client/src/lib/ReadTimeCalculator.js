//! A function that returns the time it will take for an average person to read the content
//? For non-technical material, the average reading time (in words per minute) is 200 to 250.
const ReadTimeCalculator = (string) => {
    //? first we split the string on spaces, new line characters, tabs, periods, and commas
    //? Then we filter out the empty quotes.
    const words = string.split(/[ \n\t.,]/g).filter(word => word !== "").length;
    const divideToString = (words/225).toString().split('.');
    console.log(divideToString);
    console.log(("0." + divideToString[1]) * 60)
    const [min, seconds] = [parseInt(divideToString[0], 10), Math.ceil(("0." + divideToString[1]) * 60)];
    
    if (min > 1){
        if (seconds > 1){
            return `${min} minutes and ${seconds} seconds`
        }else {
            return `${min} minutes and ${seconds} second`
        }
    }else{
        if(seconds > 1){
            return `${min} minute and ${seconds} seconds`
        }else {
            return `${min} minute and ${seconds} second`
        }
    }
}

export default ReadTimeCalculator;