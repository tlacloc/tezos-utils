# Calculator - Example for illustrative purposes only.

import smartpy as sp

class Calculator(sp.Contract):
    def __init__(self):
        self.init(value = 0)

    @sp.entry_point
    def multiply(self, x, y):
        self.data.value = x * y

    @sp.entry_point
    def add(self, x, y):
        self.data.value = x + y

    @sp.entry_point
    def square(self, x):
        self.data.value = x * x

    @sp.entry_point
    def squareRoot(self, x):
        sp.verify(x >= 0)
        y = sp.local('y', x)
        sp.while y.value * y.value > x:
            y.value = (x // y.value + y.value) // 2
        sp.verify((y.value * y.value <= x) & (x < (y.value + 1) * (y.value + 1)))
        self.data.value = y.value

    @sp.entry_point
    def factorial(self, x):
        self.data.value = 1
        sp.for y in sp.range(1, x + 1):
            self.data.value *= y

    @sp.entry_point
    def log2(self, x):
        self.data.value = 0
        y = sp.local('y', x)
        sp.while 1 < y.value:
            self.data.value += 1
            y.value //= 2

if "templates" not in __name__:
    @sp.add_test(name = "Calculator")
    def test():
        c1 = Calculator()
        scenario = sp.test_scenario()
        scenario.h1("Calculator")
        scenario += c1
        c1.multiply(x = 2, y = 5)
        c1.add(x = 2, y = 5)
        c1.add(x = 2, y = 5)
        c1.square(12)
        c1.squareRoot(0)
        c1.squareRoot(1234)
        c1.factorial(100)
        c1.log2(c1.data.value)
        scenario.verify(c1.data.value == 524)

    sp.add_compilation_target("Calculator_comp", Calculator())
