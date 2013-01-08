import csv

indicators = {
        "Life expectancy at birth, total (years)",
        "GDP per capita (current US$)",
        "Unemployment, total (% of total labor force)",
        "Literacy rate, adult total (% of people ages 15 and above)", # werkt niet voor nederland
        "Population, female (% of total)",
        "Poverty headcount ratio at national poverty line (% of population)",
        "Out-of-pocket health expenditure (% of private expenditure on health)",
        "Physicians (per 1,000 people)",
        "Credit depth of information index (0=low to 6=high)",
        "Central government debt, total (% of GDP)",
        "GINI index",
        "Employment in industry (% of total employment)",
        "Employers, total (% of employment)",
}

#Presence of peace keepers (number of troops, police, and military observers in mandate)
#Poverty headcount ratio at national poverty line (% of population)
#Population, female (% of total)
#Physicians (per 1,000 people)
#Out-of-pocket health expenditure (% of private expenditure on health)
#Out-of-pocket health expenditure (% of total expenditure on health)
#Credit depth of information index (0=low to 6=high)
#External debt stocks, total (DOD, current US$)
#Central government debt, total (% of GDP)
#GINI index
#Employment in industry (% of total employment)
#Employers, total (% of employment)

# polution?

with open("WDI_GDF_Data.csv", "rb") as file_in:
    csv_reader = csv.reader(file_in)
    header = csv_reader.next()
    code = header.index("Indicator Name")
    data = [line for line in csv_reader if line[code] in indicators]

with open("../simplified.csv", "wb") as file_out:
    csv_writer = csv.writer(file_out)
    csv_writer.writerow(header)
    csv_writer.writerows(data)

