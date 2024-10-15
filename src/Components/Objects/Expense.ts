class Expense {
    payments: number[];
    description: string;

    constructor(payments: number[], description: string) {
      this.payments = payments;
      this.description = description;
    }

    public getTotal = () => {
      let total:number = 0;
      for (let payment of this.payments) {
        total = total + payment;
      }

      return total;
    }

    public getFairShare = () => {
      const total = this.getTotal();
      const n = this.payments.length;

      return total/n;
    }

    public getOwed = () => {
      const owed: number[] = [];
      const fairShare: number = this.getFairShare();

      for (let i = 0; i < this.payments.length; i++) {
        const delta = fairShare - this.payments[i];
        owed.push(delta);
      }

      return owed;
    }
}

export default Expense;