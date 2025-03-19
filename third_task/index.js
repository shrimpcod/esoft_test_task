function parenthesisMatching(str){
    const matchingStr = new Map([['(', ')'], ['{', '}'], ['[', ']']]);
    const stack = [];

    for (let char of str) {
        if (matchingStr.has(char)) {
            stack.push(char);
        } else {
            if (stack.length === 0) return false;
            const last = stack.pop();
            if (matchingStr.get(last) !== char){
                return false;
            }
        }
    }
    return stack.length === 0;
}

console.log(parenthesisMatching("()"));
console.log(parenthesisMatching("()[]{}"));
console.log(parenthesisMatching("(]"));
console.log(parenthesisMatching("([)]"));
console.log(parenthesisMatching("{[]}]"));
console.log(parenthesisMatching("()()"));
console.log(parenthesisMatching("((()))"));
console.log(parenthesisMatching("(()"));
