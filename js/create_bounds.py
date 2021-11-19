import csv
expected = {}
with open("C:/ComCode/Software/js/expected.csv", newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    print("{")
    count = 1
    for row in reader:
        tempDict = {}
        if row["Test"] == "Flat Test" or row["Test"] == "Bass Test" or row["Test"] == "Treble Test" or row["Test"] == "Aux Test":
            row["Test"] = row["Test"] + " " + str(count)
            count += 1
            if count == 4:
                count = 1
        if row["Test"] == "Pres Test":
            row["Test"] = row["Test"] + " " + str(count)
            count += 1
            if count == 3:
                count = 1
        l = row["Results"].split(";")
        for x in l:
            try:
                x = x.strip()
                x = x.replace(" ","")
                if row["Test"] == "DC Test":
                    x = x[:-1].split(":")
                    tempDict[x[0]+"H"] = float("{:.4f}".format(float(x[1])+0.2))
                    tempDict[x[0]+"L"] = float("{:.4f}".format(float(x[1])-0.2))
                else:
                    x = x[:-5].split(":")
                    if x[0] == "SPRKPos" or x[0] == "SPRKNeg" or x[0] == "NegDrvOut" or x[0] == "PosDrvOut":
                        tempDict[x[0]+"H"] = float("{:.4f}".format(float(x[1])+0.15))
                        tempDict[x[0]+"L"] = float("{:.4f}".format(float(x[1])-0.15))
                    else:
                        tempDict[x[0]+"H"] = float("{:.4f}".format(float(x[1])+0.05))
                        tempDict[x[0]+"L"] = float("{:.4f}".format(float(x[1])-0.05))
            except:
                pass
        out = str(tempDict).replace("'","\"")
        print("\""+ row["Test"] + "\": " + out + ",")
        # expected[row["Test"]] = tempDict
            # print(x.replace(" ",""))
            # try:
            #     print(l[i],l[i+1])
            # except:
            #     pass
            # f = x.split(" ")
            # print(f)
            # for y in f:
            #     if y:
                    
            # if f[2]:
            #     tempDict[f[1]] = f[2]
        # print(tempDict)
        # expected[row['Test']] = row['Results']