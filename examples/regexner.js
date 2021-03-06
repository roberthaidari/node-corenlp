// NOTE: run with babel-node
import path from 'path';
import CoreNLP, { Properties, Pipeline } from '../src';

// https://stanfordnlp.github.io/CoreNLP/regexner.html

const props = new Properties();
props.setProperty('annotators', 'tokenize,ssplit,regexner');
// IMPORTANT: when using ConnectorServer, this option needs to be set
// from serverProperties or per-language properties file, because otherwise gets overriden and doesn't work
// - the `regexner.tag` file is provided along with this example
props.setProperty('regexner.mapping', path.resolve('./regexner.tag'));
props.setProperty('regexner.ignorecase', true);
const sent = new CoreNLP.simple.Sentence('Me encantan las empanadas de carne picante');
const pipeline = new Pipeline(props, 'Spanish');

pipeline.annotate(sent)
  .then(sent => {
    console.log('NER tags', sent.tokens().map(t => t.ner()));
  })
  .catch(err => {
    console.log('err', err);
  });

/*
OUTPUT:
NER tags [ undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  'INGREDIENT',
  'CONDIMENT' ]
*/
