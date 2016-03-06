var myModuleToExport = module.exports = {};

myModuleToExport.retirementAmountIfSavingPerMonth = function (yearsUntilRetirement,
    amountSavingPerMonth, yearlyInterestRateOfInvestment) {

    var monthsUntilRetirement = yearsUntilRetirement * 12;
    var i = 1;
    var RunningTotal = amountSavingPerMonth;
    while (i < monthsUntilRetirement) {
        RunningTotal = (RunningTotal + amountSavingPerMonth) * (1 + yearlyInterestRateOfInvestment / 12);
        i++;
    }
    return RunningTotal;
}

// console.log("How much retirement fund will you have, if saving 200 dollars per month for 30 years? (Interest: 3%)");
// console.log(myModuleToExport.retirementAmountIfSavingPerMonth(30,200,0.03));

myModuleToExport.investesAmountAfterSomeYears = function (yearsInvesting, initialAmount, yearlyInterestRateofInveatment) {

    var k = 0;
    var runningTotal = initialAmount;
    while (k < yearsInvesting) {
        runningTotal = runningTotal * (1 + yearlyInterestRateofInveatment);
        k++;
    }

    return runningTotal;
}

// console.log("How much will you get from 1,000 dollars after 30 Years? (Interest: 3%)");
// console.log(myModuleToExport.investesAmountAfterSomeYears(30,1000,0.03));

myModuleToExport.monthsToPayOffLoan = function (monthlyPaymentAmount,
    initialLoanAmount, yearlyInterestRateOfLoan) {
    //console.log(monthlyPaymentAmount, initialLoanAmount, yearlyInterestRateOfLoan);
    var leftToPay = initialLoanAmount;
    var totalMonth = 0;
    while (leftToPay > 0) {
        leftToPay = (leftToPay * (1 + yearlyInterestRateOfLoan)) - monthlyPaymentAmount;
        totalMonth++;
    }

    return totalMonth;
}
 
// console.log("How many months will it take to pay off 1500 dollars? (Interest: 8%)");
//console.log(myModuleToExport.monthsToPayOffLoan(300, 1500, 0.08));