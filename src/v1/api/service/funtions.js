function sort(bookedSlot,servingSlot) {
    let ans = []
    servingSlot.forEach(element => {
        if (!bookedSlot.includes(element)) {
            ans.push(element);
        }
    });
    return ans
}
module.exports={sort}

