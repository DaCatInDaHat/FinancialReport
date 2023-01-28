const salaries = {
    Manager: { salary: 1000, tax: "10%" },
    Designer: { salary: 600, tax: "30%" },
    Artist: { salary: 1500, tax: "15%" }
}

const team = [
    { name: "Misha", specialization: "Manager" },
    { name: "Max", specialization: "Designer" },
    { name: "Vova", specialization: "Designer" },
    { name: "Leo", specialization: "Artist" }]

function calculateTeamFinanceReport(salaries, team) {
    const specializations = team.map(elem => elem.specialization);
    const specializationsAndSalariesWithTax = {};
    const report = {};
    let sum = 0;

    let specializationsQuantity = specializations.reduce((prev, cur) => {
        prev[cur] = (prev[cur] || 0) + 1;
        return prev;
    }, {});

    Object.entries(salaries).map(item => {
        const salaryWithTax = Math.trunc((item[1].salary * 100) / (100 - parseInt(item[1].tax)));
        Object.assign(specializationsAndSalariesWithTax, { [item[0]]: salaryWithTax });
    });

    Object.entries(specializationsAndSalariesWithTax).map(item => {
        Object.entries(specializationsQuantity).map(element => {
            if (item[0] === element[0]) {
                let result = item[1] * element[1];
                let keyName = `totalBudget${item[0]}`;
                Object.assign(report, { [keyName]: result });
            }
        })
    });

    Object.values(report).map(item => {
        sum += item;
        Object.assign(report, { totalBudgetTeam: sum });
    });

    return report;
}

const financeReport = calculateTeamFinanceReport(salaries, team);

console.log(JSON.stringify(financeReport));