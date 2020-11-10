const ReadTimeCalculator = (string) => {
    const time = (string.split('').length / 200).toString();
    console.log(time)
}

export default ReadTimeCalculator;