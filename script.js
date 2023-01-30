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
    const specializationsInTeamQuantity = {};
    const specializationsSalary = {};
    const report = {};
    let sum = 0;

    const specializationsInTeam = team.map(member => member.specialization); //take list of specializations in team

    //count quantity of specializations in team
    for (let specialization in specializationsInTeam) {
        if (specializationsInTeamQuantity[specializationsInTeam[specialization]]) {
            specializationsInTeamQuantity[specializationsInTeam[specialization]]++;
        }
        else specializationsInTeamQuantity[specializationsInTeam[specialization]] = 1;
    }

    //count salaries with tax
    Object.entries(salaries).forEach(entry => {
        const salaryWithTax = Math.trunc((entry[1].salary * 100) / (100 - parseInt(entry[1].tax)));
        specializationsSalary[entry[0]] = salaryWithTax;
    });

    //create list of specializations and their total salaries
    for (let specialization in specializationsSalary) {
        report[`totalBudget${specialization}`] = specializationsSalary[specialization] * specializationsInTeamQuantity[specialization];
    }

    //add to list total salaries for team
    Object.values(report).forEach(value => {
        sum += value;
        report["totalBudgetTeam"] = sum;
    });

    return report;
}

const financeReport = calculateTeamFinanceReport(salaries, team);

console.log(JSON.stringify(financeReport));