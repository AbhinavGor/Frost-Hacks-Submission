# -*- coding: utf-8 -*-
"""model.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1O9TvQzCSNRrIZlF2ufPVNuOfpsTD5vsZ
"""

# Commented out IPython magic to ensure Python compatibility.
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
# %matplotlib inline

df = pd.read_csv('Cleaned-Data.csv')
df = df.fillna(0)
df['Covid'] = pd.to_numeric(df['Severity_Severe'],downcast='integer') | pd.to_numeric(df['Severity_Moderate'],downcast='integer')

df.head()

from sklearn.tree import DecisionTreeClassifier # Import Decision Tree Classifier
from sklearn.model_selection import train_test_split # Import train_test_split function
from sklearn import metrics #Import scikit-learn metrics module for accuracy calculation

X = df[['Fever','Tiredness','Dry-Cough','Difficulty-in-Breathing','Sore-Throat','None_Sympton','Pains','Nasal-Congestion','Runny-Nose','Diarrhea','Age_0-9','Age_10-19','Age_20-24','Age_25-59','Age_60+']]
y = df['Covid']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=42)

import pickle

from sklearn.neighbors import KNeighborsClassifier
neigh = KNeighborsClassifier(n_neighbors=3)

neigh = neigh.fit(X_train,y_train)

predictions2 = neigh.predict(X_test)

metrics.accuracy_score(predictions2,y_test)

filename = 'model.pkl'
pickle.dump(rclass, open(filename, 'wb'))

a=[[1,1,0,1,0,0,0,1,1,1,0,0,0,1,0]]

neigh.predict(a)







