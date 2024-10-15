class Account {
    name: string;
    owedAmount: number[];

    constructor(name: string, owedAmount: number[]) {
      this.name = name;
      this.owedAmount = owedAmount;
    }
}

export default Account;