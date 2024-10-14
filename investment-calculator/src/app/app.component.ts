import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormComponent } from './form/form.component';
import { Parameters } from './models/app.parameters';
import { TableComponent } from './table/table.component';
import { Result } from './models/app.result';
import { HeaderComponent } from './header/header.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormComponent, TableComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'investment-calculator';

  isInitial = true;

  data!: Result[];

  calculate(params: Parameters) {
    this.isInitial = false;
    console.log(params);
    const annualData = [];
    let investmentValue = params.initialInvestment;

    for (let i = 0; i < params.duration; i++) {
      const year = i + 1;

      const interestEarnedInYear =
        investmentValue * (params.expectedReturn / 100);
      investmentValue += interestEarnedInYear + params.annualInvestment;
      const totalInterest =
        investmentValue -
        params.annualInvestment * year -
        params.initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        investmentValue: investmentValue,
        annualInvestment: params.annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested:
          params.initialInvestment + params.annualInvestment * year,
      });
    }
    console.log(annualData);
    this.data = annualData;
  }
}
