import numpy as np
import matplotlib.pyplot as plt
import math

def transfer(val, exp):
    modified = -(1 - val)**exp + 1
    return modified

# A transfer function that favors a lower exponent for higher values, and a higher exponent for lower
def transfer2(val):
    modifiedLow = transfer(val, 5)
    modifiedHigh = transfer(val, 3)
    return modifiedLow * (1-val) + modifiedHigh * val


#X values
input = np.arange(0, 1, 0.01)

plt.plot(input, input, 'k', label='base')

exponents = [2, 4, 6]
styles = ['b--', 'r--', 'g--']

for i in range(len(exponents)):
    modifiedOutput = []
    for sample in input:
        modifiedOutput.append(transfer(sample, exponents[i]))
    plt.plot(input, modifiedOutput, styles[i], label=f'{exponents[i]}')

modifiedOutput2 = []
for sample in input:
    modifiedOutput2.append(transfer2(sample))
plt.plot(input, modifiedOutput2, 'p--', label='weighted')

plt.xlabel("input")
plt.ylabel("output")
plt.title("Transfer Function For Match Percentage")
plt.legend()
plt.axis([0, 1, 0, 1])
plt.grid(color='g', linestyle='--', linewidth=1, axis='both', markevery=0.1)
plt.show()
