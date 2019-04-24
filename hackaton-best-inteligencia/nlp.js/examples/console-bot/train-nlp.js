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
const {
  NlpManager,
  ConversationContext
} = require('node-nlp');

module.exports = async function trainnlp(manager, say) {
  if (fs.existsSync('./model.nlp')) {
    manager.load('./model.nlp');
    return;
  }
  const context = new ConversationContext();

  manager.addDocument('es','Hola','agent.hola')

  manager.addDocument('es','Hola, quiero hacerme una poliza de vida','agent.askpolizavida');
  manager.addDocument('es', 'Me gustaria una poliza de vida', 'agent.askpolizavida');
  manager.addDocument('es', 'Quiero una poliza de vida', 'agent.askpolizavida');
  manager.addDocument('es', 'Quiero un seguro de vida', 'agent.askpolizavida');

  manager.addDocument('es','quiero hacerme una poliza de decesos','agent.askpolizadecesos')
  manager.addDocument('es','quiero hacerme un seguro de decesos','agent.askpolizadecesos')

  manager.addDocument('es', 'Hola, mi nombre es %nombre%', 'agent.asknombre');
  manager.addDocument('es', 'Me llamo %nombre%', 'agent.asknombre');
  manager.addDocument('es', 'Soy %nombre%', 'agent.asknombre');

  manager.addDocument('es', 'me apellido %apellidos%', 'agent.askapellidos');
  manager.addDocument(
    'es',
    'mis apellidos son %apellidos%',
    'agent.askapellidos'
  );

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
  manager.addDocument('es', 'Mi ficha medica es %ficha%', 'agent.askficha');
  manager.addDocument('es', 'si', 'enfermedadYES.askenfermedad');
  manager.addDocument(
    'es',
    'la enfermedad es %enfermedad%',
    'enfermedadYES.enfermedadRecibida'
  );
  manager.addDocument(
    'es',
    '¿Qué incluye la poliza?',
    'enfermedadYES.enfermedadIncluye'
  );
  manager.addDocument(
    'es',
    '¿Qué incluye el seguro?',
    'enfermedadYES.enfermedadIncluye'
  );

  manager.addDocument(
    'es',
    'Quiero eliminar un seguro',
    'agent.eliminarSeguro'
  );
  manager.addDocument(
    'es',
    'Quiero eliminar una poliza',
    'agent.eliminarSeguro'
  );
  manager.addDocument(
    'es',
    'Quiero darme de baja en un seguro',
    'agent.eliminarSeguro'
  );
  manager.addDocument(
    'es',
    'Me gustaria darme de baja de una poliza',
    'agent.eliminarSeguro'
  );
  manager.addDocument(
    'es',
    'Desearia darme de baja de el seguro contratado',
    'agent.eliminarSeguro'
  );

  manager.addDocument('es', 'He tenido un accidente', 'agent.acidente');
  manager.addDocument('es', 'He sufrido un accidente', 'agent.acidente');
  manager.addDocument('es', 'He provocado un accidente', 'agent.acidente');
  manager.addDocument('es', 'He tenido un siniestro', 'agent.acidente');

  manager.addDocument('es', 'Estoy en %localizacion%', 'agent.asklocalizacion');
  manager.addDocument('es', 'No se donde estoy', 'agent.asklocalizacionNo');
  manager.addDocument('es', 'no necesito nada', 'agent.necesidadNO');
  manager.addAnswer('es', 'Sí %necesito%', 'agent.necesidadSI');

  manager.addDocument;

  say('Training, please wait..');
  const hrstart = process.hrtime();

  (async () => {
    await manager
      .train()
      .then(result =>
        manager.process('es', 'Hola quiero una poliza de vida', context)
      )
      .then(result => manager.process('es', 'Me llamo Oscar', context))
      .then(result => manager.process('es', 'Me apellido Muñoz', context))
      .then(result => manager.process('es', 'Vivo en madrid', context));
    // .then(result => console.log(result.answer));

    manager.save();
    const response = await manager.process('es', 'Me llamo oscar');
    // console.log(response);
  })();
  const hrend = process.hrtime(hrstart);
  console.info('Trained (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
  say('Trained!');
  
  manager.addAnswer('es','agent.hola','¡Hola!')
  manager.addAnswer('es','agent.hola','¡Hola! Bienvenido')
  manager.addAnswer('es','agent.hola','¡Hola! Sera un placer atenderte')

  manager.addAnswer('es', 'agent.askpolizavida', '¡Hola! ¿Cómo te llamas?');
  manager.addAnswer(
    'es',
    'agent.asknombre',
    'Gracias! Por favor dime tus apellidos'
  );
  manager.addAnswer(
    'es',
    'agent.askapellidos',
    'Genial, ¿Dónde vives? Por favor se lo más completo posible'
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
    'agent.askficha',
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

  manager.addAnswer(
    'es',
    'agent.eliminarSeguro',
    '¿Estás seguro? Es una lastima que te vayas'
  );

  manager.addAnswer(
    'es',
    'agent.acidente',
    '¿Sabes donde estás? Por favor indicamelo'
  );

  manager.addAnswer('es', 'agent.asklocalizacion', '¿Necesitas algo más?');

  manager.addAnswer(
    'es',
    'agent.necesidadNO',
    '¡Vale! Si necesitas algo dimelo'
  );
  manager.addAnswer('es', 'agent.necesidadSI', '¡Genial! ¿Qué deseas?');

  manager.addAnswer(
    'es',
    'agent.buscarpoliza',
    'Perfecto, voy a buscar tu número de poliza'
  );

  manager.addAnswer(
    'es',
    'agent.enviargrua',
    'Ya te he encontrado la poliza, enviaré una grúa y un mecanico a ayudarte'
  );

  manager.addAnswer(
    'es',
    'agent.asklocalizacionNo',
    'Tranquilo, te encontraremos'
  );

  manager.save('./model.nlp', true);
};
