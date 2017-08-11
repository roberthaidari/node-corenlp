import Annotable from './annotable';
import Token from './token';
import _ from 'lodash';

export default class Sentence extends Annotable {
  constructor(text) {
    super(text);
    this._tokens = [];
    this._features = [];
  }

  parse() {
  }

  toString() {
    return this._text || this._tokens.map(token => token.toString()).join(' ');
  }

  words() {
    return this._tokens.map(token => token.word());
  }

  word(index) {
    return this._tokens[index].word();
  }

  [Symbol.iterator]() {
    return this._tokens.values();
  }

  posTags() {
  }

  posTag(index) {
  }

  lemmas() {
    return this._tokens.map(token => token.lemma());
  }

  async lemma(index) {
    return this._tokens[index].lemma();
  }

  nerTags() {
  }

  nerTag(index) {
  }

  governor() {
  }

  incommingDependencyLabel(index) {
  }

  natlogPolarities() {
  }

  natlogPolarity(index) {
  }

  openie() {
  }

  openieTriples(index) {
  }

  /**
   *
   * @returns {SentenceAlgorithms}
   */
  algorithms() {
  }

  fromJson(data, isSentence = false) {
    const sentence = isSentence ? data : _.head(data.sentences);
    this._tokens = sentence.tokens.map(tok => Token.fromJson(tok));
    // from: relation annotator: basicDependencies, enhancedDependencies, enhancedPlusPlusDependencies
    this._basicDependencies = sentence.basicDependencies;
    this._enhancedDependencies = sentence.enhancedDependencies;
    this._enhancedPlusPlusDependencies = sentence.enhancedPlusPlusDependencies;
    return this;
  }
}

/**
 * @typedef Sentence
 * @property {number} index
 * @property {Array.<Token>} tokens
 */
Sentence.fromJson = function (data, isSentence = false) {
  const instance = new this();
  return instance.fromJson(data, isSentence);
};
