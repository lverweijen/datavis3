import csv

indicators = {
        "Life expectancy at birth, total (years)",
        "GDP (current US$)"
}

with open("../WDI_GDF_Data.csv", "rb") as file_in:
    csv_reader = csv.reader(file_in)
    header = csv_reader.next()
    code = header.index("Indicator Name")
    data = [line for line in csv_reader if line[code] in indicators]

with open("simplified.csv", "wb") as file_out:
    csv_writer = csv.writer(file_out)
    csv_writer.writerow(header)
    csv_writer.writerows(data)

