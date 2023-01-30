const salaries = {
    Manager: { salary: 1000, tax: "10%" },
    Designer: { salary: 600, tax: "30%" },
    Artist: { salary: 1500, tax: "15%" },
    TeamLead: { salary: 1000, tax: "99%" },
    Architect: { salary: 9000, tax: "34%" }
}

const team = [
    { name: "Misha", specialization: "Manager" },
    { name: "Max", specialization: "Designer" },
    { name: "Vova", specialization: "Designer" },
    { name: "Leo", specialization: "Artist" },
    { name: "Alexander", specialization: "TeamLead" },
    { name: "Gaudi", specialization: "Architect" },
    { name: "Koolhas", specialization: "Architect" },
    { name: "Foster", specialization: "Architect" },
    { name: "Napoleon", specialization: "General" }]

function calculateTeamFinanceReport(salaries, team) {
    const specsQuantity = {};
    const specsSalary = {};
    const report = {};
    let sum = 0;

    const specsInTeam = team.map(elem => elem.specialization); //take list of specializations in team

    //count quantity of specializations in team
    for (let spec in specsInTeam) {
        if (specsQuantity[specsInTeam[spec]]) {
            specsQuantity[specsInTeam[spec]]++;
        }
        else specsQuantity[specsInTeam[spec]] = 1;
    }

    //count salaries with tax
    Object.entries(salaries).forEach(salary => {
        const salaryWithTax = Math.trunc((salary[1].salary * 100) / (100 - parseInt(salary[1].tax)));
        specsSalary[salary[0]] = salaryWithTax;
    });

    //create list of specializations and their total salaries
    for (let item in specsSalary) {
        report[`totalBudget${item}`] = specsSalary[item] * specsQuantity[item];
    }

    //add to list total salaries for team
    Object.values(report).forEach(item => {
        sum += item;
        report["totalBudgetTeam"] = sum;
    });

    return report;
}

const financeReport = calculateTeamFinanceReport(salaries, team);

console.log(JSON.stringify(financeReport));