/*
 * Copyright (c) AXA Shared Services Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const fs = require('fs');
const { NlpManager, ConversationContext } = require('node-nlp');

module.exports = async function trainnlp(manager, say) {
  if (fs.existsSync('./model.nlp')) {
    manager.load('./model.nlp');
    return;
  }
  const context = new ConversationContext();

  manager.addNamedEntityText(
    'nombre',
    ['es'],
    ['oscar', 'luis', 'alberto', 'juan', 'pedro', 'angela']
  );

  manager.addDocument(
    'es',
    'Hola, quiero hacerme una poliza de vida',
    'agent.askpolizavida'
  );
  manager.addDocument(
    'es',
    'Me gustaria una poliza de vida',
    'agent.askpolizavida'
  );
  manager.addDocument('es', 'Quiero una poliza de vida', 'agent.askpolizavida');
  manager.addDocument('es', 'Quiero un seguro de vida', 'agent.askpolizavida');

  manager.addDocument('es', 'Hola, mi nombre es %nombre%', 'agent.asknombre');
  manager.addDocument('es', 'Me llamo %nombre%', 'agent.asknombre');
  manager.addDocument('es', 'Soy %nombre%', 'agent.asknombre');

  manager.addDocument('es', 'me apellido %apellidos%', 'agent.askapellidos');
  manager.addDocument(
    'es',
    'mis apellidos son %apellidos%',
    'agent.askapellidos'
  );

  manager.addDocument('es', '%direccion%', 'agent.askdireccion');
  manager.addDocument('es', 'Vivo en %direccion%', 'agent.askdireccion');
  manager.addDocument(
    'es',
    'Mi dirección es %direccion%',
    'agent.askdireccion'
  );
  manager.addDocument('es', 'Tengo %edad% años', 'agent.askedad');
  manager.addDocument('es', 'Mi DNI es %dni%', 'agent.askdni');
  manager.addDocument(
    'es',
    'Mi numero de telefono es %telefono%',
    'agent.asktlfn'
  );
  manager.addDocument(
    'es',
    'Hay %miembros% en mi familia',
    'agent.askmiembros'
  );
  manager.addDocument(
    'es',
    'En mi familia hay %miembros% miembros',
    'agent.askmiembros'
  );
  manager.addDocument(
    'es',
    'El beneficiario es %beneficiario%',
    'agent.askbeneficiario'
  );
  manager.addDocument('es', 'Mi ficha medica es ', 'agent.askficha');
  manager.addDocument('es', 'si', 'enfermedadYES.askenfermedad');
  manager.addDocument(
    'es',
    'la enfermedad es %enfermedad%',
    'enfermedadYES.enfermedadRecibida'
  );
  manager.addDocument(
    'es',
    '¿Qué incluye la poliza?',
    'enfermedadYES.enfermedadRecibida'
  );
  manager.addDocument(
    'es',
    '¿Qué incluye el seguro?',
    'enfermedadYES.enfermedadRecibida'
  );

  manager.addDocument;

  say('Training, please wait..');
  const hrstart = process.hrtime();
  manager
    .train()
    .then(result =>
      manager.process('es', 'Hola quiero una poliza de vida', context)
    )
    .then(result => manager.process('es', 'Me llamo Oscar', context))
    .then(result => manager.process('es', 'Me apellido Muñoz', context))
    .then(result => manager.process('es', 'Vivo en madrid', context))
    .then(result => console.log(result.answer));
  const hrend = process.hrtime(hrstart);
  console.info('Trained (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
  say('Trained!');

  manager.addAnswer('es', 'agent.askpolizavida', '¡Hola! ¿Cómo te llamas?');
  manager.addAnswer(
    'es',
    'agent.asknombre',
    'Hola, {{nombre}}, Por favor dime tus apellidos'
  );
  manager.addAnswer(
    'es',
    'agent.askapellidos',
    'Genial, {{nombre}} {{apellidos}} ¿Dónde vives? Por favor se lo más completo posible'
  );
  manager.addAnswer('es', 'agent.askdireccion', '¿Cuántos años tienes?');
  manager.addAnswer('es', 'agent.askedad', 'Introduzca su DNI por favor');
  manager.addAnswer('es', 'agent.askdni', '¿Cuál es tu número de telefono?');

  manager.addAnswer(
    'es',
    'agent.asktlfn',
    '¿Cuántos miembros hay en su familia?'
  );
  manager.addAnswer(
    'es',
    'agent.askmiembros',
    '¿Quién es el beneficiario del seguro?'
  );
  manager.addAnswer(
    'es',
    'agent.askbeneficiario',
    'Por favor introduce ficha médica.'
  );
  manager.addAnswer(
    'es',
    'agent.askfichamedica',
    '¿Hay alguna enfermedad hereditaria en su familia?'
  );

  manager.addAnswer('es', 'enfermedadYES.askenfermedad', '¿Qué enfermedad?');
  manager.addAnswer(
    'es',
    'enfermedadYES.enfermedadRecibida',
    '¡Muchas gracias! trabajaré duro para hacerte tu poliza personalmente'
  );
  manager.addAnswer(
    'es',
    'enfermedadYES.incluye',
    'Esta póliza incluye: fallecimiento por cualquier cosa, incapacidad permanente y enfermedades graves.'
  );

  manager.save('./model.nlp', true);
};
