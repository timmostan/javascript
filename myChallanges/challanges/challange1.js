function validateSentence(sentence) {
    //check if sentence starts with a capital letter, followed by a lowercase letter or a space.
    let regexp1 = /^[A-Z]{1}[a-z]+\s/
    let result = sentence.match(regexp1);
    //All other characters must be lowercase letters, separators (,,;,:) or terminal marks (.,?,!,?!).
    if (result && result.length == 1) {
        let temp = sentence.replace(regexp1, '');
        let regexp2 = /^([a-z.,:;!\?\s])+$/
        if (!regexp2.test(temp))
            return false;
    }
    else
        return false;
    //validate separators
    let regexp3 = /\s[.,:;!\?]\s/;
    if (regexp3.test(sentence))
            return false;
    //There must be a single space between each word.
    let regexp4 = /\s{2,}/
    if (regexp4.test(sentence))
            return false;
    //The sentence must end with a terminal mark immediately following a word
    let regexp5 = /[a-z]+(\?|\!|\.|\?\!)$/
    if (!regexp5.test(sentence))
            return false;
    return true;
}

module.exports = validateSentence;