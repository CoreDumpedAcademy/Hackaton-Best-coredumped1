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

module.exports = async function trainnlp(manager, say) {
  if (fs.existsSync('./model.nlp')) {
    manager.load('./model.nlp');
    return;
  }

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
  manager.addDocument('es', '%nombre%', 'agent.asknombre');

  manager.addDocument('es', '%apellidos%', 'agent.askapellidos');
  manager.addDocument('es', 'me apellido %apellidos%', 'agent.askapellidos');
  manager.addDocument(
    'es',
    'mis apellidos son %apellidos%',
    'agent.askapellidos'
  );

  manager.addDocument('es', '%dirección%', 'agent.askdireccion');
  manager.addDocument('es', 'Vivo en %direccion%', 'agent.askdireccion');
  manager.addDocument('es', 'Mi dirección', 'agent.askdireccion');

  say('Training, please wait..');
  const hrstart = process.hrtime();
  await manager.train();
  const hrend = process.hrtime(hrstart);
  console.info('Trained (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
  say('Trained!');

  manager.addAnswer('es', 'agent.askpolizavida', '¡Hola! ¿Cómo te llamas?');
  manager.addAnswer(
    'es',
    'agent.asknombre',
    'Hola {{nombre}} Por favor dime tus apellidos'
  );
  manager.addAnswer(
    'es',
    'agent.askapellidos',
    '¿Dónde vives? Por favor se lo más completo posible'
  );
  manager.addAnswer('es', 'agent.askdireccion', '¿Cuántos años tienes?');
  manager.addAnswer('es', 'agent.askedad', 'Introduzca su DNI por favor');
  manager.addAnswer(
    'es',
    'agent.askdni',
    '¿Cuántos miembros hay en su familia'
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
    '¿Hay alguna enfermedad hereditaria'
  );

  manager.save('./model.nlp', true);
};
