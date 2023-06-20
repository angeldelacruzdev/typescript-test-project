interface AmortizationRow {
  fechaPago: string;
  cuota: number;
  intereses: number;
  capital: number;
  saldoPendiente: number;
}

function calcularAmortizacion(
  montoPrestamo: number,
  tasaInteresAnual: number,
  plazoMeses: number,
  fechaInicio: Date
): AmortizationRow[] {
  const tasaInteresMensual = tasaInteresAnual / 12 / 100;
  const cuotaMensual =
    (montoPrestamo * tasaInteresMensual) /
    (1 - Math.pow(1 + tasaInteresMensual, -plazoMeses));

  const tablaAmortizacion: AmortizationRow[] = [];
  let montoPendiente = montoPrestamo;
  let fechaPago = new Date(fechaInicio);

  // Avanzar la fecha de pago al segundo mes
  fechaPago.setMonth(fechaPago.getMonth() + 1);

  for (let i = 1; i < plazoMeses; i++) {
    const intereses = montoPendiente * tasaInteresMensual;
    const capital = cuotaMensual - intereses;
    montoPendiente -= capital;

    const filaAmortizacion: AmortizationRow = {
      fechaPago: fechaPago.toLocaleDateString('es-ES'),
      cuota: cuotaMensual,
      intereses,
      capital,
      saldoPendiente: montoPendiente,
    };

    tablaAmortizacion.push(filaAmortizacion);

    // Actualización de la fecha de pago para el siguiente mes
    fechaPago.setMonth(fechaPago.getMonth() + 1);
  }

  return tablaAmortizacion;
}

// Ejemplo de uso
const monto = 100000; // Monto del préstamo
const tasaAnual = 10; // Tasa de interés anual
const plazo = 24; // Plazo en meses
const fechaInicio = new Date('2023-06-13'); // Fecha de inicio del préstamo (ejemplo: 13 de junio de 2023)

const amortizacion = calcularAmortizacion(monto, tasaAnual, plazo, fechaInicio);

// Impresión de la tabla de amortización
console.log('Tabla de Amortización:');
console.log(
  'Fecha de Pago   Cuota       Intereses   Capital     Saldo Pendiente'
);

for (const fila of amortizacion) {
  console.log(
    `${fila.fechaPago}   ${fila.cuota.toFixed(2)}   ${fila.intereses.toFixed(
      2
    )}   ${fila.capital.toFixed(2)}   ${fila.saldoPendiente.toFixed(2)}`
  );
}
