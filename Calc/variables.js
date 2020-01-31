var input = null;
var operator = "";
var num1 = "";
var num2 = "";
var total = 0;
var initialize = false;
var reset = false;
var h = [];
var showTotal = document.getElementById("display");
var showHistory = document.getElementById("history");
var showOperator = document.getElementById("operator");
var checkDigit = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
var checkOperators = ["+", "-", "*", "/"];
var math_it_up = {
  "+": function(x, y) {
    return x + y;
  },
  "-": function(x, y) {
    return x - y;
  },
  "*": function(x, y) {
    return x * y;
  },
  "÷": function(x, y) {
    return x / y;
  }
};
