const validateSentence = require('./challange1');

test('Sentence1 with multiple spaces testing', () => {
  expect(validateSentence("To jest moje  testowe zdanie?")).toBe(false);
});

test('Sentence2 all OK testing', () => {
    expect(validateSentence("To jest moje testowe zdanie?")).toBe(true);
});

test('Sentence3 not starting with captial letter testing', () => {
    expect(validateSentence("o jest moje testowe zdanie?")).toBe(false);
});

test('Sentence4 note ending with the termination character testing', () => {
    expect(validateSentence("o jest moje testowe zdanie")).toBe(false);
});

test('Sentence5 all OK testing', () => {
    expect(validateSentence("To jest moje testowe zdanie.")).toBe(true);
});

test('Sentence6 all OK testing', () => {
    expect(validateSentence("To jest moje testowe zdanie!")).toBe(true);
});

test('Sentence7 all OK testing', () => {
    expect(validateSentence("To jest moje testowe zdanie?!")).toBe(true);
});

test('Sentence8 with digits testing', () => {
    expect(validateSentence("To jest5 moje testowe 5zdanie?!")).toBe(false);
});

test('Sentence9 with bad characters testing', () => {
    expect(validateSentence("To jest][] moje testowe 5zdanie?!")).toBe(false);
});

test('Sentence10 not ending with termination characters testing', () => {
    expect(validateSentence("To jest moje testowe zdanie.wow")).toBe(false);
});

test('Sentence11 not ending with termination characters testing', () => {
    expect(validateSentence("To jest moje testowe zdanie. wow")).toBe(false);
});

test('Sentence12 starting with space testing', () => {
    expect(validateSentence(" To jest moje testowe zdanie.")).toBe(false);
});