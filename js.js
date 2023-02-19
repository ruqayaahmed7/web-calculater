const keys = document.querySelectorAll('.key');
const display_input = document.querySelector('.display .input');
const display_output = document.querySelector('.display .output');

let input = "";

for (let key of keys ) {
    const value = key.dataset.key;//value of keys which means bring all the numbers//

        key.addEventListener('click', () => {
            if (value == "clear") {//if we click on AC then will clear all//
                input = "";//do nothing//
                display_input.innerHTML = "";
                display_output.innerHTML = "";
            } else if (value == "backspace") {
                input = input.slice(0, -1);// remove the last number//
                display_input.innerHTML = CleanInput(input);
            } else if (value == "=") {
                let result = eval(PerpareInput(input));
    
                display_output.innerHTML = CleanOutput(result);
            } else if (value == "brackets") {
                if (
                    // if we don't have first brackets we must add a start bracets || if we have first bracets && we have 
            // outer bracket && if we have a closing bracket without an opening brackets we add one 
                    input.indexOf("(") == -1 || 
                    input.indexOf("(") != -1 && 
                    input.indexOf(")") != -1 && 
                    input.lastIndexOf("(") < input.lastIndexOf(")")
                ) {
                    input += "(";// add a (
                } else if (
            //if ( bracket exist && ) dose'nt exist || ( bracket does esict && ( brackets is exist && the ) bracket is greater than one of those means add another brackets

                    input.indexOf("(") != -1 && 
                    input.indexOf(")") == -1 || 
                    input.indexOf("(") != -1 &&
                    input.indexOf(")") != -1 &&
                    input.lastIndexOf("(") > input.lastIndexOf(")")
                ) {
                    input += ")";
                }
            // if the up operations does not click on like brackets or = or clear you can add values 
    
                display_input.innerHTML = CleanInput(input);
            } else {
                if (ValidateInput(value)) {
                    input += value;
                    display_input.innerHTML = CleanInput(input);
                }
            }
        })
    }
    
    function CleanInput(input) {
        let input_array = input.split("");
        let input_array_length = input_array.length;
    
        for (let i = 0; i < input_array_length; i++) {
            if (input_array[i] == "*") {
                input_array[i] = ` <span class="operator">x</span> `;
            } else if (input_array[i] == "/") {
                input_array[i] = ` <span class="operator">÷</span> `;
            } else if (input_array[i] == "+") {
                input_array[i] = ` <span class="operator">+</span> `;
            } else if (input_array[i] == "-") {
                input_array[i] = ` <span class="operator">-</span> `;
            } else if (input_array[i] == "(") {
                input_array[i] = `<span class="brackets">(</span>`;
            } else if (input_array[i] == ")") {
                input_array[i] = `<span class="brackets">)</span>`;
            } else if (input_array[i] == "%") {
                input_array[i] = `<span class="percent">%</span>`;
            }
        }
    
        return input_array.join("");
    }
//here we gonna display the shapes into the operation like X,)<,+ ,= ....
    
    function CleanOutput (output) {
        let output_string = output.toString();
        let decimal = output_string.split(".")[1];
        output_string = output_string.split(".")[0];
    
        let output_array = output_string.split("");
        
        if (output_array.length > 3) {
            for (let i = output_array.length - 3; i > 0; i -= 3) {
                output_array.splice(i, 0, ",");
            }
        }
    
        if (decimal) {
            output_array.push(".");
            output_array.push(decimal);
        }
    
        return output_array.join("");
    }
    
    function ValidateInput (value) {
        let last_input = input.slice(-1);
        let operators = ["+", "-", "*", "/"];
            //if we insert a . after . return false 
    
        if (value == "." && last_input == ".") {
            return false;
        }
    
        if (operators.includes(value)) {
            if (operators.includes(last_input)) {
                return false;
            } else {
                return true;
            }
        }
    
        return true;
    }
    // if any operator  write like this **** return false so will not appesar any repated operation in the same point
    
    function PerpareInput (input) {
        let input_array = input.split("");
    
        for (let i = 0; i < input_array.length; i++) {
            if (input_array[i] == "%") {
                input_array[i] = "/100";
            }
        }
    
        return input_array.join("");
    }









        
           
          





























