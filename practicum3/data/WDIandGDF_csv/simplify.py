import csv
#import os.path

indicators = {
        "Life expectancy at birth, total (years)",
        "Death rate, crude (per 1,000 people)",
        "GDP per capita (current US$)",
        "GDP per capita growth (annual %)",
        "CO2 emissions (metric tons per capita)", # pollution?
        #"CO2 emissions (kg per 2000 US$ of GDP)",
        #"Broad money (current LCU)", # wat is dit eigenlijk?
        #"Children out of school, primary",
        #"GINI index",
        "Unemployment, total (% of total labor force)",
        #"Literacy rate, adult total (% of people ages 15 and above)", # werkt niet voor nederland
        "Mortality rate, infant (per 1,000 live births)",
}

# polution?

#with open(os.path(["..", "WDI_GDF_Data.csv"]), "rb") as file_in:
with open("WDI_GDF_Data.csv", "rb") as file_in:
    csv_reader = csv.reader(file_in)
    header = csv_reader.next()
    code = header.index("Indicator Name")
    data = [line for line in csv_reader if line[code] in indicators]

with open("../simplified.csv", "wb") as file_out:
    csv_writer = csv.writer(file_out)
    csv_writer.writerow(header)
    csv_writer.writerows(data)

