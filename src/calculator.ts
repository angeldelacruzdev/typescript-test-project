class LoanCalculator {
    private static mes: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    private static nommes: string[] = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];
    private static amortizacion: any[] = [];
  
    private static cuota: number = 0;
  
    private static pagos(p: number, i: number, n: number): string {
      i = i / 12 / 100;
      if (p != 0 && i != 0 && n != 0) {
        return ((p * i) / (1 - Math.pow(1 + i, -n))).toFixed(2);
      } else {
        return "0";
      }
    }
  
    private static lineaCredito(m: number, i: number): string {
      i = i / 12 / 100;
  
      return (m * i).toFixed(2);
    }
  
    private static controlInteres(m: number, i: number): string {
      i = i / 12 / 100;
      return (m * i).toFixed(2);
    }
  
    private static fecha(dias: number): string {
      let segundos = dias * 86400;
      let fecha = new Date();
      fecha.setSeconds(segundos);
      let fec =
        (fecha.getUTCDate() <= 9 ? "0" : "") +
        fecha.getUTCDate() +
        "-" +
        LoanCalculator.nommes[fecha.getMonth()] +
        "-" +
        fecha.getFullYear();
      return fec;
    }
  
    private static interes(m: number, i: number): string {
      i = i / 12 / 100;
      return (m * i).toFixed(2);
    }
  
    private static obtenerMes(dias: number): number {
      let d = new Date();
      let segundos = dias * 86400;
      d.setSeconds(segundos);
      return d.getMonth();
    }
  
    public static montoSolicitadoCambio(
      monto: number,
      tasa: number,
      plazos: number,
      tipo: string
    ): string {
      if (tipo === "Amortizacion" || tipo === "Especial") {
        LoanCalculator.cuota = parseFloat(
          LoanCalculator.pagos(monto, tasa, plazos)
        );
      } else {
        LoanCalculator.cuota = parseFloat(
          LoanCalculator.lineaCredito(monto, tasa)
        );
      }
      return LoanCalculator.cuota.toFixed(2);
    }
  
    public static calcularCuotas(
      cuota: number,
      plazo: number,
      montosolicitado: number,
      tasa: number,
      tipo: string
    ): any[] {
      let cuo = cuota;
      let p = plazo;
      let mt = montosolicitado;
  
      let dias = 0;
      let me = LoanCalculator.obtenerMes(0);
      let balance = mt;
      let linea = 0;
  
      if (tipo === "Amortizacion") {
        for (let pe = 1; pe <= p; pe++) {
          if (pe === 1 && me <= 11) {
            dias += LoanCalculator.mes[me];
          } else if (pe > 1 && me < 11) {
            dias += LoanCalculator.mes[++me];
          } else {
            me = 0;
            dias += LoanCalculator.mes[me];
          }
          let inte = parseFloat(LoanCalculator.interes(balance, tasa));
          let capital = cuo - inte;
          balance -= capital;
          linea++;
          if (pe === p && balance !== 0) {
            balance = 0;
          }
          LoanCalculator.amortizacion.push({
            linea: linea,
            plazo: pe,
            fecha: LoanCalculator.fecha(dias),
            cuota: cuo,
            capital: capital.toFixed(2),
            interes: inte,
            balance: balance.toFixed(2),
          });
        }
      } else {
        for (let pe = 1; pe <= p; pe++) {
          if (pe === 1 && me <= 11) {
            dias += LoanCalculator.mes[me];
          } else if (pe > 1 && me < 11) {
            dias += LoanCalculator.mes[++me];
          } else {
            me = 0;
            dias += LoanCalculator.mes[me];
          }
          let inte = parseFloat(LoanCalculator.interes(balance, tasa));
          let capital = 0.0;
          linea++;
          if (pe === p) {
            capital = balance;
          }
  
          LoanCalculator.amortizacion.push({
            linea: linea,
            plazo: pe,
            fecha: LoanCalculator.fecha(dias),
            cuota: cuo,
            capital: capital,
            interes: inte,
            balance: balance,
          });
        }
      }
  
      return LoanCalculator.amortizacion;
    }
  }
  
   
    // LoanCalculator.calcularCuotas(2500, 25, 50000, 14, "Especial")
   
  
  export default LoanCalculator;
  