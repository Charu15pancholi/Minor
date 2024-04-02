import pandas as pd
import matplotlib.pyplot as plt

marks = pd.Series([10,20,12,14])
students = pd.Series(['Deependra','Aditya','Ashu','Aarav'])

plt.xlabel("Students")
plt.ylabel("Marks of Students")

plt.plot(students,marks)
plt.show()